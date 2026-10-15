
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MidnightBlueLeaves from "../assets/Midnight Blue and Crimson Botanical Vignette.png";

const API_URL = "http://localhost:5000";

const C = {
    navy: "#05080d",
    deep: "#0A1220",
    panel: "#18263A",
    stone: "#B7ADA0",
    light: "#E8E0D5",
    muted: "#8F877D",
    red: "#B42335",
    redLight: "#D45B69",
    border: "#344155",
};

function BrandMark() {
    return (
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="5.5" y="8.5" width="28" height="23" stroke={C.red} strokeWidth="1.5" />
            <path d="M6 15h21M6 19h13" stroke={C.red} strokeWidth="1.5" />
            <path d="M34 8.5h4" stroke={C.red} strokeWidth="1.5" />
        </svg>
    );
}

function Icon({ name, size = 17 }) {
    const paths = {
        arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
        lock: <><rect x="4" y="10" width="16" height="11" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
        eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="2.7" /></>,
        eyeOff: <><path d="M3 3l18 18" /><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" /><path d="M9.9 4.2A10 10 0 0 1 12 4c7 
        0 10 8 10 8a18 18 0 0 1-3.2 4.3M6.6 6.6C4 8.5 2 12 2 12s3 8 10 8a10 10 0 0 0 3.4-.6" /></>,
    };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0"
        >
            {paths[name]}
        </svg>
    );
}

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        const cleanUsername = username.trim();

        if (!cleanUsername) {
            setMessage({ type: "error", text: "Username is required." });
            return;
        }

        if (!password) {
            setMessage({ type: "error", text: "Password is required." });
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username: cleanUsername, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed.");
            }

            setMessage({
                type: "success",
                text: "Welcome back. Your private session is ready.",
            });

            setUsername("");
            setPassword("");
            navigate("/home/chat");
        } catch (error) {
            setMessage({
                type: "error",
                text: error.message || "Something went wrong.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className="relative min-h-screen overflow-hidden bg-[#05080d] text-[#E8E0D5] selection:bg-[#B42335]
             selection:text-white"
            style={{ fontFamily: '"Manrope", sans-serif' }}
        >
            <style>{`
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');
        .por-mono { font-family: "DM Mono", monospace; }
        .por-input {
          transition: border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease;
        }
        .por-input:focus {
          box-shadow: 0 0 0 1px rgba(180,35,53,.15);
        }
        .por-submit {
          transition: background-color 200ms ease, border-color 200ms ease, transform 200ms ease;
        }
        .por-submit:hover:not(:disabled) { transform: translateY(-1px); }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
      `}</style>

            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url("${MidnightBlueLeaves}")` }}
            />
            <div className="absolute inset-0 bg-[#05080d]/65" />
            <div className="absolute inset-0 bg-linear-to-r from-[#05080d]/85 via-[#05080d]/70 to-[#05080d]/90" />
            <div className="absolute left-0 top-0 h-full w-0.75 bg-[#B42335]" />

            <header className="relative z-10 flex h-19 items-center justify-between border-b border-white/10 px-5
             sm:px-8 lg:px-12">
                <Link to="/" className="flex items-center gap-3">
                    <BrandMark />
                    <span className="text-[17px] font-extrabold tracking-[-0.7px]">
                        por<span className="text-[#B42335]">chat</span>al
                        <span className="por-mono mt-1 block text-[8px] font-normal uppercase tracking-[2px] text-[#8F877D]">
                            Private communication
                        </span>
                    </span>
                </Link>

                <span className="por-mono hidden text-[9px] uppercase tracking-[2px] text-[#8F877D] sm:block">
                    Private / 002
                </span>
            </header>

            <div className="relative z-10 grid min-h-[calc(100svh-76px)] lg:grid-cols-[1.08fr_.92fr]">
                <section className="hidden flex-col justify-between px-10 py-12 lg:flex xl:px-16">
                    <div className="por-mono text-[10px] uppercase tracking-[2px] text-[#D45B69]">
                        Welcome back
                    </div>

                    <div className="max-w-[620px] py-12">
                        <h1 className="text-[clamp(3.5rem,6vw,6.5rem)] font-extrabold leading-[.94] tracking-[-.075em]">
                            Your space.
                            <br />
                            Your
                            <br />
                            <span className="text-[#B7ADA0]/65">conversation.</span>
                        </h1>

                        <div className="mt-8 h-px w-16 bg-[#B42335]" />

                        <p className="mt-6 max-w-md text-sm leading-7 text-[#B7ADA0]">
                            Return to a conversation without turning it into a permanent
                            record. Private by design. Simple by nature.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 text-[#8F877D]">
                        <Icon name="lock" />
                        <span className="por-mono text-[9px] uppercase tracking-[1.5px]">
                            Minimal data
                        </span>
                    </div>
                </section>

                <section className="relative flex items-center justify-center px-5 py-12 sm:px-10 lg:border-l
                 lg:border-white/10 lg:bg-[#0A1220]/90 xl:px-16">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border
                     border-white/[0.035]" />
                    <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full border
                     border-white/[0.035]" />

                    <div className="relative w-full max-w-[410px]">
                        <div className="mb-7 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-[#B42335]" />
                            <span className="por-mono text-[9px] uppercase tracking-[2px] text-[#D45B69]">
                                Private access
                            </span>
                        </div>

                        <h2 className="text-[42px] font-extrabold leading-[.98] tracking-[-2.5px] sm:text-5xl">
                            Welcome
                            <br />
                            <span className="text-[#B7ADA0]/55">back.</span>
                        </h2>

                        <p className="mt-4 max-w-sm text-xs leading-6 text-[#8F877D]">
                            Sign in with your username and password to continue your private
                            conversation.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="por-mono mb-2 block text-[10px] uppercase tracking-[1.5px] text-[#B7ADA0]"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    autoComplete="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="your_username"
                                    className="por-input h-12 w-full rounded-none border border-[#344155] bg-[#05080d]/80
                                     px-4 font-mono text-xs text-[#E8E0D5] outline-none placeholder:text-[#8F877D]/60
                                      focus:border-[#B42335]"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="por-mono mb-2 block text-[10px] uppercase tracking-[1.5px] text-[#B7ADA0]"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="your password"
                                        className="por-input h-12 w-full rounded-none border border-[#344155]
                                         bg-[#05080d]/80 px-4 pr-12 font-mono text-xs text-[#E8E0D5] outline-none
                                          placeholder:text-[#8F877D]/60 focus:border-[#B42335]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((value) => !value)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute right-0 top-0 flex h-12 w-11 items-center justify-center
                                         text-[#8F877D] transition-colors hover:text-[#D45B69]"
                                    >
                                        <Icon name={showPassword ? "eyeOff" : "eye"} />
                                    </button>
                                </div>
                            </div>

                            {message.text && (
                                <div
                                    role="alert"
                                    className={`border px-3 py-3 text-xs ${message.type === "success"
                                            ? "border-[#91A77E]/30 bg-[#91A77E]/5 text-[#B8CBA8]"
                                            : "border-[#B42335]/50 bg-[#B42335]/10 text-[#D45B69]"
                                        }`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="por-submit flex h-12 w-full items-center justify-between border border-[#B42335]
                                 bg-[#B42335] px-5 text-sm font-semibold text-white hover:border-[#D45B69] 
                                 hover:bg-[#98202F] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span>{loading ? "Signing in..." : "Enter private space"}</span>
                                {!loading && <Icon name="arrow" />}
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#344155] pt-5">
                            <span className="text-xs text-[#8F877D]">
                                Don't have an account?
                            </span>
                            <Link
                                to="/register"
                                className="por-mono text-[10px] uppercase tracking-[1px] text-[#D45B69] transition-colors
                                 hover:text-[#E8E0D5]"
                            >
                                Create account →
                            </Link>
                        </div>

                        <div className="mt-7 flex items-center gap-2 text-[#8F877D]">
                            <Icon name="lock" size={14} />
                            <span className="por-mono text-[8px] uppercase tracking-[1.3px]">
                                No chat history stored
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
