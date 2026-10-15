
import { useMemo, useState } from "react";
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
    eyeOff: <><path d="M3 3l18 18" /><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" /><path d="M9.9 4.2A10 10 0 0 1 12 4c7 0 10 8 10 8a18 18 0 0 1-3.2 4.3M6.6 6.6C4 8.5 2 12 2 12s3 8 10 8a10 10 0 0 0 3.4-.6" /></>,
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

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    if (!password) return 0;

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return Math.min(score, 4);
  }, [password]);

  const strengthLabel = {
    0: "",
    1: "Weak",
    2: "Fair",
    3: "Good",
    4: "Strong",
  }[passwordStrength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const cleanUsername = username.trim();

    if (!cleanUsername) {
      setMessage({ type: "error", text: "Username is required." });
      return;
    }

    if (cleanUsername.length < 3) {
      setMessage({ type: "error", text: "Username must be at least 3 characters." });
      return;
    }

    if (cleanUsername.length > 30) {
      setMessage({ type: "error", text: "Username cannot exceed 30 characters." });
      return;
    }

    if (password.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters." });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    if (!accepted) {
      setMessage({ type: "error", text: "Please accept the privacy terms." });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: cleanUsername, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setMessage({
        type: "success",
        text: "Your private account has been created.",
      });

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setAccepted(false);

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

  const inputClass =
    "por-input h-12 w-full rounded-none border border-[#344155] bg-[#05080d]/80 px-4 font-mono text-xs text-[#E8E0D5] outline-none placeholder:text-[#8F877D]/60 focus:border-[#B42335]";

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#05080d] text-[#E8E0D5] selection:bg-[#B42335] selection:text-white"
      style={{ fontFamily: '"Manrope", sans-serif' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');
        .por-mono { font-family: "DM Mono", monospace; }
        .por-input {
          transition: border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease;
        }
        .por-input:focus { box-shadow: 0 0 0 1px rgba(180,35,53,.15); }
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
      <div className="absolute inset-0 bg-gradient-to-r from-[#05080d]/85 via-[#05080d]/70 to-[#05080d]/90" />
      <div className="absolute left-0 top-0 h-full w-[3px] bg-[#B42335]" />

      <header className="relative z-10 flex h-[76px] items-center justify-between border-b border-white/10 px-5 sm:px-8 lg:px-12">
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
          Private / 001
        </span>
      </header>

      <div className="relative z-10 grid min-h-[calc(100svh-76px)] lg:grid-cols-[1.08fr_.92fr]">
        <section className="hidden flex-col justify-between px-10 py-12 lg:flex xl:px-16">
          <div className="por-mono text-[10px] uppercase tracking-[2px] text-[#D45B69]">
            A different kind of chat
          </div>

          <div className="max-w-[620px] py-12">
            <h1 className="text-[clamp(3.5rem,6vw,6.5rem)] font-extrabold leading-[.94] tracking-[-.075em]">
              Some things
              <br />
              are meant to be
              <br />
              <span className="text-[#B7ADA0]/65">temporary.</span>
            </h1>

            <div className="mt-8 h-px w-16 bg-[#B42335]" />

            <p className="mt-6 max-w-md text-sm leading-7 text-[#B7ADA0]">
              A conversation doesn't always need to become a permanent record.
              Talk, connect, and keep things simple.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[#8F877D]">
            <Icon name="lock" />
            <span className="por-mono text-[9px] uppercase tracking-[1.5px]">
              Minimal data
            </span>
          </div>
        </section>

        <section className="relative flex items-center justify-center px-5 py-10 sm:px-10 lg:border-l lg:border-white/10 lg:bg-[#0A1220]/90 xl:px-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/[0.035]" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full border border-white/[0.035]" />

          <div className="relative w-full max-w-[410px]">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[#B42335]" />
              <span className="por-mono text-[9px] uppercase tracking-[2px] text-[#D45B69]">
                Create your account
              </span>
            </div>

            <h2 className="text-[38px] font-extrabold leading-[.98] tracking-[-2px] sm:text-[42px]">
              Keep your
              <br />
              <span className="text-[#B7ADA0]/55">identity simple.</span>
            </h2>

            <p className="mt-3 max-w-sm text-xs leading-6 text-[#8F877D]">
              Choose a username and password to start a private conversation.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                  placeholder="choose_a_username"
                  maxLength={30}
                  className={inputClass}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="por-mono text-[10px] uppercase tracking-[1.5px] text-[#B7ADA0]"
                  >
                    Password
                  </label>
                  {password && (
                    <span
                      className={`por-mono text-[9px] uppercase tracking-[1px] ${
                        passwordStrength >= 3 ? "text-[#91A77E]" : "text-[#D45B69]"
                      }`}
                    >
                      {strengthLabel}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="minimum 8 characters"
                    className={`${inputClass} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-0 top-0 flex h-12 w-11 items-center justify-center text-[#8F877D] transition-colors hover:text-[#D45B69]"
                  >
                    <Icon name={showPassword ? "eyeOff" : "eye"} />
                  </button>
                </div>

                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
                      className={`h-[3px] flex-1 ${
                        passwordStrength >= level
                          ? passwordStrength >= 3
                            ? "bg-[#91A77E]"
                            : "bg-[#B42335]"
                          : "bg-white/[0.08]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="por-mono mb-2 block text-[10px] uppercase tracking-[1.5px] text-[#B7ADA0]"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="repeat your password"
                    className={`${inputClass} pr-12 ${
                      confirmPassword && confirmPassword !== password
                        ? "border-[#B42335]"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((value) => !value)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="absolute right-0 top-0 flex h-12 w-11 items-center justify-center text-[#8F877D] transition-colors hover:text-[#D45B69]"
                  >
                    <Icon name={showConfirm ? "eyeOff" : "eye"} />
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#B42335]"
                />
                <span className="text-[10px] leading-5 text-[#8F877D]">
                  I understand that PorChatal is designed around minimal data
                  collection and private conversations.
                </span>
              </label>

              {message.text && (
                <div
                  role="alert"
                  className={`border px-3 py-3 text-xs ${
                    message.type === "success"
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
                className="por-submit flex h-12 w-full items-center justify-between border border-[#B42335] bg-[#B42335] px-5 text-sm font-semibold text-white hover:border-[#D45B69] hover:bg-[#98202F] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{loading ? "Creating account..." : "Create private account"}</span>
                {!loading && <Icon name="arrow" />}
              </button>
            </form>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#344155] pt-5">
              <span className="text-xs text-[#8F877D]">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="por-mono text-[10px] uppercase tracking-[1px] text-[#D45B69] transition-colors hover:text-[#E8E0D5]"
              >
                Sign in →
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-2 text-[#8F877D]">
              <Icon name="lock" size={14} />
              <span className="por-mono text-[8px] uppercase tracking-[1.3px]">
                Username + hashed password only
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
