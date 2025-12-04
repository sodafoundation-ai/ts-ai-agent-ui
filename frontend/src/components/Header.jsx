import React from 'react';

const Header = ({ botName, botDescription, logoUrl, onExport }) => {
    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-blue-200">
                    {logoUrl ? (
                        <img src={logoUrl} alt="Bot Logo" className="w-full h-full object-cover" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                            <path d="M12 8V4H8" />
                            <rect width="16" height="12" x="4" y="8" rx="2" />
                            <path d="M2 14h2" />
                            <path d="M20 14h2" />
                            <path d="M15 13v2" />
                            <path d="M9 13v2" />
                        </svg>
                    )}
                </div>
                <div>
                    <h1 className="font-bold text-gray-800 text-lg leading-tight">{botName}</h1>
                    <p className="text-xs text-gray-500">{botDescription}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-gray-200 hover:border-blue-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    Export Chat
                </button>
            </div>
        </div>
    );
};

export default Header;
