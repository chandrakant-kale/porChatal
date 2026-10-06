import { useState } from "react";

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

function UserIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-4 w-4"
        >
            <circle cx="12" cy="8" r="3.2" />
            <path d="M5 20c.7-3.4 3.1-5 7-5s6.3 1.6 7 5" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-4 w-4"
        >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.5 1.5-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.1v-.2a1.7 1.7 
      0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.5-1.5.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H7v-2.1h.2a1.7 1.7 0 0 0 1.6-1
       1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.5-1.5.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V6h2.1v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0
        0 1.9-.3l.1-.1 1.5 1.5-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2V14h-.2a1.7 1.7 0 0 0-1.6 1Z" />
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

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
    mobile = false,
    onClose,
    onNewConversation,
    activeChat,
    setActiveChat,
}) {
    const conversations = [
        {
            id: 1,
            username: "Alex",
            message: "Hey, are you there?",
            time: "12:45",
            online: true,
        },
        {
            id: 2,
            username: "Riley",
            message: "This will be temporary.",
            time: "10:20",
            online: false,
        },
        {
            id: 3,
            username: "Sam",
            message: "Got it.",
            time: "Yesterday",
            online: false,
        },
        {
            id: 4,
            username: "Jordan",
            message: "Let's talk.",
            time: "Yesterday",
            online: false,
        },
    ];

    return (
        <aside
            className={`
        flex h-full w-72.5 shrink-0 flex-col
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
                    >
                        <CloseIcon />
                    </button>
                )}

            </div>


            {/* NEW CONVERSATION */}

            <div className="px-4">

                <button
                    onClick={onNewConversation}
                    className=" flex h-11.5 w-full items-center gap-3 border border-[#f47b20]/35 bg-[#f47b20]/4 px-4 text-[#f47b20]
            transition hover:border-[#f47b20]/60 hover:bg-[#f47b20]/8 "
                >

                    <PlusIcon />

                    <span className="por-display text-[11px] font-bold">
                        New conversation
                    </span>

                </button>

            </div>


            {/* SEARCH */}

            <div className="px-4 pt-4">

                <div className="flex h-10.5 items-center gap-2.5 border border-[#1d2d42] bg-[#0a1019] px-3 text-white/30">

                    <SearchIcon />

                    <input
                        placeholder="Search conversations..."
                        className=" w-full bg-transparent font-mono text-[9px] text-white outline-none placeholder:text-white/20 " />

                </div>

            </div>


            {/* CONVERSATIONS */}

            <div className="px-5 pb-2 pt-6">

                <p className="por-mono text-[7px] uppercase tracking-[0.25em] text-white/25">
                    Conversations
                </p>

            </div>

            <div className="flex-1 overflow-y-auto px-2">

                {conversations.map((chat) => {

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
                px-3 py-3.5 text-left
                transition
                ${selected
                                    ? "bg-[#0d1a2b]"
                                    : "hover:bg-white/2.5"
                                }
              `}
                        >

                            {selected && (
                                <span className="absolute left-0 top-2 h-[calc(100%-16px)] w-0.5 bg-[#f47b20]" />
                            )}

                            <div
                                className={`
                  flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-full
                  border
                  ${selected
                                        ? "border-[#29476b] bg-[#15253a]"
                                        : "border-white/8 bg-[#111823]"
                                    }
                `}
                            >

                                <span className="por-mono text-[10px] text-white/70">
                                    {chat.username.charAt(0)}
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
                                    {chat.message}
                                </p>

                            </div>

                            {chat.online && (
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f47b20]" />
                            )}

                        </button>
                    );
                })}

            </div>


            {/* BOTTOM NAV */}

            <div className="border-t border-[#1d2b3d] p-3">

                <button className="flex h-10 w-full items-center gap-3 px-3 text-white/45 transition hover:bg-white/2.5
         hover:text-white/75">

                    <UserIcon />

                    <span className="por-display text-[10px]">
                        Profile
                    </span>

                </button>

                <button className="flex h-10 w-full items-center gap-3 px-3 text-white/45 transition hover:bg-white/2.5
         hover:text-white/75">

                    <SettingsIcon />

                    <span className="por-display text-[10px]">
                        Settings
                    </span>

                </button>

                <button className="flex h-10 w-full items-center gap-3 px-3 text-white/45 transition hover:bg-white/2.5
         hover:text-white/75">

                    <LogoutIcon />

                    <span className="por-display text-[10px]">
                        Sign out
                    </span>

                </button>

            </div>

        </aside>
    );
}

