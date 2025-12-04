import React from 'react';

const FAQModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const faqs = [
        {
            question: "What is the Time Series AI Agent?",
            answer: "It is an AI-powered tool designed to analyze time series data, providing insights and inference at scale."
        },
        {
            question: "How do I connect my data?",
            answer: "The agent connects to Prometheus or other TSDBs. You can configure the endpoint in the backend configuration."
        },
        {
            question: "Can I export my chat history?",
            answer: "Yes, you can export the current chat session as a text file using the 'Export Chat' button in the header."
        },
        {
            question: "How do I start a new session?",
            answer: "Click the '+' button in the sidebar to create a fresh chat session."
        }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl transform transition-all max-h-[80vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <path d="M12 17h.01" />
                        </svg>
                        <h2 className="text-lg font-semibold text-gray-800">Frequently Asked Questions</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FAQModal;
