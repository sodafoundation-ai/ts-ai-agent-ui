import React, { useState, useRef, useEffect } from 'react';

const InputArea = ({ onSendMessage, disabled }) => {
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSendMessage(input);
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [input]);

    return (
        <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-end gap-2 bg-white p-2 rounded-xl border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Attach file (Coming soon)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                </button>

                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 max-h-32 min-h-[24px] py-2 bg-transparent border-none focus:ring-0 resize-none text-gray-800 placeholder-gray-400"
                    rows={1}
                    disabled={disabled}
                />

                <button
                    type="submit"
                    disabled={!input.trim() || disabled}
                    className={`p-2 rounded-lg transition-all ${input.trim() && !disabled
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" x2="11" y1="2" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </form>
            <div className="text-center mt-2">
                <p className="text-xs text-gray-400">
                    AI can make mistakes. Please verify important information.
                </p>
            </div>
        </div>
    );
};

export default InputArea;
