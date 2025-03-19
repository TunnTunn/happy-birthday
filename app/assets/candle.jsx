"use client";

export default function Candle({ isLit = false, className = "" }) {
    return (
        <div className={`relative ${className}`}>
            {/* Candle */}
            <div className="w-16 h-60 bg-gradient-to-t from-[var(--color-pink-2)] to-[var(--color-pink-3)] rounded-t-lg rounded-b-xl mx-auto relative z-20">
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-[var(--color-pink-4)] rounded-b-xl"></div>
                <div className="absolute w-4 h-16 bg-[#f5e7d3] rounded-b-xl rounded-t-lg top-0 left-1/2 -translate-x-1/2"></div>

                {/* Flame and glow effect */}
                {isLit && (
                    <>
                        {/* Glow effect */}
                        <div className="absolute w-24 h-24 bg-orange-300/30 rounded-full left-1/2 -translate-x-1/2 -top-16 animate-pulse blur-md"></div>
                        <div className="absolute w-16 h-16 bg-yellow-200/40 rounded-full left-1/2 -translate-x-1/2 -top-14 animate-pulse blur-md"></div>

                        {/* Flame */}
                        <div className="absolute w-8 h-16 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full left-1/2 -translate-x-1/2 -top-14 animate-flicker opacity-90"></div>
                        <div className="absolute w-4 h-10 bg-gradient-to-t from-white to-yellow-100 rounded-full left-1/2 -translate-x-1/2 -top-10 animate-flicker-fast"></div>
                    </>
                )}
            </div>

            {/* Cake plate */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-white rounded-t-full z-10"></div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-6 bg-[var(--color-pink-1)] rounded-full shadow-lg z-0"></div>
        </div>
    );
}