/* =========================================================
   CHAT PAGE
========================================================= */

export default function Chat() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [showNewConversation, setShowNewConversation] =
        useState(false);

    const [showMenu, setShowMenu] = useState(false);

    const [connectionCode, setConnectionCode] = useState("");

    const [message, setMessage] = useState("");

    const [activeChat, setActiveChat] = useState({
        id: 1,
        username: "Alex",
        message: "Hey, are you there?",
        time: "12:45",
        online: true,
    });

    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hey, are you there?",
            time: "12:45",
            mine: false,
        },
        {
            id: 2,
            text: "Yes, I'm here.",
            time: "12:46",
            mine: true,
        },
    ]);


    /* =======================================================
       SEND MESSAGE
    ======================================================= */

    const sendMessage = (e) => {

        e.preventDefault();

        const cleanMessage = message.trim();

        if (!cleanMessage) return;

        setMessages((previous) => [
            ...previous,
            {
                id: crypto.randomUUID(),
                text: cleanMessage,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                mine: true,
            },
        ]);

        setMessage("");
    };


    /* =======================================================
       START CONVERSATION
    ======================================================= */

    const startConversation = (e) => {

        e.preventDefault();

        if (!connectionCode.trim()) return;

        /*
          Backend later:
    
          POST /connections/join
    
          {
            code: connectionCode
          }
        */

        const newChat = {
            id: Date.now(),
            username: "New connection",
            message: "Start a conversation...",
            time: "Now",
            online: true,
        };

        setActiveChat(newChat);

        setMessages([]);

        setConnectionCode("");

        setShowNewConversation(false);
    };


    return (
        <>

            {/* =====================================================
          STYLES
      ===================================================== */}

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


            {/* =====================================================
          APP
      ===================================================== */}

            <main className="relative h-screen overflow-hidden bg-[#05080d] text-white">

                <div className="flex h-full">


                    {/* =================================================
              DESKTOP SIDEBAR
          ================================================= */}

                    <div className="hidden lg:block">

                        <Sidebar
                            activeChat={activeChat}
                            setActiveChat={setActiveChat}
                            onNewConversation={() =>
                                setShowNewConversation(true)
                            }
                        />

                    </div>


                    {/* =================================================
              MOBILE SIDEBAR OVERLAY
          ================================================= */}

                    {sidebarOpen && (

                        <div className="fixed inset-0 z-50 lg:hidden">

                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
                                aria-label="Close sidebar"
                            />

                            <div className="relative h-full">

                                <Sidebar
                                    mobile
                                    onClose={() => setSidebarOpen(false)}
                                    activeChat={activeChat}
                                    setActiveChat={setActiveChat}
                                    onNewConversation={() => {
                                        setSidebarOpen(false);
                                        setShowNewConversation(true);
                                    }}
                                />

                            </div>

                        </div>

                    )}


                    {/* =================================================
              MAIN CHAT
          ================================================= */}

                    <section className="por-chat-bg relative flex min-w-0 flex-1 flex-col">


                        {/* =================================================
                SUBTLE DECORATION
            ================================================= */}

                        {/* ONE LARGE ARC */}

                        <div
                            className=" pointer-events-none absolute -right-40 -top-40 h-107.5 w-107.5 rounded-full border
                border-[#5b8db8]/15 "
                        />

                        {/* SMALL DOT GRID */}

                        <div
                            className=" pointer-events-none absolute bottom-32.5 left-8 h-22.5 w-37.5 opacity-20 "
                            style={{
                                backgroundImage:
                                    "radial-gradient(#527a9f 1px, transparent 1px)",
                                backgroundSize: "14px 14px",
                            }}
                        />


                        {/* =================================================
                CHAT HEADER
            ================================================= */}

                        <header className="relative z-20 flex h-18 shrink-0 items-center justify-between border-b border-[#1d2d42]
             bg-[#060a10]/90 px-4 sm:px-6">


                            <div className="flex min-w-0 items-center gap-3">

                                {/* MOBILE MENU */}

                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#203249] bg-[#0a1019]
                   text-white/55 transition hover:border-[#385573] hover:text-white lg:hidden"
                                    aria-label="Open sidebar"
                                >
                                    <MenuIcon />
                                </button>


                                {/* AVATAR */}

                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2a3c53] 
                bg-[#101824]">

                                    <span className="por-mono text-[10px] text-white/75">
                                        {activeChat.username.charAt(0)}
                                    </span>

                                </div>


                                <div className="min-w-0">

                                    <p className="por-display truncate text-[12px] font-bold text-white/85">
                                        {activeChat.username}
                                    </p>

                                    <div className="mt-0.5 flex items-center gap-1.5">

                                        <span className="h-1.5 w-1.5 rounded-full bg-[#f47b20]" />

                                        <span className="por-mono text-[7px] uppercase tracking-[0.15em] text-white/25">
                                            Online
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* HEADER ACTIONS */}

                            <div className="relative flex items-center gap-1">

                                <button
                                    className=" hidden h-9 w-9 items-center justify-center text-white/35 transition hover:text-white sm:flex "
                                >
                                    <SearchIcon />
                                </button>


                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className=" flex h-9 w-9 items-center justify-center text-white/35 transition hover:text-white "
                                    aria-label="More options"
                                >
                                    <MoreIcon />
                                </button>


                                {/* THREE DOT MENU */}

                                {showMenu && (

                                    <div className="absolute right-0 top-11 z-50 w-44 border border-[#263a52] bg-[#080d14] py-1 shadow-2xl">

                                        <button className="flex h-10 w-full items-center px-4 text-left text-[10px] text-white/55 transition
                     hover:bg-white/4 hover:text-white">
                                            View profile
                                        </button>

                                        <button className="flex h-10 w-full items-center px-4 text-left text-[10px] text-white/55 transition
                     hover:bg-white/4 hover:text-white">
                                            Clear conversation
                                        </button>

                                        <button className="flex h-10 w-full items-center px-4 text-left text-[10px] text-red-300/60 transition
                     hover:bg-red-400/4 hover:text-red-300">
                                            Disconnect
                                        </button>

                                    </div>

                                )}

                            </div>

                        </header>


                        {/* =================================================
                CHAT AREA
            ================================================= */}

                        <div className="por-scroll relative z-10 flex-1 overflow-y-auto">

                            <div className="mx-auto flex min-h-full w-full max-w-275 flex-col px-4 py-8 sm:px-8">

                                {/* TODAY */}

                                <div className="mb-10 flex items-center justify-center">

                                    <span className="por-mono border border-[#1e3045] bg-[#08101a]/80 px-3 py-1.5 text-[7px] uppercase 
                  tracking-[0.18em] text-white/25">
                                        Today
                                    </span>

                                </div>


                                {/* MESSAGES */}

                                <div className="flex-1 space-y-7">

                                    {messages.map((item) => (

                                        <div
                                            key={item.id}
                                            className={`flex ${item.mine
                                                    ? "justify-end"
                                                    : "justify-start"
                                                }`}
                                        >

                                            <div className="max-w-[78%] sm:max-w-[65%]">

                                                <div
                                                    className={`
                            px-4 py-3
                            text-[11px]
                            leading-5
                            ${item.mine
                                                            ? "border border-[#f47b20]/45 bg-[#f47b20] text-black"
                                                            : "border border-[#1f3045] bg-[#101925] text-white/75"
                                                        }
                          `}
                                                >
                                                    {item.text}
                                                </div>

                                                <div
                                                    className={`
                            por-mono mt-1.5 text-[6px] text-white/20
                            ${item.mine
                                                            ? "text-right"
                                                            : "text-left"
                                                        }
                          `}
                                                >
                                                    {item.time}
                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>


                        {/* =================================================
    CHAT COMPOSER — CHATGPT STYLE
================================================= */}

                        <div className="relative z-20 shrink-0 bg-[#05080d] px-3 pb-4 pt-3 sm:px-6 sm:pb-5">

                            <form
                                onSubmit={sendMessage}
                                className="mx-auto w-full max-w-[1000px]"
                            >

                                <div
                                    className="
        flex
        min-h-[64px]
        items-center
        gap-2
        rounded-[32px]
        border
        border-white/[0.12]
        bg-[#171717]
        px-3
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        transition
        focus-within:border-white/[0.18]
      "
                                >

                                    {/* PLUS */}

                                    <button
                                        type="button"
                                        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
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


                                    {/* MESSAGE INPUT */}

                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
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
                                        placeholder="Message PorChatal"
                                        className="
          min-h-[44px]
          flex-1
          resize-none
          bg-transparent
          px-1
          py-3
          font-mono
          text-[11px]
          leading-5
          text-white
          outline-none
          placeholder:text-white/35
        "
                                    />


                                    {/* RIGHT ACTIONS */}

                                    <div className="flex shrink-0 items-center gap-1">


                                        {/* OPTIONAL ATTACHMENT */}

                                        <button
                                            type="button"
                                            className="
            hidden
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            text-white/45
            transition
            hover:bg-white/[0.06]
            hover:text-white
            sm:flex
          "
                                            aria-label="Attach"
                                        >
                                            <PaperclipIcon />
                                        </button>


                                        {/* MORE / OPTIONS */}

                                        <button
                                            type="button"
                                            className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            text-white/45
            transition
            hover:bg-white/[0.06]
            hover:text-white
          "
                                            aria-label="More options"
                                        >
                                            <MoreIcon />
                                        </button>


                                        {/* SEND */}

                                        <button
                                            type="submit"
                                            disabled={!message.trim()}
                                            className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#f47b20]
            text-black
            transition-all
            duration-200
            hover:bg-[#ff8b38]
            hover:scale-[1.03]
            disabled:cursor-not-allowed
            disabled:bg-white/[0.12]
            disabled:text-white/25
          "
                                            aria-label="Send message"
                                        >
                                            <SendIcon />
                                        </button>

                                    </div>

                                </div>


                                {/* SMALL PRIVACY TEXT */}

                                <p className="mt-2 text-center font-mono text-[6px] uppercase tracking-[0.14em] text-white/15">
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

                    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">

                        <div className="w-full max-w-105 border border-[#263a52] bg-[#080d14] p-6 shadow-2xl sm:p-7">

                            <div className="mb-6">

                                <div className="mb-3 flex items-center gap-2">

                                    <span className="h-1.5 w-1.5 bg-[#f47b20]" />

                                    <span className="por-mono text-[7px] uppercase tracking-[0.25em] text-[#f47b20]">
                                        New conversation
                                    </span>

                                </div>

                                <h2 className="por-display text-[29px] font-extrabold tracking-[-0.055em]">
                                    Connect with someone.
                                </h2>

                                <p className="por-display mt-3 text-[10px] leading-5 text-white/35">
                                    Enter the temporary connection code
                                    shared with you.
                                </p>

                            </div>


                            <form onSubmit={startConversation}>

                                <label
                                    htmlFor="connectionCode"
                                    className="por-mono mb-2 block text-[8px] uppercase tracking-[0.2em] text-white/30"
                                >
                                    Connection code
                                </label>

                                <input
                                    id="connectionCode"
                                    autoFocus
                                    value={connectionCode}
                                    onChange={(e) =>
                                        setConnectionCode(e.target.value)
                                    }
                                    placeholder="paste_connection_code"
                                    className="por-input h-12.5 w-full border border-[#1e3045] bg-[#05090f] px-4 font-mono
                    text-xs text-white outline-none placeholder:text-white/15 "
                                />


                                <div className="mt-5 flex gap-2">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowNewConversation(false);
                                            setConnectionCode("");
                                        }}
                                        className=" h-11 flex-1 border border-[#1e3045] text-[10px] text-white/40 transition
                      hover:border-[#385573] hover:text-white/70 "
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="submit"
                                        disabled={!connectionCode.trim()}
                                        className=" h-11 flex-1 bg-[#f47b20] text-[10px] font-bold text-black transition
                      hover:bg-[#ff8b38] disabled:cursor-not-allowed disabled:opacity-30 "
                                    >
                                        Connect
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