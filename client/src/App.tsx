import { useState, useEffect } from 'react';
import axios from 'axios';
import { Welcome } from './components/Welcome.tsx';
import { TrainingContent } from './components/TrainingContent.tsx';
import { Question } from './components/Question.tsx';
import { Grade } from './components/Grade.tsx';

const API_BASE = 'http://localhost:3001/api';

type Step = 'welcome' | 'content' | 'quiz' | 'grade';

interface TrainingData {
  userName: string;
  training: {
    id: string;
    title: string;
    pdfUrl: string;
    questions: {
      id: string;
      stem: string;
      options: string[];
    }[];
  };
}

interface GradeData {
  grade: number;
  passed: boolean;
  userName: string;
  trainingTitle: string;
}

export default function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<TrainingData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gradeData, setGradeData] = useState<GradeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get('token');
    if (t) {
      setToken(t);
      fetchData(t);
    } else {
      setError('No token provided in URL. Please use ?token=YOUR_TOKEN');
      setLoading(false);
    }
  }, []);

  const fetchData = async (t: string) => {
    try {
      const response = await axios.get(`${API_BASE}/training?token=${t}`);
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch training data');
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => setStep('content');

  const handleNextFromContent = () => setStep('quiz');

  const handleAnswer = async (answerIndex: number) => {
    if (!token || !data) return;

    try {
      const questionId = data.training.questions[currentQuestionIndex].id;
      await axios.post(`${API_BASE}/answer?token=${token}`, {
        questionId,
        answerIndex
      });

      if (currentQuestionIndex < data.training.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        fetchGrade();
      }
    } catch (err: any) {
      setError('Failed to save answer');
    }
  };

  const fetchGrade = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${API_BASE}/grade?token=${token}`);
      setGradeData(response.data);
      setStep('grade');
    } catch (err: any) {
      setError('Failed to fetch grade');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-card border shadow-sm rounded-lg overflow-hidden">
        {step === 'welcome' && (
          <Welcome
            userName={data.userName}
            trainingTitle={data.training.title}
            onStart={handleStart}
          />
        )}
        {step === 'content' && (
          <TrainingContent
            pdfUrl={data.training.pdfUrl}
            onNext={handleNextFromContent}
          />
        )}
        {step === 'quiz' && (
          <Question
            question={data.training.questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentIndex={currentQuestionIndex}
            totalQuestions={data.training.questions.length}
          />
        )}
        {step === 'grade' && gradeData && (
          <Grade data={gradeData} />
        )}
      </div>
    </div>
  );
}
