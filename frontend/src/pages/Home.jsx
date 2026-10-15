
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

const features = [
  {
    number: "01",
    title: "Temporary connection codes",
    description:
      `Invite someone with a short-lived connection code instead of sharing a permanent public profile link.`,
    tag: "CONTROLLED ACCESS",
  },
  {
    number: "02",
    title: "Conversations without an archive",
    description:
      `The current messaging implementation does not save message content to the database. Messages are kept in active 
      application memory.`,
    tag: "LESS STORED DATA",
  },
  {
    number: "03",
    title: "A focused chat space",
    description:
      "A straightforward place to connect and communicate without unnecessary social feeds or public timelines.",
    tag: "JUST CONVERSATIONS",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Choose a username and password to set up your PorChatal account.",
  },
  {
    number: "02",
    title: "Connect privately",
    description:
      "Generate a temporary connection code and share it directly with the person you want to connect with.",
  },
  {
    number: "03",
    title: "Start chatting",
    description:
      "Once the connection is established, open the conversation and exchange messages.",
  },
];

const faqs = [
  {
    question: "What is PorChatal?",
    answer:
      `PorChatal is a chat website built around direct conversations, temporary connection codes, and reduced message retention.`,
  },
  {
    question: "How do connection codes work?",
    answer:
      `A user generates a short-lived code and shares it with another person. Codes are intended to expire and have limited uses.`,
  },
  {
    question: "Are messages stored permanently?",
    answer:
      `The current implementation does not write message content to the database. Messages are held in application memory, 
      so they can be lost when the server restarts or the process ends. Do not assume that closing a browser tab reliably
       deletes every copy.`,
  },
  {
    question: "Is PorChatal end-to-end encrypted?",
    answer:
      `End-to-end encryption is not yet implemented in the current version. Until it is implemented and independently reviewed,
       do not use PorChatal for highly sensitive information.`,
  },
  {
    question: "What account information is collected?",
    answer:
      `The current account system stores a username and a password hash. Connection records are also maintained to support 
      the chat feature. Actual data practices may change as the product evolves.`,
  },
];

