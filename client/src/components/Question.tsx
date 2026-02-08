import { useState } from 'react';

interface QuestionProps {
    question: {
        id: string;
        stem: string;
        options: string[];
    };
    onAnswer: (index: number) => void;
    currentIndex: number;
    totalQuestions: number;
}

export function Question({ question, onAnswer, currentIndex, totalQuestions }: QuestionProps) {
    const [selected, setSelected] = useState<number | null>(null);

    const handleSubmit = () => {
        if (selected !== null) {
            onAnswer(selected);
            setSelected(null);
        }
    };

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Question {currentIndex + 1}</h2>
                <span className="text-sm text-muted-foreground">{currentIndex + 1} of {totalQuestions}</span>
            </div>

            <p className="text-lg">{question.stem}</p>

            <div className="space-y-3">
                {question.options.map((option, index) => (
                    <label
                        key={index}
                        className={`
              flex items-center p-4 border rounded-lg cursor-pointer transition-colors
              ${selected === index ? 'border-primary bg-primary/5' : 'hover:bg-muted'}
            `}
                    >
                        <input
                            type="radio"
                            name="question"
                            className="hidden"
                            onChange={() => setSelected(index)}
                            checked={selected === index}
                        />
                        <div className={`
              w-5 h-5 rounded-full border flex items-center justify-center mr-3
              ${selected === index ? 'border-primary' : 'border-muted-foreground'}
            `}>
                            {selected === index && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                        <span>{option}</span>
                    </label>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={selected === null}
                className="w-full py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
                {currentIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
        </div>
    );
}
