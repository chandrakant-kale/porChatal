import { useMemo, useState } from "react";

/* =========================================================
   ICONS
========================================================= */

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4Z" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="m21.4 11.6-8.7 8.7a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5" />
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14.5s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01" />
      <path d="M15 9h.01" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-4 w-4"
    >
      <path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
      <path d="M14 8l4 4-4 4" />
      <path d="M18 12H9" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <rect x="8" y="8" width="11" height="11" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M20 11a8.1 8.1 0 0 0-14.8-4L3 10" />
      <path d="M3 5v5h5" />
      <path d="M4 13a8.1 8.1 0 0 0 14.8 4L21 14" />
      <path d="M21 19v-5h-5" />
    </svg>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  mobile = false,
  onClose,
  onNewConversation,
  conversations,
  activeChat,
  setActiveChat,
  search,
  setSearch,
  onLogout,
  loggingOut,
}) {
  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return conversations;
    }

    return conversations.filter((chat) => {
      return (
        chat.username?.toLowerCase().includes(query) ||
        chat.message?.toLowerCase().includes(query)
      );
    });
  }, [conversations, search]);

  return (
    <aside
      className={`
        flex h-full w-full shrink-0 flex-col
        border-r border-[#24364d]
        bg-[#070b11]
        ${mobile ? "shadow-2xl" : ""}
      `}
    >
      {/* BRAND */}

      <div className="flex h-18 shrink-0 items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#f47b20]" />

          <p className="por-display text-[19px] font-extrabold tracking-tighter">
            Por<span className="text-[#f47b20]">Chat</span>al
          </p>
        </div>

        {mobile && (
          <button
            onClick={onClose}
            className="text-white/35 transition hover:text-white"
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* NEW CONVERSATION */}

      <div className="px-4">
        <button
          onClick={onNewConversation}
          className="
            flex h-11.5 w-full items-center gap-3
            border border-[#f47b20]/35
            bg-[#f47b20]/4
            px-4 text-[#f47b20]
            transition
            hover:border-[#f47b20]/60
            hover:bg-[#f47b20]/8
          "
        >
          <PlusIcon />

          <span className="por-display text-[11px] font-bold">
            New conversation
          </span>
        </button>
      </div>

      {/* SEARCH */}

      <div className="px-4 pt-4">
        <div
          className="
            flex h-10.5 items-center gap-2.5
            border border-[#1d2d42]
            bg-[#0a1019]
            px-3 text-white/30
          "
        >
          <SearchIcon />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="
              w-full bg-transparent
              font-mono text-[9px]
              text-white outline-none
              placeholder:text-white/20
            "
          />
        </div>
      </div>

      {/* CONVERSATIONS */}

      <div className="px-5 pb-2 pt-6">
        <p className="por-mono text-[7px] uppercase tracking-[0.25em] text-white/25">
          Conversations
        </p>
      </div>

      <div className="por-scroll flex-1 overflow-y-auto px-2">
        {filteredConversations.length === 0 ? (
          <div className="px-5 pt-5">
            <p className="por-display text-[10px] leading-5 text-white/25">
              {search.trim()
                ? "No conversations found."
                : "No conversations yet."}
            </p>
          </div>
        ) : (
          filteredConversations.map((chat) => {
            const selected = activeChat?.id === chat.id;

            return (
              <button
                key={chat.id}
                onClick={() => {
                  setActiveChat(chat);

                  if (mobile) {
                    onClose();
                  }
                }}
                className={`
                  relative flex w-full items-center gap-3
                  px-3 py-3.5 text-left transition
                  ${selected ? "bg-[#0d1a2b]" : "hover:bg-white/2.5"}
                `}
              >
                {selected && (
                  <span className="absolute left-0 top-2 h-[calc(100%-16px)] w-0.5 bg-[#f47b20]" />
                )}

                <div
                  className={`
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full border
                    ${
                      selected
                        ? "border-[#29476b] bg-[#15253a]"
                        : "border-white/8 bg-[#111823]"
                    }
                  `}
                >
                  <span className="por-mono text-[10px] text-white/70">
                    {chat.username?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="por-display truncate text-[11px] font-semibold text-white/75">
                      {chat.username}
                    </p>

                    <span className="por-mono shrink-0 text-[7px] text-white/25">
                      {chat.time}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-[9px] text-white/30">
                    {chat.message || "No messages yet"}
                  </p>
                </div>

                {chat.online && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f47b20]" />
                )}
              </button>
            );
          })
        )}
      </div>

      {/* LOGOUT */}

      <div className="border-t border-[#1d2b3d] p-3">
        <button
          type="button"
          onClick={onLogout}
          disabled={loggingOut}
          className="
            flex h-10 w-full items-center gap-3
            px-3 text-white/45 transition
            hover:bg-white/2.5
            hover:text-white/75
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <LogoutIcon />

          <span className="por-display text-[10px]">
            {loggingOut ? "Signing out..." : "Sign out"}
          </span>
        </button>
      </div>
    </aside>
  );
}

/* =========================================================
   CHAT PAGE
========================================================= */

export default function ChatHome({
  conversations = [],
  messages = [],

  /*
    Backend callbacks

    createConnectionCode()
      -> POST /connections/code

    onJoinConversation(code)
      -> POST /connections/join

    onSelectConversation(conversation)
      -> load messages

    onSendMessage(data)
      -> send message

    onDeleteConnection(userId)
      -> DELETE /connections/:userId

    onLogout()
      -> logout
  */

  createConnectionCode,
  onSelectConversation,
  onSendMessage,
  onJoinConversation,
  onDeleteConnection,
  onLogout,
}) {
  /* =======================================================
     UI STATE
  ======================================================= */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sidebarWidth, setSidebarWidth] = useState(290);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [showNewConversation, setShowNewConversation] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [connectionCode, setConnectionCode] = useState("");

  const [generatedCode, setGeneratedCode] = useState("");

  const [codeExpiresAt, setCodeExpiresAt] = useState(null);

  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");

  const [activeChat, setActiveChat] = useState(null);

  const [sending, setSending] = useState(false);

  const [joining, setJoining] = useState(false);

  const [generatingCode, setGeneratingCode] = useState(false);

  const [copied, setCopied] = useState(false);

  const [loggingOut, setLoggingOut] = useState(false);

  const [error, setError] = useState("");

  /* =======================================================
     SELECT CONVERSATION
  ======================================================= */

  const handleSelectConversation = async (conversation) => {
    setActiveChat(conversation);

    setError("");

    setShowMenu(false);

    if (onSelectConversation) {
      try {
        await onSelectConversation(conversation);
      } catch (err) {
        setError(
          err?.message || "Unable to open this conversation."
        );
      }
    }
  };

  /* =======================================================
     GENERATE CONNECTION CODE
  ======================================================= */

  const handleGenerateCode = async () => {
    if (generatingCode) {
      return;
    }

    if (!createConnectionCode) {
      setError("Connection code service is not connected yet.");
      return;
    }

    try {
      setGeneratingCode(true);
      setError("");
      setCopied(false);

      const result = await createConnectionCode();

      /*
        Expected backend response:

        {
          success: true,
          code: "A7F92C",
          expiresAt: "..."
        }
      */

      if (!result?.code) {
        throw new Error("Server did not return a connection code.");
      }

      setGeneratedCode(result.code);
      setCodeExpiresAt(result.expiresAt || null);
    } catch (err) {
      setError(
        err?.message || "Unable to generate connection code."
      );
    } finally {
      setGeneratingCode(false);
    }
  };

  /* =======================================================
     COPY CONNECTION CODE
  ======================================================= */

  const copyConnectionCode = async () => {
    if (!generatedCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedCode);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setError("Unable to copy the connection code.");
    }
  };

  /* =======================================================
     RESET CONNECTION MODAL
  ======================================================= */

  const closeConnectionModal = () => {
    setShowNewConversation(false);

    setConnectionCode("");

    setGeneratedCode("");

    setCodeExpiresAt(null);

    setCopied(false);

    setError("");
  };

  /* =======================================================
     JOIN CONNECTION
  ======================================================= */

  const startConversation = async (e) => {
    e.preventDefault();

    const code = connectionCode.trim().toUpperCase();

    if (!code || joining) {
      return;
    }

    if (!onJoinConversation) {
      setError("Connection service is not connected yet.");
      return;
    }

    try {
      setJoining(true);

      setError("");

      /*
        Expected backend call:

        POST /connections/join

        {
          code: "A7F92C"
        }
      */

      const conversation = await onJoinConversation(code);

      if (conversation) {
        setActiveChat(conversation);
      }

      setConnectionCode("");

      setGeneratedCode("");

      setCodeExpiresAt(null);

      setShowNewConversation(false);
    } catch (err) {
      setError(
        err?.message || "Unable to join this conversation."
      );
    } finally {
      setJoining(false);
    }
  };

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const sendMessage = async (e) => {
    e.preventDefault();

    const cleanMessage = message.trim();

    if (!cleanMessage || !activeChat || sending) {
      return;
    }

    if (!onSendMessage) {
      setError("Messaging service is not connected yet.");
      return;
    }

    try {
      setSending(true);

      setError("");

      await onSendMessage({
        conversationId: activeChat.id,
        text: cleanMessage,
      });

      setMessage("");
    } catch (err) {
      setError(
        err?.message || "Message could not be sent."
      );
    } finally {
      setSending(false);
    }
  };

  /* =======================================================
     DISCONNECT
  ======================================================= */

  const handleDisconnect = async () => {
    if (!activeChat) {
      return;
    }

    if (!onDeleteConnection) {
      setError("Connection service is not connected yet.");
      return;
    }

    try {
      setError("");

      await onDeleteConnection(activeChat.user_id);

      setActiveChat(null);

      setShowMenu(false);
    } catch (err) {
      setError(
        err?.message || "Unable to disconnect."
      );
    }
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

    try {
      setLoggingOut(true);

      setError("");

      if (onLogout) {
        await onLogout();
        return;
      }

      setError("Logout service is not connected yet.");
    } catch (err) {
      setError(
        err?.message || "Unable to sign out."
      );
    } finally {
      setLoggingOut(false);
    }
  };

  /* =======================================================
     RESIZE SIDEBAR
  ======================================================= */

  const startSidebarResize = (e) => {
    e.preventDefault();

    const startX = e.clientX;

    const startWidth = sidebarWidth;

    const handleMouseMove = (event) => {
      const newWidth =
        startWidth + (event.clientX - startX);

      if (newWidth < 120) {
        setSidebarCollapsed(true);
        return;
      }

      setSidebarWidth(
        Math.min(
          Math.max(newWidth, 220),
          420
        )
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };

    document.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseup",
      handleMouseUp
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

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

        .por-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .por-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .por-scroll::-webkit-scrollbar-thumb {
          background: rgba(130, 170, 210, 0.12);
        }

        .por-chat-bg {
          background:
            radial-gradient(
              circle at 82% 10%,
              rgba(17, 53, 88, 0.28),
              transparent 27%
            ),
            radial-gradient(
              circle at 12% 78%,
              rgba(12, 42, 72, 0.18),
              transparent 25%
            ),
            #05080d;
        }

        .por-input {
          transition:
            border-color 180ms ease,
            background-color 180ms ease;
        }

        .por-input:focus {
          border-color: rgba(100, 160, 215, 0.42);
        }
      `}</style>

      <main className="relative h-screen overflow-hidden bg-[#05080d] text-white">
        <div className="flex h-full">

          {/* =================================================
              DESKTOP SIDEBAR
          ================================================= */}

          <div
            className="relative hidden shrink-0 lg:block"
            style={{
              width: sidebarCollapsed
                ? "34px"
                : `${sidebarWidth}px`,
            }}
          >
            {sidebarCollapsed ? (
              <button
                type="button"
                onClick={() =>
                  setSidebarCollapsed(false)
                }
                className="
                  flex h-full w-8.5
                  items-center justify-center
                  border-r border-[#24364d]
                  bg-[#070b11]
                  text-white/30
                  transition
                  hover:bg-[#0b111a]
                  hover:text-white/70
                "
                aria-label="Open sidebar"
              >
                <span className="flex flex-col gap-0.75">
                  <span className="h-0.5 w-2.5 rounded-full bg-current" />
                  <span className="h-0.5 w-2.5 rounded-full bg-current" />
                  <span className="h-0.5 w-2.5 rounded-full bg-current" />
                </span>
              </button>
            ) : (
              <>
                <Sidebar
                  conversations={conversations}
                  activeChat={activeChat}
                  setActiveChat={
                    handleSelectConversation
                  }
                  search={search}
                  setSearch={setSearch}
                  onNewConversation={() => {
                    setShowNewConversation(true);
                    setError("");
                  }}
                  onLogout={handleLogout}
                  loggingOut={loggingOut}
                />

                {/* DRAG HANDLE */}

                <div
                  onMouseDown={startSidebarResize}
                  className="
                    group absolute -right-0.75 top-0
                    z-50 h-full w-1.5
                    cursor-col-resize
                  "
                  role="separator"
                  aria-orientation="vertical"
                  aria-label="Resize sidebar"
                >
                  <div
                    className="
                      mx-auto h-full w-px
                      bg-transparent
                      transition
                      group-hover:bg-[#426582]
                    "
                  />
                </div>
              </>
            )}
          </div>

          {/* =================================================
              MOBILE SIDEBAR
          ================================================= */}

          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="
                  absolute inset-0
                  bg-black/65
                  backdrop-blur-[2px]
                "
                aria-label="Close sidebar"
              />

              <div className="relative h-full">
                <Sidebar
                  mobile
                  onClose={() =>
                    setSidebarOpen(false)
                  }
                  conversations={conversations}
                  activeChat={activeChat}
                  setActiveChat={
                    handleSelectConversation
                  }
                  search={search}
                  setSearch={setSearch}
                  onNewConversation={() => {
                    setSidebarOpen(false);
                    setShowNewConversation(true);
                  }}
                  onLogout={handleLogout}
                  loggingOut={loggingOut}
                />
              </div>
            </div>
          )}

          {/* =================================================
              MAIN CHAT
          ================================================= */}

          <section className="por-chat-bg relative flex min-w-0 flex-1 flex-col">

            {/* DECORATION */}

            <div
              className="
                pointer-events-none
                absolute -right-40 -top-40
                h-107.5 w-107.5
                rounded-full
                border border-[#5b8db8]/15
              "
            />

            <div
              className="
                pointer-events-none
                absolute bottom-32.5 left-8
                h-22.5 w-37.5 opacity-20
              "
              style={{
                backgroundImage:
                  "radial-gradient(#527a9f 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            />

            {/* =================================================
                CHAT HEADER
            ================================================= */}

            <header
              className="
                relative z-20
                flex h-18 shrink-0
                items-center justify-between
                border-b border-[#1d2d42]
                bg-[#060a10]/90
                px-4 sm:px-6
              "
            >
              <div className="flex min-w-0 items-center gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setSidebarOpen(true)
                  }
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    border border-[#203249]
                    bg-[#0a1019]
                    text-white/55
                    transition
                    hover:border-[#385573]
                    hover:text-white
                    lg:hidden
                  "
                  aria-label="Open sidebar"
                >
                  <MenuIcon />
                </button>

                {activeChat ? (
                  <>
                    <div
                      className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-full
                        border border-[#2a3c53]
                        bg-[#101824]
                      "
                    >
                      <span className="por-mono text-[10px] text-white/75">
                        {activeChat.username
                          ?.charAt(0)
                          ?.toUpperCase() || "?"}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="por-display truncate text-[12px] font-bold text-white/85">
                        {activeChat.username}
                      </p>

                      <div className="mt-0.5 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f47b20]" />

                        <span className="por-mono text-[7px] uppercase tracking-[0.15em] text-white/25">
                          {activeChat.online
                            ? "Online"
                            : "Offline"}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="por-display text-[12px] font-bold text-white/65">
                      PorChatal
                    </p>

                    <p className="por-mono mt-0.5 text-[7px] uppercase tracking-[0.15em] text-white/20">
                      No conversation selected
                    </p>
                  </div>
                )}
              </div>

              {/* HEADER ACTIONS */}

              <div className="relative flex items-center gap-1">

                <button
                  type="button"
                  className="
                    hidden h-9 w-9
                    items-center justify-center
                    text-white/35
                    transition
                    hover:text-white
                    sm:flex
                  "
                  aria-label="Search"
                >
                  <SearchIcon />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowMenu((value) => !value)
                  }
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    text-white/35
                    transition
                    hover:text-white
                  "
                  aria-label="More options"
                >
                  <MoreIcon />
                </button>

                {showMenu && (
                  <div
                    className="
                      absolute right-0 top-11 z-50
                      w-44
                      border border-[#263a52]
                      bg-[#080d14]
                      py-1
                      shadow-2xl
                    "
                  >
                    <button
                      type="button"
                      className="
                        flex h-10 w-full
                        items-center px-4
                        text-left text-[10px]
                        text-white/55
                        transition
                        hover:bg-white/4
                        hover:text-white
                      "
                    >
                      Clear conversation
                    </button>

                    <button
                      type="button"
                      onClick={handleDisconnect}
                      className="
                        flex h-10 w-full
                        items-center px-4
                        text-left text-[10px]
                        text-red-300/60
                        transition
                        hover:bg-red-400/4
                        hover:text-red-300
                      "
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            </header>

            {/* ERROR */}

            {error && (
              <div
                className="
                  relative z-30
                  border-b border-red-400/15
                  bg-red-400/4
                  px-4 py-2
                  text-center
                  font-mono text-[8px]
                  text-red-300/80
                "
              >
                {error}
              </div>
            )}

            {/* =================================================
                CHAT AREA
            ================================================= */}

            <div className="por-scroll relative z-10 flex-1 overflow-y-auto">

              {!activeChat ? (
                <div className="flex h-full items-center justify-center px-6">
                  <div className="max-w-90 text-center">

                    <div
                      className="
                        mx-auto mb-5
                        flex h-12 w-12
                        items-center justify-center
                        border border-[#263b53]
                        bg-[#0a111b]
                      "
                    >
                      <span className="h-2 w-2 rounded-full bg-[#f47b20]" />
                    </div>

                    <h2
                      className="
                        por-display
                        text-[22px]
                        font-extrabold
                        tracking-tighter
                        text-white/75
                      "
                    >
                      Start a private conversation
                    </h2>

                    <p
                      className="
                        por-display mt-3
                        text-[10px]
                        leading-5
                        text-white/25
                      "
                    >
                      Select an existing conversation
                      or create a new connection using
                      a temporary connection code.
                    </p>

                  </div>
                </div>
              ) : (
                <div
                  className="
                    mx-auto flex min-h-full
                    w-full max-w-275
                    flex-col px-4 py-8
                    sm:px-8
                  "
                >
                  <div className="mb-10 flex items-center justify-center">
                    <span
                      className="
                        por-mono rounded-lg
                        border border-[#1e3045]
                        bg-[#08101a]/80
                        px-3 py-1.5
                        text-[7px]
                        uppercase
                        tracking-[0.18em]
                        text-white/25
                      "
                    >
                      Today
                    </span>
                  </div>

                  <div className="flex-1 space-y-7">

                    {messages.length === 0 ? (
                      <div
                        className="
                          flex h-full
                          min-h-45
                          items-center
                          justify-center
                        "
                      >
                        <p className="por-display text-[10px] text-white/20">
                          No messages yet.
                        </p>
                      </div>
                    ) : (
                      messages.map((item) => (
                        <div
                          key={item.id}
                          className={`
                            flex
                            ${
                              item.mine
                                ? "justify-end"
                                : "justify-start"
                            }
                          `}
                        >
                          <div className="max-w-[78%] sm:max-w-[65%]">

                            <div
                              className={`
                                rounded-full
                                px-4 py-3
                                text-[11px]
                                leading-5
                                ${
                                  item.mine
                                    ? `
                                      border
                                      border-[#f47b20]/45
                                      bg-[#f47b20]
                                      text-black
                                    `
                                    : `
                                      border
                                      border-[#1f3045]
                                      bg-[#101925]
                                      text-white/75
                                    `
                                }
                              `}
                            >
                              {item.text}
                            </div>

                            <div
                              className={`
                                por-mono mt-1.5
                                text-[6px]
                                text-white/20
                                ${
                                  item.mine
                                    ? "text-right"
                                    : "text-left"
                                }
                              `}
                            >
                              {item.time}
                            </div>

                          </div>
                        </div>
                      ))
                    )}

                  </div>
                </div>
              )}

            </div>

            {/* =================================================
                CHAT COMPOSER
            ================================================= */}

            <div
              className="
                relative z-20
                shrink-0
                bg-[#05080d]
                px-3 pb-4 pt-3
                sm:px-6 sm:pb-5
              "
            >
              <form
                onSubmit={sendMessage}
                className="mx-auto w-full max-w-250"
              >
                <div
                  className="
                    flex min-h-16
                    items-center gap-2
                    rounded-4xl
                    border border-white/12
                    bg-[#080b18]
                    px-3
                    shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                    transition
                    focus-within:border-white/18
                  "
                >
                  <button
                    type="button"
                    className="
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-full
                      text-white/65
                      transition
                      hover:bg-white/[0.07]
                      hover:text-white
                    "
                    aria-label="Add"
                  >
                    <PlusIcon />
                  </button>

                  <textarea
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !e.shiftKey
                      ) {
                        e.preventDefault();
                        sendMessage(e);
                      }
                    }}
                    rows={1}
                    disabled={!activeChat || sending}
                    placeholder={
                      activeChat
                        ? "Type a message"
                        : "Select a conversation"
                    }
                    className="
                      min-h-11 flex-1
                      resize-none
                      bg-transparent
                      px-5 py-3
                      font-mono text-[15px]
                      leading-5
                      text-white
                      outline-none
                      placeholder:text-white/35
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  />

                  <div className="flex shrink-0 items-center gap-1">

                    <button
                      type="button"
                      className="
                        hidden h-9 w-9
                        items-center justify-center
                        rounded-full
                        text-white/45
                        transition
                        hover:bg-white/6
                        hover:text-white
                        sm:flex
                      "
                      aria-label="Attach"
                    >
                      <PaperclipIcon />
                    </button>

                    <button
                      type="button"
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        text-white/45
                        transition
                        hover:bg-white/6
                        hover:text-white
                      "
                      aria-label="Emoji"
                    >
                      <SmileIcon />
                    </button>

                    <button
                      type="submit"
                      disabled={
                        !activeChat ||
                        !message.trim() ||
                        sending
                      }
                      className="
                        flex h-10 w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#f47b20]
                        text-black
                        transition-all
                        duration-200
                        hover:scale-[1.03]
                        hover:bg-[#ff8b38]
                        disabled:cursor-not-allowed
                        disabled:bg-white/12
                        disabled:text-white/25
                      "
                      aria-label="Send message"
                    >
                      <SendIcon />
                    </button>

                  </div>
                </div>

                <p
                  className="
                    mt-2 text-center
                    font-mono text-[6px]
                    uppercase tracking-[0.14em]
                    text-white/15
                  "
                >
                  Private conversations · Temporary by design
                </p>
              </form>
            </div>
          </section>
        </div>

        {/* =====================================================
            NEW CONVERSATION MODAL
        ===================================================== */}

        {showNewConversation && (
          <div
            className="
              fixed inset-0 z-60
              flex items-center justify-center
              bg-black/70
              px-5
              backdrop-blur-sm
            "
          >
            <div
              className="
                w-full max-w-105
                border border-[#263a52]
                bg-[#080d14]
                p-6
                shadow-2xl
                sm:p-7
              "
            >

              {/* HEADER */}

              <div className="mb-6">

                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[#f47b20]" />

                  <span
                    className="
                      por-mono
                      text-[7px]
                      uppercase
                      tracking-[0.25em]
                      text-[#f47b20]
                    "
                  >
                    New conversation
                  </span>
                </div>

                <h2
                  className="
                    por-display
                    text-[29px]
                    font-extrabold
                    tracking-[-0.055em]
                  "
                >
                  Connect with someone.
                </h2>

                <p
                  className="
                    por-display mt-3
                    text-[10px]
                    leading-5
                    text-white/35
                  "
                >
                  Generate your own temporary code
                  or enter a code shared with you.
                </p>

              </div>

              {/* =================================================
                  GENERATE CODE
              ================================================= */}

              <div className="mb-6">

                <div className="mb-2 flex items-center justify-between">
                  <label
                    className="
                      por-mono
                      text-[8px]
                      uppercase
                      tracking-[0.2em]
                      text-white/30
                    "
                  >
                    Your connection code
                  </label>

                  {codeExpiresAt && (
                    <span className="por-mono text-[7px] text-white/20">
                      Expires in 3 minutes
                    </span>
                  )}
                </div>

                {generatedCode ? (
                  <div
                    className="
                      border
                      border-[#f47b20]/30
                      bg-[#0a1119]
                      p-4
                    "
                  >
                    <div className="flex items-center justify-between gap-3">

                      <span
                        className="
                          por-mono
                          text-2xl
                          font-bold
                          tracking-[0.22em]
                          text-[#f47b20]
                        "
                      >
                        {generatedCode}
                      </span>

                      <button
                        type="button"
                        onClick={copyConnectionCode}
                        className="
                          flex h-9
                          items-center gap-2
                          border border-[#263a52]
                          px-3
                          text-[8px]
                          text-white/45
                          transition
                          hover:border-[#385573]
                          hover:text-white
                        "
                      >
                        <CopyIcon />

                        {copied ? "Copied" : "Copy"}
                      </button>

                    </div>

                    <p
                      className="
                        por-mono mt-3
                        text-[7px]
                        leading-4
                        text-white/25
                      "
                    >
                      Share this code with the person
                      you want to connect with. It can
                      only be used once.
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleGenerateCode}
                    disabled={generatingCode}
                    className="
                      flex h-12.5
                      w-full
                      items-center
                      justify-center
                      gap-2
                      border
                      border-[#f47b20]/25
                      bg-[#f47b20]/5
                      text-[9px]
                      font-bold
                      text-[#f47b20]
                      transition
                      hover:border-[#f47b20]/50
                      hover:bg-[#f47b20]/10
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <RefreshIcon />

                    {generatingCode
                      ? "Generating..."
                      : "Generate connection code"}
                  </button>
                )}
              </div>

              {/* DIVIDER */}

              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#1d2d42]" />

                <span
                  className="
                    por-mono
                    text-[7px]
                    uppercase
                    tracking-[0.2em]
                    text-white/20
                  "
                >
                  or
                </span>

                <div className="h-px flex-1 bg-[#1d2d42]" />
              </div>

              {/* =================================================
                  JOIN WITH CODE
              ================================================= */}

              <form onSubmit={startConversation}>

                <label
                  htmlFor="connectionCode"
                  className="
                    por-mono mb-2
                    block
                    text-[8px]
                    uppercase
                    tracking-[0.2em]
                    text-white/30
                  "
                >
                  Enter someone's code
                </label>

                <input
                  id="connectionCode"
                  autoFocus
                  value={connectionCode}
                  maxLength={6}
                  onChange={(e) =>
                    setConnectionCode(
                      e.target.value
                        .toUpperCase()
                        .replace(/[^A-F0-9]/g, "")
                    )
                  }
                  placeholder="A7F92C"
                  className="
                    por-input
                    h-12.5
                    w-full
                    border
                    border-[#1e3045]
                    bg-[#05090f]
                    px-4
                    font-mono
                    text-sm
                    tracking-[0.15em]
                    text-white
                    outline-none
                    placeholder:text-white/15
                  "
                />

                <div className="mt-5 flex gap-2">

                  <button
                    type="button"
                    onClick={closeConnectionModal}
                    className="
                      h-11
                      flex-1
                      border
                      border-[#1e3045]
                      text-[10px]
                      text-white/40
                      transition
                      hover:border-[#385573]
                      hover:text-white/70
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      connectionCode.trim().length !== 6 ||
                      joining
                    }
                    className="
                      h-11
                      flex-1
                      bg-[#f47b20]
                      text-[10px]
                      font-bold
                      text-black
                      transition
                      hover:bg-[#ff8b38]
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                  >
                    {joining
                      ? "Connecting..."
                      : "Connect"}
                  </button>

                </div>
              </form>

            </div>
          </div>
        )}
      </main>
    </>
  );
}