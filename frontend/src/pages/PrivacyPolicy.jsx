
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

// IMPORTANT: Replace this with a real monitored privacy email
const PRIVACY_EMAIL = "not Provided";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information", title: "Information we collect" },
  { id: "usage", title: "How we use information" },
  { id: "messages", title: "Messages and storage" },
  { id: "connections", title: "Connection codes" },
  { id: "cookies", title: "Cookies and authentication" },
  { id: "security", title: "Security" },
  { id: "sharing", title: "Third-party services" },
  { id: "retention", title: "Data retention" },
  { id: "rights", title: "Your privacy rights" },
  { id: "children", title: "Children's privacy" },
  { id: "international", title: "International transfers" },
  { id: "changes", title: "Policy changes" },
  { id: "contact", title: "Contact us" },
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

function SectionLabel({ children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-8 bg-[#B42335]" />
      <span className="por-mono text-[10px] uppercase tracking-[2px] text-[#D45B69]">
        {children}
      </span>
    </div>
  );
}

function PolicySection({ id, number, title, children, sectionRefs }) {
  return (
    <section
      id={id}
      ref={(element) => {
        sectionRefs.current[id] = element;
      }}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 border-b border-[#344155] py-10 last:border-0 sm:py-12"
    >
      <div className="mb-5 flex items-center gap-4">
        <span className="por-mono text-xs text-[#D45B69]">
          {number}
        </span>
        <span className="h-px w-8 bg-[#344155]" />
      </div>

      <h2
        id={`${id}-heading`}
        className="mb-6 text-xl font-bold tracking-tight text-[#E8E0D5] sm:text-2xl"
      >
        {title}
      </h2>

      <div className="space-y-5 text-sm leading-8 text-[#A9A39A]">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState("introduction");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (id) => {
    const target = sectionRefs.current[id];

    if (!target) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });

    setActiveSection(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-110px 0px -65% 0px",
        threshold: 0,
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.title = "Privacy Policy | PorChatal";

    const description =
      "Learn how PorChatal collects, uses, protects, and retains account and messaging information.";

    let meta = document.querySelector(
      'meta[name="description"]'
    );

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }

    const previousDescription = meta.content;
    meta.content = description;

    return () => {
      document.title = "PorChatal";
      meta.content = previousDescription;
    };
  }, []);

  const updatedDate = "November 10, 2026";

  return (
    <main
      className="min-h-screen overflow-x-clip bg-[#05080d] text-[#E8E0D5]"
      style={{ fontFamily: '"Manrope", sans-serif' }}
    >
      <style>{`
        .por-mono {
          font-family: "DM Mono", monospace;
        }

        .policy-section {
          scroll-margin-top: 105px;
        }

        .policy-nav-button {
          position: relative;
          transition:
            color 180ms ease,
            background-color 180ms ease;
        }

        .policy-nav-button:focus-visible,
        .policy-action:focus-visible {
          outline: 2px solid #D45B69;
          outline-offset: 4px;
        }

        .policy-nav-button[aria-current="location"] {
          color: #E8E0D5;
          background: rgba(180, 35, 53, 0.09);
        }

        .policy-nav-button[aria-current="location"]::before {
          content: "";
          position: absolute;
          left: 0;
          top: 20%;
          height: 60%;
          width: 2px;
          background: #B42335;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[#05080d]/95 shadow-lg backdrop-blur-xl"
            : "border-white/[0.06] bg-[#05080d]/80 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12"
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5"
            aria-label="Return to PorChatal homepage"
          >
            <BrandMark />
            <span className="text-lg font-extrabold tracking-tight">
              por<span className="text-[#B42335]">chat</span>al
            </span>
          </button>

          <div className="flex items-center gap-4">
            <span className="por-mono hidden text-[9px] uppercase tracking-[1.5px] text-[#8F877D] sm:block">
              Legal / Privacy
            </span>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="policy-action text-xs font-semibold text-[#B7ADA0] transition hover:text-white"
            >
              Back to home
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="border-b border-white/[0.07] bg-[#0A1220] px-6 pb-14 pt-36 sm:px-10 sm:pb-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Legal / Data protection</SectionLabel>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-[-2px] sm:text-6xl lg:text-7xl">
            Your conversations.
            <br />
            <span className="text-[#B7ADA0]">Your privacy.</span>
          </h1>

          <div className="mt-8 h-0.5 w-16 bg-[#B42335]" />

          <p className="mt-7 max-w-2xl text-sm leading-8 text-[#A9A39A] sm:text-base">
            This policy explains how PorChatal handles information
            when you create an account, connect with other users,
            and communicate through our platform.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <span className="por-mono text-[10px] uppercase tracking-wider text-[#8F877D]">
              Last updated: {updatedDate}
            </span>
            <span className="h-1 w-1 bg-[#B42335]" />
            <span className="por-mono text-[10px] uppercase tracking-wider text-[#8F877D]">
              14 sections
            </span>
          </div>
        </div>
      </section>

      {/* Policy content */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-20 lg:px-16 lg:py-20">

        {/* Mobile contents */}
        <div className="lg:hidden">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-policy-navigation"
            onClick={() => setMenuOpen((value) => !value)}
            className="policy-action flex min-h-12 w-full items-center justify-between border border-[#344155] px-4 text-left text-sm"
          >
            <span className="text-[#B7ADA0]">
              Contents
              <span className="ml-3 text-[#E8E0D5]">
                {sections.find(
                  (section) => section.id === activeSection
                )?.title}
              </span>
            </span>
            <span className="text-[#D45B69]">
              {menuOpen ? "−" : "+"}
            </span>
          </button>

          {menuOpen && (
            <nav
              id="mobile-policy-navigation"
              aria-label="Privacy policy sections"
              className="mt-2 grid grid-cols-1 border border-[#344155] bg-[#0A1220] p-2 sm:grid-cols-2"
            >
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  aria-current={
                    activeSection === section.id
                      ? "location"
                      : undefined
                  }
                  className="policy-nav-button flex min-h-11 items-center gap-3 px-3 text-left text-xs text-[#8F877D] hover:text-white"
                >
                  <span className="por-mono text-[#D45B69]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Desktop navigation */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="por-mono mb-5 text-[10px] uppercase tracking-[2px] text-[#8F877D]">
              On this page
            </p>

            <nav
              aria-label="Privacy policy sections"
              className="flex flex-col gap-1"
            >
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  aria-current={
                    activeSection === section.id
                      ? "location"
                      : undefined
                  }
                  className="policy-nav-button flex min-h-10 items-center gap-3 px-3 text-left text-xs text-[#8F877D] hover:text-white"
                >
                  <span className="por-mono text-[10px] text-[#D45B69]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </button>
              ))}
            </nav>

            <div className="mt-9 border-t border-[#344155] pt-6">
              <p className="text-xs leading-6 text-[#8F877D]">
                Have a question about your information?
              </p>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="policy-action mt-3 text-xs font-semibold text-[#D45B69] hover:text-white"
              >
                Contact us →
              </button>
            </div>
          </div>
        </aside>

        {/* Policy sections */}
        <article className="min-w-0 max-w-3xl">

          <PolicySection
            id="introduction"
            number="01"
            title="Introduction"
            sectionRefs={sectionRefs}
          >
            <p>
              PorChatal is a communication platform designed around
              direct conversations and temporary connection codes.
              This Privacy Policy describes the information we
              process and the choices available to you.
            </p>
            <p>
              By using PorChatal, you acknowledge that your
              information will be handled as described in this
              policy. If you do not agree with these practices,
              please do not use the service.
            </p>
          </PolicySection>

          <PolicySection
            id="information"
            number="02"
            title="Information we collect"
            sectionRefs={sectionRefs}
          >
            <p>
              We collect information needed to create accounts,
              authenticate users, and operate conversations.
            </p>

            <div className="overflow-x-auto border border-[#344155]">
              <table className="w-full min-w-[440px] text-left text-xs">
                <thead className="bg-[#0A1220] text-[#B7ADA0]">
                  <tr>
                    <th className="px-4 py-4 font-semibold">Information</th>
                    <th className="px-4 py-4 font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#344155] text-[#A9A39A]">
                  <tr>
                    <td className="px-4 py-4">Username</td>
                    <td className="px-4 py-4">Account identification</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">Password hash</td>
                    <td className="px-4 py-4">Authentication</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">User identifier</td>
                    <td className="px-4 py-4">Account relationships</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">Connection records</td>
                    <td className="px-4 py-4">Managing conversations</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4">Connection-code hashes</td>
                    <td className="px-4 py-4">Temporary invitations</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Our infrastructure and security systems may also
              process technical information such as IP addresses,
              request metadata, connection events, and error logs.
              The precise information retained depends on our
              hosting and operational configuration.
            </p>

            <p>
              Do not include sensitive personal information in
              usernames or messages.
            </p>
          </PolicySection>

          <PolicySection
            id="usage"
            number="03"
            title="How we use information"
            sectionRefs={sectionRefs}
          >
            <p>Information is used to:</p>
            <ul className="list-disc space-y-3 pl-5">
              <li>Create and manage user accounts.</li>
              <li>Verify authentication and maintain sessions.</li>
              <li>Generate and validate connection codes.</li>
              <li>Establish and manage user connections.</li>
              <li>Deliver messages through real-time connections.</li>
              <li>Prevent abuse and protect platform security.</li>
              <li>Diagnose technical problems and maintain the service.</li>
            </ul>
          </PolicySection>

          <PolicySection
            id="messages"
            number="04"
            title="Messages and storage"
            sectionRefs={sectionRefs}
          >
            <p>
              PorChatal's current messaging implementation does
              not intentionally save message content to its
              PostgreSQL database. Messages are processed in
              application memory and delivered using Socket.IO.
            </p>

            <p>
              This means message content may be lost when the
              server restarts, disconnects, or loses its
              in-memory state. We do not promise that messages
              disappear immediately when a browser tab closes.
            </p>

            <div className="border-l-2 border-[#B42335] bg-[#0A1220] p-5">
              <p className="font-semibold text-[#E8E0D5]">
                Important: ephemeral does not mean impossible to copy.
              </p>
              <p className="mt-2">
                Recipients may take screenshots, copy text, record
                their screens, or retain information using their
                own devices or software.
              </p>
            </div>

            <p>
              Messages are not currently protected by implemented
              end-to-end encryption. The server processes message
              content in readable form. Do not use PorChatal for
              highly confidential communications.
            </p>
          </PolicySection>

          <PolicySection
            id="connections"
            number="05"
            title="Connection codes"
            sectionRefs={sectionRefs}
          >
            <p>
              Connection codes allow users to establish
              relationships without sharing a permanent public
              profile link.
            </p>

            <p>
              The current implementation generates short-lived
              codes, stores their SHA-256 hashes, and applies
              expiration and usage limits.
            </p>

            <p>
              Connection records are stored to support the
              communication features. Sharing a code with another
              person allows that person to attempt to establish
              a connection under the code's restrictions.
            </p>

            <p>
              Treat connection codes as private invitations and
              share them only with intended recipients.
            </p>
          </PolicySection>

          <PolicySection
            id="cookies"
            number="06"
            title="Cookies and authentication"
            sectionRefs={sectionRefs}
          >
            <p>
              PorChatal uses an authentication cookie to maintain
              your login session. The cookie contains a signed
              authentication token.
            </p>

            <p>
              The authentication cookie is configured as
              HTTP-only, which prevents ordinary frontend
              JavaScript from reading its value. In production,
              it is configured for secure HTTPS transmission.
            </p>

            <p>
              We may also use a separate CSRF protection cookie
              if that protection is enabled in the deployed
              application.
            </p>

            <p>
              You can log out to clear your browser's
              authentication cookie. Clearing cookies in your
              browser may also end your session.
            </p>
          </PolicySection>

          <PolicySection
            id="security"
            number="07"
            title="Security"
            sectionRefs={sectionRefs}
          >
            <p>
              We use technical measures intended to protect
              accounts and platform infrastructure. These
              currently include:
            </p>

            <ul className="list-disc space-y-3 pl-5">
              <li>Password hashing using bcrypt.</li>
              <li>JWT-based authentication.</li>
              <li>HTTP-only authentication cookies.</li>
              <li>Parameterized PostgreSQL queries.</li>
              <li>Rate limiting on selected endpoints.</li>
              <li>Authentication and conversation authorization checks.</li>
              <li>HTTPS through supported hosting infrastructure.</li>
            </ul>

            <p>
              Security measures may change as the platform
              develops. No internet service can guarantee
              absolute security, and we cannot promise that
              unauthorized access will never occur.
            </p>
          </PolicySection>

          <PolicySection
            id="sharing"
            number="08"
            title="Third-party services"
            sectionRefs={sectionRefs}
          >
            <p>
              PorChatal uses third-party infrastructure to
              operate its application and database. Depending
              on the deployed configuration, these providers
              may include:
            </p>

            <ul className="list-disc space-y-3 pl-5">
              <li>Vercel for frontend hosting.</li>
              <li>Render for backend hosting.</li>
              <li>Neon or another configured PostgreSQL provider.</li>
            </ul>

            <p>
              These providers may process technical data,
              network information, and service logs as part
              of delivering their infrastructure.
            </p>

            <p>
              We do not sell personal information. We may
              disclose information where required by applicable
              law or where necessary to protect the rights,
              safety, and security of users or the service.
            </p>

            <p>
              Before publication, verify the actual providers
              used by your deployed application and link to
              their current privacy policies.
            </p>
          </PolicySection>

          <PolicySection
            id="retention"
            number="09"
            title="Data retention"
            sectionRefs={sectionRefs}
          >
            <p>
              Account information and connection records are
              retained while needed to provide the service
              or meet applicable legal and security obligations.
            </p>

            <p>
              Connection codes are subject to their configured
              expiry and usage rules. Message content is
              intended to remain in application memory rather
              than permanent database storage.
            </p>

            <p>
              Infrastructure logs, backups, and operational
              records may have separate retention periods
              controlled by the relevant provider or system.
              Their retention is not necessarily affected
              immediately by deleting your account.
            </p>
          </PolicySection>

          <PolicySection
            id="rights"
            number="10"
            title="Your privacy rights"
            sectionRefs={sectionRefs}
          >
            <p>
              Depending on the laws applicable to you, you may
              have rights to request access to, correction of,
              deletion of, or information about the processing
              of your personal data.
            </p>

            <p>
              You can use available account-management
              functionality to delete your account. You may
              also contact us to ask questions or make a
              privacy-related request.
            </p>

            <p>
              Some information may need to be retained where
              required by law or for legitimate security
              and operational purposes.
            </p>
          </PolicySection>

          <PolicySection
            id="children"
            number="11"
            title="Children's privacy"
            sectionRefs={sectionRefs}
          >
            <p>
              PorChatal is not designed for children who are
              below the minimum age permitted to use the
              service under applicable law.
            </p>

            <p>
              We do not knowingly seek to collect personal
              information from children who are not legally
              permitted to use the platform. If you believe
              such information has been provided, contact us
              so that we can review the matter.
            </p>
          </PolicySection>

          <PolicySection
            id="international"
            number="12"
            title="International data transfers"
            sectionRefs={sectionRefs}
          >
            <p>
              Our hosting and infrastructure providers may
              process information in countries different
              from your country of residence.
            </p>

            <p>
              Where applicable, we will take steps required
              by relevant data protection laws when
              information is transferred internationally.
            </p>
          </PolicySection>

          <PolicySection
            id="changes"
            number="13"
            title="Policy changes"
            sectionRefs={sectionRefs}
          >
            <p>
              We may update this policy as PorChatal develops,
              as our data practices change, or as legal
              requirements evolve.
            </p>

            <p>
              The revised policy will be published on this
              page with an updated date. Where required by
              applicable law, we will provide additional
              notice of significant changes.
            </p>
          </PolicySection>

          <PolicySection
            id="contact"
            number="14"
            title="Contact us"
            sectionRefs={sectionRefs}
          >
            <p>
              For questions, requests, or concerns about
              this Privacy Policy or the handling of your
              information, contact:
            </p>

            <div className="border border-[#344155] bg-[#0A1220] p-6">
              <p className="por-mono text-[10px] uppercase tracking-widest text-[#8F877D]">
                Privacy enquiries
              </p>

              <a
                href={`mailto:${PRIVACY_EMAIL}`}
                className="mt-3 inline-block break-all text-sm font-semibold text-[#D45B69] hover:text-white"
              >
                {PRIVACY_EMAIL}
              </a>

              <p className="mt-4 text-xs leading-6 text-[#8F877D]">
                Replace the placeholder address with a monitored
                official PorChatal privacy email before publishing.
              </p>
            </div>
          </PolicySection>

          {/* Footer */}
          <div className="flex flex-col justify-between gap-5 border-t border-[#344155] py-8 sm:flex-row sm:items-center">
            <p className="por-mono text-[9px] uppercase tracking-wider text-[#706B66]">
              PorChatal / Privacy & data protection
            </p>

            <button
              type="button"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                  ).matches
                    ? "auto"
                    : "smooth",
                });
              }}
              className="policy-action w-fit text-xs font-semibold text-[#B7ADA0] transition hover:text-[#D45B69]"
            >
              Back to top ↑
            </button>
          </div>
        </article>
      </div>

      {/* Bottom footer */}
      <footer className="border-t border-white/[0.07] bg-[#0A1220] px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex w-fit items-center gap-2.5"
          >
            <BrandMark size={28} />
            <span className="font-extrabold tracking-tight">
              por<span className="text-[#B42335]">chat</span>al
            </span>
          </button>

          <p className="por-mono text-[9px] uppercase tracking-wider text-[#706B66]">
            © {new Date().getFullYear()} PorChatal
          </p>
        </div>
      </footer>
    </main>
  );
}
