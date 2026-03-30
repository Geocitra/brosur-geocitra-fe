'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import CommandMenu from '../ui/CommandMenu';

export default function Navbar({ appName }: { appName: string }) {
    const [isCommandOpen, setIsCommandOpen] = useState(false);

    return (
        <>
            {/* Dynamic Pill Container */}
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">

                {/* Navbar Pill */}
                <nav className="glass-panel w-full max-w-3xl rounded-full px-4 py-3 flex items-center justify-between shadow-aura pointer-events-auto">

                    {/* Brand & Identity Area */}
                    <div className="flex items-center gap-3 pl-2">
                        <span className="font-extrabold text-xl tracking-tighter text-slate-900">
                            GEOCITRA
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="hidden sm:inline-block text-sm font-bold text-primary truncate max-w-37.5">
                            {appName}
                        </span>
                    </div>

                    {/* Spotlight Search Trigger */}
                    <button
                        onClick={() => setIsCommandOpen(true)}
                        className="flex items-center gap-3 px-4 py-2 bg-slate-100/50 hover:bg-slate-100 border border-slate-200/50 rounded-full transition-all group"
                    >
                        <Search size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium text-slate-500 hidden sm:inline-block">
                            Cari brosur...
                        </span>
                        <div className="hidden lg:flex items-center gap-1 ml-4">
                            <kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-slate-400">⌘</kbd>
                            <kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-bold text-slate-400">K</kbd>
                        </div>
                    </button>

                </nav>
            </div>

            {/* Render Command Modal */}
            <CommandMenu isOpen={isCommandOpen} setIsOpen={setIsCommandOpen} />
        </>
    );
}