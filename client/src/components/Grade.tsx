interface GradeProps {
    data: {
        grade: number;
        passed: boolean;
        userName: string;
        trainingTitle: string;
    };
}

export function Grade({ data }: GradeProps) {
    return (
        <div className="p-8 flex flex-col items-center text-center space-y-6">
            <div className={`
        w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold
        ${data.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
      `}>
                {Math.round(data.grade)}%
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                    {data.passed ? 'Congratulations!' : 'Almost there!'}
                </h2>
                <p className="text-muted-foreground">
                    {data.userName}, you have completed the <strong>{data.trainingTitle}</strong> quiz.
                </p>
            </div>

            <div className={`
        px-4 py-2 rounded-md font-medium
        ${data.passed ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}
      `}>
                Result: {data.passed ? 'PASSED' : 'FAILED (Requires 80%)'}
            </div>

            {!data.passed && (
                <p className="text-sm text-balance">
                    Please review the training materials and try again using your link.
                </p>
            )}

            <button
                onClick={() => window.location.reload()}
                className="text-sm text-primary hover:underline"
            >
                Close and Refresh
            </button>
        </div>
    );
}