function BrandMark({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
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

function ArrowIcon({ diagonal = false, size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
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
      width="20"
      height="20"
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

function SectionLabel({ children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-8 bg-[#B42335]" />
      <p className="por-mono text-[10px] uppercase tracking-[2px] text-[#D45B69]">
        {children}
      </p>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="text-3xl font-extrabold leading-tight tracking-[-1.8px] text-[#E8E0D5] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-xl text-sm leading-7 text-[#8F877D] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <main
      className="min-h-screen overflow-x-clip bg-[#05080d] text-[#E8E0D5]"
      style={{ fontFamily: '"Manrope", sans-serif' }}
    >
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');

        .por-mono {
          font-family: "DM Mono", monospace;
        }

        .por-section {
          scroll-margin-top: 90px;
        }

        .por-button {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transition:
            color 200ms ease,
            border-color 200ms ease,
            background-color 200ms ease,
            transform 200ms ease;
        }

        .por-button:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .por-button:focus-visible,
        .por-nav-button:focus-visible,
        .por-faq-button:focus-visible {
          outline: 2px solid #D45B69;
          outline-offset: 4px;
        }

        .por-button-primary {
          background: #B42335;
          border-color: #B42335;
        }

        .por-button-primary:hover:not(:disabled) {
          background: #98202F;
          border-color: #D45B69;
        }

        .por-outline-button:hover {
          border-color: #B42335;
          background: rgba(180, 35, 53, 0.08);
        }

        .por-feature {
          transition: border-color 200ms ease, background-color 200ms ease;
        }

        .por-feature:hover {
          border-color: rgba(180, 35, 53, 0.7);
          background: rgba(10, 18, 32, 0.65);
        }

        .por-faq-button {
          min-height: 64px;
        }

        @keyframes porReveal {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .por-reveal {
          animation: porReveal 700ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled
          ? "border-white/10 bg-[#05080d]/10 shadow-lg backdrop-blur-xl"
          : "border-white/6 bg-[#05080d]/15 backdrop-blur-sm"
          }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-18 max-w-360 items-center justify-between gap-4 px-5 sm:px-8 lg:px-14"
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex shrink-0 items-center gap-2.5 text-left"
            aria-label="PorChatal home"
          >
            <BrandMark />
            <span className="text-[19px] font-extrabold tracking-[-1px]">
              por<span className="text-[#B42335]">chat</span>al
            </span>
          </button>

          <div className="hidden items-center gap-11 md:flex">
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="por-nav-button text-xs text-[#B7ADA0] transition-colors hover:text-white"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("features")}
              className="por-nav-button text-xs text-[#B7ADA0] transition-colors hover:text-white"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("how-it-works")}
              className="por-nav-button text-xs text-[#B7ADA0] transition-colors hover:text-white"
            >
              How it works
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("privacy")}
              className="por-nav-button text-xs text-[#B7ADA0] transition-colors hover:text-white"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("faq")}
              className="por-nav-button text-xs text-[#B7ADA0] transition-colors hover:text-white"
            >
              FAQ
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="hidden text-xs font-semibold text-[#E8E0D5] transition-colors hover:text-[#D45B69] sm:block"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="por-button por-button-primary inline-flex min-h-10 items-center gap-2 border px-3.5 text-[11px] 
              font-bold text-white sm:px-5"
            >
              Get started
              <ArrowIcon diagonal size={14} />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{
            backgroundImage: `url("${MidnightBlueLeaves}")`,
          }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 -z-20 bg-[#05080d]/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-linear-to-r from-[#05080d]/95 via-[#05080d]/75 to-[#05080d]/35"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-linear-to-t from-[#05080d] via-transparent to-[#05080d]/30"
          aria-hidden="true"
        />

        <div className="mx-auto flex w-full max-w-360 flex-1 items-center px-6 pb-20 pt-20 sm:px-10 lg:px-16 xl:px-24">
          <div className="por-reveal relative z-10 w-full max-w-212.5">
            <SectionLabel>Private communication, rethought</SectionLabel>

            <h1 className="text-[clamp(3.2rem,7vw,6.6rem)] font-extrabold leading-[0.96] tracking-[-0.075em]">
              Your space.
              <br />
              <span className="text-[#B7ADA0]">Your conversation.</span>
            </h1>

            <div className="mt-8 h-0.5 w-20 bg-[#B42335]" />

            <p className="mt-7 max-w-xl text-sm leading-7 text-[#D0C7BB] sm:text-base sm:leading-8">
              A quieter place to connect. Start a conversation using a
              temporary connection code, without building a permanent
              database archive of your messages.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="por-button por-button-primary inline-flex min-h-13 items-center justify-center gap-3 border
                   px-7 text-xs font-bold text-white"
              >
                Create your account
                <ArrowIcon />
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="por-button por-outline-button inline-flex min-h-13 items-center justify-center gap-3 border
                   border-white/30 bg-[#05080d]/30 px-7 text-xs font-semibold text-[#E8E0D5]"
              >
                I already have an account
                <ArrowIcon diagonal />
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[#B7ADA0]">
              <div className="flex items-center gap-2">
                <LockIcon />
                <span className="por-mono text-[9px] uppercase tracking-[1.3px]">
                  Minimal data
                </span>
              </div>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#B42335]" />
                <span className="por-mono text-[9px] uppercase tracking-[1.3px]">
                  Temporary codes
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("about")}
          className="group mx-auto mb-7 flex items-center gap-3 text-[#8F877D] transition-colors hover:text-[#E8E0D5]"
          aria-label="Scroll to learn about PorChatal"
        >
          <span className="por-mono text-[9px] uppercase tracking-[1.5px]">
            Discover PorChatal
          </span>
          <span className="flex h-7 w-7 items-center justify-center border border-white/15 transition-colors
           group-hover:border-[#B42335]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>
      </section>

      {/* About */}
      <section
        id="about"
        className="por-section border-t border-white/[0.07] bg-[#05080d] px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto grid max-w-300 gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="01 / The idea"
            title={
              <>
                Conversations
                <br />
                without the
                <br />
                unnecessary noise.
              </>
            }
            description="Messaging should make it easier to connect with someone, not force every conversation into a lasting 
            archive or public profile."
          />

          <div className="flex flex-col justify-center border-l border-[#344155] pl-6 sm:pl-9">
            <p className="text-lg leading-8 text-[#E8E0D5] sm:text-xl sm:leading-9">
              PorChatal is being built around a simple idea: direct
              conversations, controlled invitations, and less retained
              message data.
            </p>
            <p className="mt-6 text-sm leading-7 text-[#8F877D]">
              There are no public feeds or follower counts at the centre of
              the experience. The focus is on connecting with someone you
              choose and having a conversation.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("how-it-works")}
              className="mt-8 inline-flex w-fit items-center gap-3 text-xs font-semibold text-[#D45B69] transition-colors
               hover:text-white"
            >
              See how it works
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="por-section border-t border-white/[0.07] bg-[#0A1220] px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-300">
          <SectionHeading
            eyebrow="02 / Product principles"
            title="Built with intention."
            description="A small set of clear product principles, designed to keep conversations straightforward."
          />

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="por-feature flex min-h-70 flex-col border border-[#344155] bg-[#05080d]/40 p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="por-mono text-sm text-[#D45B69]">
                    {feature.number}
                  </span>
                  <span className="h-px w-10 bg-[#344155]" />
                </div>

                <h3 className="mt-9 text-xl font-bold leading-snug tracking-[-.7px] text-[#E8E0D5]">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#8F877D]">
                  {feature.description}
                </p>

                <p className="por-mono mt-auto pt-8 text-[9px] uppercase tracking-[1.3px] text-[#D45B69]">
                  {feature.tag}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="por-section border-t border-white/[0.07] bg-[#05080d] px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-300">
          <SectionHeading
            eyebrow="03 / Getting started"
            title="Three steps to connect."
            description="No complicated setup. Create an account, invite the person you want to reach, and begin chatting."
          />

          <div className="mt-16 grid grid-cols-1 gap-0 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step.number}
                className={`border-t border-[#344155] py-7 md:pr-7 ${index > 0 ? "md:border-l md:pl-7" : ""
                  }`}
              >
                <p className="por-mono text-xs text-[#D45B69]">
                  STEP {step.number}
                </p>
                <h3 className="mt-5 text-xl font-bold text-[#E8E0D5]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[#8F877D]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 border border-[#344155] bg-[#0A1220] p-6 sm:flex sm:items-center sm:justify-between
           sm:gap-6 sm:p-8">
            <div>
              <p className="por-mono text-[9px] uppercase tracking-[1.6px] text-[#D45B69]">
                Ready to begin?
              </p>
              <h3 className="mt-3 text-xl font-bold text-[#E8E0D5]">
                Make your first connection.
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#8F877D]">
                Set up your account to get started.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="por-button por-button-primary mt-6 inline-flex min-h-12 shrink-0 items-center justify-center gap-3
               border px-6 text-xs font-bold text-white sm:mt-0"
            >
              Create an account
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section
        id="privacy"
        className="por-section relative isolate overflow-hidden border-t border-white/[0.07] bg-[#0A1220] px-6 py-24
         sm:px-10 lg:px-16 lg:py-32"
      >
        <div
          className="pointer-events-none absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full border border-[#B42335]/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-20 top-16 -z-10 h-72 w-72 rounded-full border border-[#B42335]/10"
          aria-hidden="true"
        />

        <div className="mx-auto grid max-w-300 gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="04 / Privacy by design"
            title={
              <>
                Less stored.
                <br />
                More considered.
              </>
            }
            description="Privacy is more than a dark interface or a promise. It depends on what data is collected, where it
             travels, and how it is protected."
          />

          <div className="space-y-0">
            <div className="flex gap-5 border-t border-[#344155] py-6">
              <div className="mt-1 shrink-0 text-[#D45B69]">
                <LockIcon />
              </div>
              <div>
                <h3 className="font-bold text-[#E8E0D5]">
                  Account data kept limited
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#8F877D]">
                  The current account model uses a username and a password
                  hash. Connection records support who can communicate with
                  whom.
                </p>
              </div>
            </div>

            <div className="flex gap-5 border-t border-[#344155] py-6">
              <div className="por-mono mt-1 shrink-0 text-sm text-[#D45B69]">
                02
              </div>
              <div>
                <h3 className="font-bold text-[#E8E0D5]">
                  No database message archive
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#8F877D]">
                  Message content is currently kept in application memory
                  rather than persisted to the database. This does not
                  guarantee deletion from every device or prevent all
                  temporary copies.
                </p>
              </div>
            </div>

            <div className="flex gap-5 border-t border-[#344155] py-6">
              <div className="por-mono mt-1 shrink-0 text-sm text-[#D45B69]">
                03
              </div>
              <div>
                <h3 className="font-bold text-[#E8E0D5]">
                  Security, without exaggerated promises
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#8F877D]">
                  End-to-end encryption is not yet implemented. Until it is
                  added and properly reviewed, the server may be able to
                  access message content in transit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="por-section border-t border-white/[0.07] bg-[#05080d] px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto grid max-w-300 gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="05 / Questions"
            title="Good to know."
            description="Straightforward answers about how PorChatal currently works."
          />

          <div className="border-t border-[#344155]">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const answerId = `faq-answer-${index}`;

              return (
                <div
                  key={faq.question}
                  className="border-b border-[#344155]"
                >
                  <button
                    type="button"
                    className="por-faq-button flex w-full items-center justify-between gap-5 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() =>
                      setOpenFaq((current) =>
                        current === index ? -1 : index
                      )
                    }
                  >
                    <span className="text-sm font-semibold leading-6 text-[#E8E0D5] sm:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center border text-lg transition-colors ${isOpen
                        ? "border-[#B42335] text-[#D45B69]"
                        : "border-[#344155] text-[#8F877D]"
                        }`}
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={answerId}
                      className="pb-6 pr-8 text-sm leading-7 text-[#8F877D]"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/[0.07] bg-[#0A1220] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto flex max-w-300 flex-col items-start justify-between gap-8 border-l-2 border-[#B42335] 
        pl-6 sm:pl-10 lg:flex-row lg:items-center">
          <div>
            <SectionLabel>Your space is waiting</SectionLabel>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-[-1.5px] text-[#E8E0D5] sm:text-4xl">
              Start a conversation on your terms.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#8F877D]">
              Create an account and explore a more focused way to connect.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="por-button por-button-primary inline-flex min-h-12 shrink-0 items-center justify-center gap-3 border
             px-7 text-xs font-bold text-white"
          >
            Get started
            <ArrowIcon />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#05080d] px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-300 flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex w-fit items-center gap-3 text-left"
            aria-label="Back to top"
          >
            <BrandMark size={30} />
            <span className="text-base font-extrabold tracking-[-.7px]">
              por<span className="text-[#B42335]">chat</span>al
            </span>
          </button>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              ["About", "about"],
              ["Features", "features"],
              ["Privacy", "privacy"],
              ["FAQ", "faq"],
            ].map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="text-xs text-[#8F877D] transition-colors hover:text-[#E8E0D5]"
              >
                {label}
              </button>
            ))}
          </div>

          <p className="por-mono text-[9px] uppercase tracking-[1.1px] text-[#8F877D]">
            PorChatal / Private communication
          </p>
        </div>

        <div className="mx-auto mt-7 max-w-300 border-t border-white/[0.07] pt-5">
          <p className="max-w-4xl text-[11px] leading-6 text-[#706B66]">
            PorChatal is under development. Features and privacy behavior
            reflect the current implementation and may change. Avoid sending
            sensitive information until the security model has been completed
            and reviewed.
          </p>
        </div>
      </footer>
    </main>
  );
}
