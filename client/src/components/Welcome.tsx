export function Welcome({ userName, trainingTitle, onStart }: { userName: string, trainingTitle: string, onStart: () => void }) {
    return (
        <div className="p-8 flex flex-col items-center text-center space-y-6">
            <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
            <p className="text-muted-foreground max-w-md">
                You are about to start the training: <strong>{trainingTitle}</strong>.
                Please review the materials carefully before proceeding to the quiz.
            </p>
            <button
                onClick={onStart}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
                Start Training
            </button>
        </div>
    );
}
