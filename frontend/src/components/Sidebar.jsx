import React, { useState } from 'react';

const Sidebar = ({ sessions, currentSessionId, onSelectSession, onNewSession, onDeleteSession, onRenameSession, onOpenSettings, onOpenFAQ }) => {
    const [editingSessionId, setEditingSessionId] = useState(null);
    const [editName, setEditName] = useState('');

    const startEditing = (session, e) => {
        e.stopPropagation();
        setEditingSessionId(session.id);
        setEditName(session.name);
    };

    const saveEditing = (e) => {
        e.stopPropagation();
        if (editName.trim()) {
            onRenameSession(editingSessionId, editName);
        }
        setEditingSessionId(null);
    };

    const cancelEditing = (e) => {
        e.stopPropagation();
        setEditingSessionId(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveEditing(e);
        } else if (e.key === 'Escape') {
            cancelEditing(e);
        }
    };

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col h-full border-r border-gray-800">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h2 className="font-semibold text-lg">Chats</h2>
                <button
                    onClick={onNewSession}
                    className="p-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    title="New Chat"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {Array.isArray(sessions) && sessions.map((session) => (
                    <div
                        key={session.id}
                        className={`group flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${session.id === currentSessionId ? 'bg-gray-800' : 'hover:bg-gray-800/50'
                            }`}
                        onClick={() => onSelectSession(session.id)}
                    >
                        {editingSessionId === session.id ? (
                            <div className="flex items-center gap-2 w-full" onClick={(e) => e.stopPropagation()}>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="bg-gray-700 text-white text-sm rounded px-2 py-1 w-full outline-none border border-blue-500"
                                    autoFocus
                                />
                                <button onClick={saveEditing} className="text-green-400 hover:text-green-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </button>
                                <button onClick={cancelEditing} className="text-red-400 hover:text-red-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 overflow-hidden flex-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                    <span className="truncate text-sm text-gray-200">{session.name || 'New Chat'}</span>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => startEditing(session, e)}
                                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                                        title="Rename"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteSession(session.id);
                                        }}
                                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                                        title="Delete"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 6h18" />
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}

                {(!Array.isArray(sessions) || sessions.length === 0) && (
                    <div className="text-center text-gray-500 mt-10 text-sm">
                        No chats yet. Start a new one!
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-800 space-y-1">
                <button
                    onClick={onOpenFAQ}
                    className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <path d="M12 17h.01" />
                    </svg>
                    <span>FAQ</span>
                </button>
                <button
                    onClick={onOpenSettings}
                    className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.35a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span>Settings</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
