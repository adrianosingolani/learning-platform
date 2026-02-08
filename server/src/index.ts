import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { mockAttempts, mockTrainings } from './mockData.js';
import type { UserAttempt } from './mockData.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 3001;

// Middleware to verify token
const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.query.token as string;
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    const attempt = mockAttempts[token];
    if (!attempt) {
        return res.status(404).json({ error: 'Invalid token' });
    }

    if (new Date() > attempt.expiresAt) {
        return res.status(403).json({ error: 'Token has expired' });
    }

    (req as any).attempt = attempt;
    next();
};

// Get training data
app.get('/api/training', verifyToken, (req, res) => {
    const attempt = (req as any).attempt as UserAttempt;
    const training = mockTrainings[attempt.trainingId];

    if (!training) {
        return res.status(404).json({ error: 'Training not found' });
    }

    // Return training data and user name
    res.json({
        userName: attempt.userName,
        training: {
            id: training.id,
            title: training.title,
            pdfUrl: training.pdfUrl,
            questions: training.questions.map(q => ({
                id: q.id,
                stem: q.stem,
                options: q.options
            }))
        }
    });
});

// Save answer
app.post('/api/answer', verifyToken, (req, res) => {
    const attempt = (req as any).attempt as UserAttempt;
    const { questionId, answerIndex } = req.body;

    if (answerIndex === undefined) {
        return res.status(400).json({ error: 'Answer index is required' });
    }

    // Find training to get questions
    const training = mockTrainings[attempt.trainingId];
    if (!training) {
        return res.status(404).json({ error: 'Training not found' });
    }

    const questionIndex = training.questions.findIndex(q => q.id === questionId);

    if (questionIndex === -1) {
        return res.status(404).json({ error: 'Question not found' });
    }

    // Save answer
    attempt.answers[questionIndex] = answerIndex;

    res.json({ success: true });
});

// Get final grade
app.get('/api/grade', verifyToken, (req, res) => {
    const attempt = (req as any).attempt as UserAttempt;
    const training = mockTrainings[attempt.trainingId];

    if (!training) {
        return res.status(404).json({ error: 'Training not found' });
    }

    if (attempt.answers.length < training.questions.length) {
        return res.status(400).json({ error: 'Quiz not completed' });
    }

    const correctAnswers = training.questions.filter((q, index) => q.correctOptionIndex === attempt.answers[index]).length;
    const score = (correctAnswers / training.questions.length) * 100;

    attempt.grade = score;
    attempt.completedAt = new Date();

    res.json({
        grade: score,
        passed: score >= 80,
        userName: attempt.userName,
        trainingTitle: training.title
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
