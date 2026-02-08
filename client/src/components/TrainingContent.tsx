import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export function TrainingContent({ pdfUrl, onNext }: { pdfUrl: string, onNext: () => void }) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    const handleNextPage = () => {
        if (numPages && currentPage < numPages) {
            setCurrentPage(prev => prev + 1);
        } else {
            onNext();
        }
    };

    return (
        <div className="p-4 flex flex-col items-center">
            <div className="border rounded-md overflow-hidden bg-white mb-4 w-full flex justify-center min-h-[500px]">
                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} loading="Loading PDF...">
                    <Page pageNumber={currentPage} width={window.innerWidth > 800 ? 700 : 350} />
                </Document>
            </div>

            <div className="flex items-center justify-between w-full max-w-lg mt-4">
                <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {numPages || '?'}
                </span>
                <button
                    onClick={handleNextPage}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                    {numPages && currentPage === numPages ? 'Go to Quiz' : 'Next Slide'}
                </button>
            </div>
        </div>
    );
}
