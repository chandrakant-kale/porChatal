import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MidnightBlueLeaves from "../assets/Midnight Blue and Crimson Botanical Vignette.png";

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
    <svg
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5.5"
        y="8.5"
        width="28"
        height="23"
        stroke={C.red}
        strokeWidth="1.5"
      />
      <path
        d="M6 15h21M6 19h13"
        stroke={C.red}
        strokeWidth="1.5"
      />
      <path
        d="M34 8.5h4"
        stroke={C.red}
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M7 17 17 7M7 7h10v10" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="10" width="16" height="11" rx="1" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v3" />
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className="min-h-screen overflow-x-hidden bg-[#05080d] text-[#E8E0D5]"
      style={{
        fontFamily: '"Manrope", sans-serif',
      }}
    >
      <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');

        .por-mono {
          font-family: "DM Mono", monospace;
        }

        .hero-background {
          animation: heroReveal 1.1s ease-out both;
        }

        .hero-content {
          animation: contentReveal 0.9s ease-out 0.12s both;
        }

        .hero-line {
          transform-origin: left;
          animation: lineReveal 0.8s ease-out 0.5s both;
        }

        .por-button {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transition:
            color 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease,
            transform 220ms ease,
            box-shadow 220ms ease;
        }

        .por-button::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: #B42335;
          transform: translateY(102%);
          transition: transform 260ms ease;
        }

        .por-button:hover::before {
          transform: translateY(0);
        }

        .por-button:hover {
          color: #fff;
          border-color: #B42335;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(180, 35, 53, 0.17);
        }

        .por-button-primary {
          background: #B42335;
          border-color: #B42335;
        }

        .por-button-primary::before {
          background: #D45B69;
        }

        .por-button-primary:hover {
          border-color: #D45B69;
        }

        .feature-line {
          transition: border-color 220ms ease, background-color 220ms ease;
        }

        .feature-line:hover {
          border-color: rgba(180, 35, 53, 0.7);
          background-color: rgba(10, 18, 32, 0.65);
        }

        @keyframes heroReveal {
          from { opacity: 0.5; transform: scale(1.035); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes contentReveal {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes lineReveal {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-background,
          .hero-content,
          .hero-line {
            animation: none;
          }

          .por-button,
          .por-button::before,
          .feature-line {
            transition: none;
          }
        }
      `}</style>

      {/* Full-screen hero background */}
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
        <div
          className="hero-background absolute inset-0 -z-30 bg-cover bg-center"
          style={{
            backgroundImage: `url("${MidnightBlueLeaves}")`,
            backgroundPosition: "center center",
          }}
        />

        {/* Dark overlays preserve text contrast while keeping the image visible */}
        <div className="absolute inset-0 -z-20 bg-[#05080d]/45" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#05080d]/95 via-[#05080d]/65 to-[#05080d]/25" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#05080d] via-transparent to-[#05080d]/35" />

        {/* Fixed, transparent navbar */}
        <header
          className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
            scrolled
              ? "border-b border-white/10 bg-[#05080d]/75 shadow-lg backdrop-blur-xl"
              : "border-b border-white/6 bg-transparent"
          }`}
        >
          <nav className="mx-auto flex h-19 max-w-360 items-center justify-between px-5 sm:px-8 lg:px-14">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2.5 text-left"
              aria-label="PorChatal home"
            >
              <BrandMark />
              <span className="text-[19px] font-extrabold tracking-[-1px] text-[#E8E0D5]">
                por<span className="text-[#B42335]">chat</span>al
              </span>
            </button>

            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#about"
                className="text-[12px] text-[#B7ADA0] transition-colors hover:text-white"
              >
                About
              </a>
              <a
                href="#privacy"
                className="text-[12px] text-[#B7ADA0] transition-colors hover:text-white"
              >
                Privacy
              </a>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-[12px] font-semibold text-[#E8E0D5] transition-colors hover:text-[#D45B69] hidden sm:block"
              >
                Log in
              </button>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="por-button por-button-primary inline-flex min-h-10 items-center gap-2 border px-4 text-[11px]
                 font-bold text-white sm:px-5"
              >
                Get started
                <ArrowIcon diagonal />
              </button>
            </div>
          </nav>
        </header>

        {/* Hero content */}
        <div className="hero-content mx-auto flex w-full max-w-360 flex-1 items-center px-6 pb-20 pt-25 sm:px-10 
        lg:px-16 xl:px-24">
          <div className="w-full max-w-205">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-9 bg-[#B42335]" />
              <p className="por-mono text-[10px] uppercase tracking-[2.5px] text-[#D45B69] sm:text-[11px]">
                Private communication
              </p>
            </div>

            <h1 className="max-w-212.5 text-[clamp(3.2rem,8vw,7rem)] font-extrabold leading-[0.98] tracking-[-0.075em] 
            text-[#E8E0D5]">
              Your space.
              <br />
              <span className="text-[#B7ADA0]">Your conversation.</span>
            </h1>

            <div className="hero-line mt-8 h-0.5 w-20 bg-[#B42335]" />

            <p className="mt-7 max-w-122.5 text-[14px] leading-7 text-[#D0C7BB] sm:text-[16px] sm:leading-8">
              A quieter place to connect. Start a private conversation using a
              temporary connection code, without building a permanent message
              archive.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="por-button por-button-primary inline-flex min-h-13 items-center justify-center gap-3 border
                 px-7 text-[12px] font-bold text-white"
              >
                Create your account
                <ArrowIcon />
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="por-button inline-flex min-h-13 items-center justify-center gap-3 border border-white/30
                 bg-[#05080d]/20 px-7 text-[12px] font-semibold text-[#E8E0D5] backdrop-blur-sm"
              >
                I already have an account
                <ArrowIcon diagonal />
              </button>
            </div>

            {/* Small product principles */}
            <div
              id="privacy"
              className="mt-16 grid max-w-157.5 grid-cols-1 border-t border-white/15 sm:grid-cols-3"
            >
              <div className="feature-line border-b border-white/10 py-5 pr-4 sm:border-b-0 sm:border-r sm:pr-5">
                <div className="mb-3 flex items-center gap-2 text-[#D45B69]">
                  <LockIcon />
                  <span className="por-mono text-[9px] uppercase tracking-[1.4px]">
                    Privacy first
                  </span>
                </div>
                <p className="text-[12px] leading-5 text-[#B7ADA0]">
                  Built around more private conversations.
                </p>
              </div>

              <div className="feature-line border-b border-white/10 py-5 pr-4 sm:border-b-0 sm:border-r sm:px-5">
                <div className="mb-3 flex items-center gap-2 text-[#D45B69]">
                  <span className="por-mono text-[13px]">01</span>
                  <span className="por-mono text-[9px] uppercase tracking-[1.4px]">
                    Temporary codes
                  </span>
                </div>
                <p className="text-[12px] leading-5 text-[#B7ADA0]">
                  Connect using a short-lived invitation.
                </p>
              </div>

              <div
                id="about"
                className="feature-line py-5 sm:pl-5"
              >
                <div className="mb-3 flex items-center gap-2 text-[#D45B69]">
                  <span className="por-mono text-[13px]">02</span>
                  <span className="por-mono text-[9px] uppercase tracking-[1.4px]">
                    Less history
                  </span>
                </div>
                <p className="text-[12px] leading-5 text-[#B7ADA0]">
                  Messages are not saved to the database.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom edge details */}
        <footer className="relative flex flex-col gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center 
        sm:justify-between sm:px-10 lg:px-16">
          <p className="por-mono text-[9px] uppercase tracking-[1.5px] text-[#8F877D]">
            PorChatal / Private communication
          </p>

          <div className="flex items-center gap-2 text-[#8F877D]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B42335]" />
            <span className="por-mono text-[9px] uppercase tracking-[1px]">
              Your conversations. Your space.
            </span>
          </div>
        </footer>
      </section>
    </main>
  );
}