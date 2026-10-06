import { useState } from "react";
import MidnightBlueLeaves from "../assets/Midnight Blue Leaves.png";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000";

/* =========================================================
   ICONS
========================================================= */

function EyeIcon({ hidden }) {
    return hidden ? (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-4 w-4"
        >
            <path d="M3 3l18 18" />
            <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
            <path d="M9.88 4.24A9.77 9.77 0 0 1 12 4c7 0 10 8 10 8a18.4 18.4 0 0 1-3.17 4.28" />
            <path d="M6.61 6.61C3.95 8.47 2 12 2 12s3 8 10 8a9.75 9.75 0 0 0 3.4-.61" />
        </svg>
    ) : (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-4 w-4"
        >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="2.7" />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-4 w-4"
        >
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
    );
}

/* =========================================================
   LOGIN PAGE
========================================================= */

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    /* =========================================================
       LOGIN
    ========================================================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage({
            type: "",
            text: "",
        });

        const cleanUsername = username.trim();

        if (!cleanUsername) {
            setMessage({
                type: "error",
                text: "Username is required.",
            });
            return;
        }

        if (!password) {
            setMessage({
                type: "error",
                text: "Password is required.",
            });
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                credentials: "include",

                body: JSON.stringify({
                    username: cleanUsername,
                    password,
                }),
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

            // Add navigation here later.
            // Example with React Router:
            // navigate("/chat");

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
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');

        .por-display {
          font-family: "Manrope", sans-serif;
        }

        .por-mono {
          font-family: "DM Mono", monospace;
        }

        .por-input {
          transition:
            border-color 200ms ease,
            background-color 200ms ease,
            box-shadow 200ms ease;
        }

        .por-input:focus {
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.16);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
          }
        }
      `}</style>

            {/* =====================================================
          PAGE
      ===================================================== */}

            <main className="min-h-screen bg-[#07090d] text-white selection:bg-[#f47b20] selection:text-black lg:h-screen 
      lg:overflow-hidden">

                <div className="grid min-h-screen lg:h-screen lg:grid-cols-[1.08fr_0.92fr]">

                    {/* =================================================
              LEFT SIDE — LEAF IMAGE
          ================================================= */}

                    <section
                        className="relative hidden overflow-hidden bg-[#05080d] lg:block"
                        style={{
                            backgroundImage: `url(${MidnightBlueLeaves})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                        }}
                    >

                        {/* Dark overlay */}

                        <div className="absolute inset-0 bg-black/25" />

                        {/* Text gradient */}

                        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/35 to-[#07101b]/65" />

                        {/* Orange edge */}

                        <div className="absolute left-0 top-0 h-full w-0.75 bg-[#f47b20]" />


                        {/* =================================================
                CONTENT
            ================================================= */}

                        <div className="relative z-10 flex h-full flex-col px-10 py-8 xl:px-14">

                            {/* Logo */}

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center bg-[#f47b20] text-black">

                                        <span className="por-mono text-sm font-black">
                                            P
                                        </span>

                                    </div>

                                    <div>

                                        <p className="por-display text-[17px] font-extrabold tracking-[-0.04em]">
                                            Por<span className="text-orange-500">Chat</span>al
                                        </p>

                                        <p className="por-mono mt-0.5 text-[7px] uppercase tracking-[0.28em] text-white/35">
                                            Private communication
                                        </p>

                                    </div>

                                </div>

                                <span className="por-mono text-[8px] uppercase tracking-[0.25em] text-white/35">
                                    PRIVATE / 002
                                </span>

                            </div>


                            {/* =================================================
                  HERO
              ================================================= */}

                            <div className="my-auto max-w-162.5">

                                <p className="por-mono mb-5 text-[9px] uppercase tracking-[0.32em] text-[#f47b20]">
                                    Welcome back
                                </p>

                                <h1 className="por-display max-w-162.5 text-[clamp(3.3rem,5.3vw,6rem)] font-extrabold leading-[0.9]
                            tracking-[-0.075em]">

                                    Your space.

                                    <br />

                                    Your

                                    <br />

                                    <span className="text-white/55">
                                        conversation.
                                    </span>

                                </h1>

                                <div className="mt-7 h-px w-16 bg-[#f47b20]" />

                                <p className="por-display mt-6 max-w-120 text-[14px] leading-7 text-white/55">

                                    Return to a conversation without
                                    <br />
                                    turning it into a permanent record.

                                    <br />

                                    <span className="text-white/35">
                                        Private by design. Simple by nature.
                                    </span>

                                </p>

                            </div>


                            {/* =================================================
                  BOTTOM MESSAGE
              ================================================= */}

                            <div className="flex items-end justify-between">

                                <div className="max-w-87.5">

                                    <p className="por-display text-[12px] leading-5 text-white/40">

                                        Nothing unnecessary.
                                        <br />
                                        Just you and your conversation.

                                    </p>

                                </div>


                                <div className="flex items-center gap-2 text-white/35">

                                    <LockIcon />

                                    <span className="por-mono text-[8px] uppercase tracking-[0.2em]">
                                        Minimal data
                                    </span>

                                </div>

                            </div>

                        </div>

                    </section>


                    {/* =================================================
              RIGHT SIDE — LOGIN
          ================================================= */}

                    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d1624] 
                    px-6 py-8 sm:px-10 lg:min-h-0 lg:px-12 xl:px-16">

                        {/* =================================================
                SUBTLE BACKGROUND
            ================================================= */}

                        <div className="pointer-events-none absolute -right-45 -top-45 h-105 w-105 rounded-full border
                         border-white/2.5" />

                        <div className="pointer-events-none absolute -bottom-50 -left-42.5 h-105 w-105 rounded-full border
                         border-white/2" />

                        <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 border-b border-l
                         border-[#f47b20]/20" />


                        {/* =================================================
                FORM CONTAINER
            ================================================= */}

                        <div className="relative z-10 w-full max-w-102.5">


                            {/* =================================================
                  FORM HEADER
              ================================================= */}

                            <div className="mb-7">

                                <div className="mb-3 flex items-center gap-2">

                                    <span className="h-1.5 w-1.5 bg-[#f47b20]" />

                                    <span className="por-mono text-[8px] uppercase tracking-[0.3em] text-[#f47b20]">
                                        Private access
                                    </span>

                                </div>


                                <h2 className="por-display text-[42px] font-extrabold leading-[0.94] tracking-[-0.065em] text-white">

                                    Welcome

                                    <br />

                                    <span className="text-white/35">
                                        back.
                                    </span>

                                </h2>


                                <p className="por-display mt-4 max-w-87.5 text-[11px] leading-5 text-white/35">

                                    Sign in with your username and
                                    password to continue your private
                                    conversation.

                                </p>

                            </div>


                            {/* =================================================
                  LOGIN FORM
              ================================================= */}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >


                                {/* =================================================
                    USERNAME
                ================================================= */}

                                <div>

                                    <label
                                        htmlFor="username"
                                        className="por-mono mb-2 block text-[10px] uppercase tracking-[0.22em] text-white/35"
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
                                        className="por-input h-13 w-full rounded-none border border-white/10 bg-[#09111d] px-4 
                                        font-mono text-xs text-white outline-none placeholder:text-white/15
                                         focus:border-[#f47b20]/60 focus:bg-[#050c15]"
                                    />

                                </div>


                                {/* =================================================
                    PASSWORD
                ================================================= */}

                                <div>

                                    <div className="mb-2 flex items-center justify-between">

                                        <label
                                            htmlFor="password"
                                            className="por-mono text-[10px] uppercase tracking-[0.22em] text-white/35"
                                        >
                                            Password
                                        </label>

                                        <button
                                            type="button"
                                            className="por-mono text-[8px] uppercase tracking-[0.15em] text-white/25 transition 
                                            hover:text-[#f47b20]"
                                        >
                                            Forgot?
                                        </button>

                                    </div>


                                    <div className="relative">

                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="your password"
                                            className="por-input h-13 w-full rounded-none border border-white/10 bg-[#09111d] px-4 pr-12
                       font-mono text-xs text-white outline-none placeholder:text-white/15 focus:border-[#f47b20]/60
                        focus:bg-[#050c15]"
                                        />


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-0 top-0 flex h-13 w-11 items-center justify-center text-white/25 transition 
                      hover:text-[#f47b20]"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >

                                            <EyeIcon hidden={!showPassword} />

                                        </button>

                                    </div>

                                </div>


                                {/* =================================================
                    MESSAGE
                ================================================= */}

                                {message.text && (

                                    <div
                                        className={`border px-3 py-2.5 text-[10px] ${message.type === "success"
                                            ? "border-[#91a77e]/20 bg-[#91a77e]/5 text-[#a8ba98]"
                                            : "border-red-400/20 bg-red-400/5 text-red-300"
                                            }`}
                                    >

                                        {message.text}

                                    </div>

                                )}


                                {/* =================================================
                    BUTTON
                ================================================= */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex h-13.25 w-full items-center justify-between bg-[#f47b20] px-5 text-black
                   transition-all duration-300 hover:bg-[#ff852f] hover:shadow-[0_12px_35px_rgba(244,123,32,0.12)]
                    disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    <span className="por-display text-xs font-extrabold">

                                        {loading
                                            ? "Signing in..."
                                            : "Enter private space"}

                                    </span>


                                    {!loading && <ArrowIcon />}

                                </button>

                            </form>


                            {/* =================================================
                  REGISTER
              ================================================= */}

                            <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-5">

                                <span className="por-display text-[12px] text-white/22">
                                    Don't have an account?
                                </span>

                                <Link
                                    to="/"
                                    className="por-mono text-[9.5px] uppercase tracking-[0.18em] text-[#f47b20] transition
                                     hover:text-[#ff9a4d]"
                                >
                                    Create account →
                                </Link>

                            </div>


                            {/* =================================================
                  PRIVACY NOTE
              ================================================= */}

                            <div className="mt-6 flex items-center gap-2.5 text-white/20">

                                <LockIcon />

                                <p className="por-mono text-[7px] uppercase tracking-[0.15em]">
                                    No chat history stored
                                </p>

                            </div>

                        </div>

                    </section>

                </div>

            </main>
        </>
    );
}