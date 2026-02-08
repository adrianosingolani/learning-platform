export interface Question {
  id: string;
  stem: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Training {
  id: string;
  title: string;
  pdfUrl: string;
  questions: Question[];
}

export interface UserAttempt {
  token: string;
  userName: string;
  trainingId: string;
  answers: number[];
  grade?: number;
  completedAt?: Date;
  expiresAt: Date;
}

export const mockTrainings: Record<string, Training> = {
  "training-1": {
    id: "training-1",
    title: "Security Awareness 2024",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Placeholder
    questions: [
      {
        id: "q1",
        stem: "What is the best way to handle a suspicious email?",
        options: [
          "Click all links to see where they go",
          "Reply and ask if it's legitimate",
          "Report it to IT and delete it",
          "Forward it to all your colleagues"
        ],
        correctOptionIndex: 2
      },
      {
        id: "q2",
        stem: "How often should you update your password?",
        options: [
          "Never",
          "Every 10 years",
          "Only when it's leaked",
          "Regularly or when prompted by security policies"
        ],
        correctOptionIndex: 3
      },
      {
        id: "q3",
        stem: "Is it safe to share your password with your manager?",
        options: [
          "Yes, if they ask for it",
          "Only via Slack",
          "No, never share your password",
          "Yes, but only in person"
        ],
        correctOptionIndex: 2
      }
    ]
  }
};

export const mockAttempts: Record<string, UserAttempt> = {
  "valid-token-123": {
    token: "valid-token-123",
    userName: "Adriano Singolani",
    trainingId: "training-1",
    answers: [],
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  },
  "expired-token-456": {
    token: "expired-token-456",
    userName: "John Doe",
    trainingId: "training-1",
    answers: [],
    expiresAt: new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
  }
};
