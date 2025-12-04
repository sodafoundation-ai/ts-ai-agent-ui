import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const Message = ({ message, botLogo }) => {
    const isBot = message.role === 'bot';
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`flex gap-4 p-6 ${isBot ? 'bg-gray-50' : 'bg-white'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isBot ? 'bg-blue-100 border border-blue-200' : 'bg-gray-200'}`}>
                {isBot ? (
                    botLogo ? <img src={botLogo} alt="Bot" className="w-full h-full rounded-full object-cover" /> : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                            <path d="M12 8V4H8" />
                            <rect width="16" height="12" x="4" y="8" rx="2" />
                            <path d="M2 14h2" />
                            <path d="M20 14h2" />
                            <path d="M15 13v2" />
                            <path d="M9 13v2" />
                        </svg>
                    )
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                )}
            </div>

            <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-gray-900">
                        {isBot ? 'AI Agent' : 'You'}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isBot && (
                            <button
                                onClick={handleCopy}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                title="Copy response"
                            >
                                {copied ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <div className="prose prose-blue max-w-none text-gray-800 text-sm leading-relaxed">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

const ChatArea = ({ messages, loading, botLogo }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    return (
        <div className="flex-1 overflow-y-auto bg-white scroll-smooth">
            {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                            <path d="M12 8V4H8" />
                            <rect width="16" height="12" x="4" y="8" rx="2" />
                            <path d="M2 14h2" />
                            <path d="M20 14h2" />
                            <path d="M15 13v2" />
                            <path d="M9 13v2" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">How can I help you today?</h3>
                    <p className="max-w-md text-sm">
                        I'm your Time Series AI Agent. Ask me about your data, metrics, or help me analyze trends.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col min-h-full">
                    {messages.map((msg, idx) => (
                        <Message key={idx} message={msg} botLogo={botLogo} />
                    ))}

                    {loading && (
                        <div className="flex gap-4 p-6 bg-gray-50 animate-pulse">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                                    <path d="M12 8V4H8" />
                                    <rect width="16" height="12" x="4" y="8" rx="2" />
                                    <path d="M2 14h2" />
                                    <path d="M20 14h2" />
                                    <path d="M15 13v2" />
                                    <path d="M9 13v2" />
                                </svg>
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            )}
        </div>
    );
};

export default ChatArea;
