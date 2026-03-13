import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Syne+Mono&display=swap');

                .font-syne { font-family: 'Syne', sans-serif; }
                .font-mono-syne { font-family: 'Syne Mono', monospace; }

                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(3deg); }
                }
                @keyframes float-slower {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(15px) rotate(-2deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.7; }
                }
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
                @keyframes glitch-1 {
                    0%, 85%, 100% { clip-path: inset(0 0 100% 0); transform: translateX(0); }
                    87% { clip-path: inset(20% 0 50% 0); transform: translateX(-5px); }
                    90% { clip-path: inset(60% 0 10% 0); transform: translateX(5px); }
                    93% { clip-path: inset(40% 0 30% 0); transform: translateX(-3px); }
                    96% { clip-path: inset(0 0 100% 0); }
                }
                @keyframes glitch-2 {
                    0%, 85%, 100% { clip-path: inset(0 0 100% 0); transform: translateX(0); }
                    88% { clip-path: inset(50% 0 20% 0); transform: translateX(6px); }
                    91% { clip-path: inset(10% 0 70% 0); transform: translateX(-6px); }
                    94% { clip-path: inset(70% 0 5% 0); transform: translateX(4px); }
                    97% { clip-path: inset(0 0 100% 0); }
                }
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes dash {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes countdown-shrink {
                    from { width: 100%; }
                    to { width: 0%; }
                }

                .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
                .animate-float-slower { animation: float-slower 8s ease-in-out infinite; }
                .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
                .animate-scan { animation: scan 6s linear infinite; }

                .nf-404 {
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    font-size: clamp(120px, 22vw, 240px);
                    line-height: 1;
                    color: transparent;
                    -webkit-text-stroke: 1.5px rgba(251, 146, 60, 0.25);
                    position: relative;
                    letter-spacing: -4px;
                    user-select: none;
                }
                .nf-404::before {
                    content: '404';
                    position: absolute;
                    inset: 0;
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    color: #fb923c;
                    animation: glitch-1 4s infinite;
                }
                .nf-404::after {
                    content: '404';
                    position: absolute;
                    inset: 0;
                    font-family: 'Syne', sans-serif;
                    font-weight: 800;
                    color: #38bdf8;
                    animation: glitch-2 4s infinite 0.08s;
                }

                .fade-up-1 { animation: fade-up 0.6s ease forwards 0.2s; opacity: 0; }
                .fade-up-2 { animation: fade-up 0.6s ease forwards 0.4s; opacity: 0; }
                .fade-up-3 { animation: fade-up 0.6s ease forwards 0.6s; opacity: 0; }
                .fade-up-4 { animation: fade-up 0.6s ease forwards 0.8s; opacity: 0; }

                .countdown-bar {
                    animation: countdown-shrink 10s linear forwards;
                }

                .btn-primary {
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .btn-primary::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: rgba(255,255,255,0.12);
                    transform: translateX(-100%);
                    transition: transform 0.3s ease;
                }
                .btn-primary:hover::after { transform: translateX(0); }
                .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(251,146,60,0.3); }

                .btn-secondary {
                    transition: transform 0.2s, background 0.2s, color 0.2s;
                }
                .btn-secondary:hover {
                    transform: translateY(-2px);
                    background: rgba(255,255,255,0.06);
                    color: #f1f5f9;
                }
            `}</style>

            <div className="font-syne min-h-screen bg-neutral-950 flex items-center justify-center overflow-hidden relative">

                {/* Background grid */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(251,146,60,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(251,146,60,0.04) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />

                {/* Scan line */}
                <div className="animate-scan absolute left-0 right-0 h-32 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(251,146,60,0.03), transparent)' }}
                />

                {/* Glow orbs */}
                <div className="animate-pulse-glow absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.08), transparent 70%)', filter: 'blur(40px)' }}
                />
                <div className="animate-pulse-glow absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.06), transparent 70%)', filter: 'blur(40px)', animationDelay: '1.5s' }}
                />

                {/* Floating shapes */}
                <div className="animate-float-slow absolute top-16 right-16 w-16 h-16 border border-orange-500 opacity-10 rotate-45" />
                <div className="animate-float-slower absolute bottom-20 left-20 w-8 h-8 bg-orange-500 opacity-5 rounded-full" />
                <div className="animate-float-slow absolute top-1/3 left-12 w-1 h-20 bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-20" style={{ animationDelay: '2s' }} />
                <div className="animate-float-slower absolute bottom-1/3 right-16 w-20 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-15" />

                {/* Main content */}
                <div className="relative z-10 text-center px-6 max-w-2xl w-full">

                    {/* Tag */}
                    <div className="fade-up-1 font-mono-syne inline-flex items-center gap-2 text-orange-400 text-xs tracking-widest uppercase mb-6 border border-orange-500 border-opacity-20 px-4 py-2 rounded-full bg-orange-500 bg-opacity-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                        Error 404 — Page Not Found
                    </div>

                    {/* 404 */}
                    <div className="fade-up-2 relative flex justify-center mb-4">
                        <div className="nf-404">404</div>
                    </div>

                    {/* Heading */}
                    <h1 className="fade-up-3 text-3xl md:text-4xl font-bold text-slate-100 tracking-tight mb-4 leading-tight">
                        You've wandered off the map
                    </h1>

                    {/* Description */}
                    <p className="fade-up-3 text-slate-500 text-base leading-relaxed max-w-md mx-auto mb-10 font-normal">
                        The page you're looking for has been moved, deleted, or never existed. Let's get you back on track.
                    </p>

                    {/* Buttons */}
                    <div className="fade-up-4 flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
                        <button
                            onClick={() => navigate('/')}
                            className="btn-primary bg-orange-500 text-white font-semibold text-sm tracking-wide px-8 py-3 w-full sm:w-auto"
                        >
                            ← Back to Home
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="btn-secondary border border-white border-opacity-10 text-slate-400 text-sm tracking-wide px-8 py-3 w-full sm:w-auto"
                        >
                            Go Back
                        </button>
                    </div>

                    {/* Countdown */}
                    <div className="fade-up-4 max-w-xs mx-auto">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-mono-syne text-slate-600 text-xs tracking-widest uppercase">Auto redirect</span>
                            <span className="font-mono-syne text-orange-400 text-xs">{countdown}s</span>
                        </div>
                        <div className="h-px bg-slate-800 w-full overflow-hidden">
                            <div className="countdown-bar h-full bg-gradient-to-r from-orange-500 to-orange-300" />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default NotFoundPage;