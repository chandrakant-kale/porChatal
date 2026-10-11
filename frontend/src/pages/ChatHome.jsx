import { useMemo, useState } from "react";

const C = {
  navy: "#101B2D",
  deep: "#0A1220",
  panel: "#18263A",
  stone: "#B7ADA0",
  light: "#E8E0D5",
  muted: "#8F877D",
  red: "#B42335",
  redLight: "#D45B69",
  border: "#344155",
};

function Icon({ name, size = 18 }) {
  const paths = {
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    plus: <path d="M12 5v14M5 12h14" />,
    send: <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="1" />
        <path d="M16 8V4H4v12h4" />
      </>
    ),
    close: <path d="m18 6-12 12M6 6l12 12" />,
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M8 12h8M8 9h5" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6" />
        <path d="M10 10v6M14 10v6" />
      </>
    ),
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
      {paths[name] || null}
    </svg>
  );
}

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
      <path d="M6 15h21M6 19h13" stroke={C.red} strokeWidth="1.5" />
      <path d="M34 8.5h4" stroke={C.red} strokeWidth="1.5" />
    </svg>
  );
}

function Avatar({ name = "User", small = false }) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?";

  return (
    <div
      className={`flex shrink-0 items-center justify-center border border-[#9A9083] bg-[#C9C0B4] font-semibold
         text-[#101B2D] ${small ? "h-8 w-8 text-[10px]" : "h-10 w-10 text-xs"}`}
    >
      {initials}
    </div>
  );
}

function OutlineButton({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-10 items-center justify-center gap-2 border border-[#536078] px-3 text-sm text-[#E8E0D5] transition-colors hover:border-[#B42335] hover:text-[#D45B69] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B42335] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

export default function Chat({
  conversations = [],
  messages = [],
  currentUser = null,
  onSelectConversation,
  onSendMessage,
  onJoinConversation,
  onLogout,
  onCreateConnectionCode,
  onDeleteConversation,
  loading = false,
}) {
  const [activeId, setActiveId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [connectionCode, setConnectionCode] = useState("");
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [showGeneratedCode, setShowGeneratedCode] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const activeChat = useMemo(
    () =>
      conversations.find(
        (chat) => String(chat.id) === String(activeId)
      ) || null,
    [conversations, activeId]
  );

  const activeMessages = useMemo(
    () =>
      activeChat
        ? messages.filter(
          (message) =>
            String(
              message.conversationId ?? message.connectionId
            ) === String(activeChat.id)
        )
        : [],
    [messages, activeChat]
  );

  const username =
    currentUser?.username || currentUser?.name || "Account";

  function selectChat(chat) {
    setActiveId(chat.id);
    setError("");
    setMobileSidebarOpen(false);
    onSelectConversation?.(chat);
  }

  function openJoinModal() {
    setConnectionCode("");
    setError("");
    setShowGeneratedCode(false);
    setShowJoinForm(true);
    setMobileSidebarOpen(false);
  }

  function closeModal() {
    if (busy) return;
    setShowJoinForm(false);
    setShowGeneratedCode(false);
    setConnectionCode("");
    setError("");
  }

  async function handleCreateCode() {
    if (busy) return;

    if (!onCreateConnectionCode) {
      setError("Connection-code generation is not configured.");
      return;
    }

    setError("");
    setBusy(true);

    try {
      const result = await onCreateConnectionCode();
      const code = typeof result === "string" ? result : result?.code;

      if (!code) {
        throw new Error("The server did not return a connection code.");
      }

      setGeneratedCode(code);
      setShowJoinForm(false);
      setShowGeneratedCode(true);
    } catch (err) {
      setError(err?.message || "Unable to generate a connection code.");
    } finally {
      setBusy(false);
    }
  }

  async function handleJoin(event) {
    event.preventDefault();

    const code = connectionCode.trim().toUpperCase();

    if (!code || busy) return;

    if (!onJoinConversation) {
      setError("Connection joining is not configured.");
      return;
    }

    setError("");
    setBusy(true);

    try {
      await onJoinConversation(code);
      setConnectionCode("");
      setShowJoinForm(false);
    } catch (err) {
      setError(err?.message || "Unable to import the connection code.");
    } finally {
      setBusy(false);
    }
  }

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(generatedCode);
    } catch {
      setError("Copy failed. Select the code and copy it manually.");
    }
  }

  async function handleSend(event) {
    event.preventDefault();

    const text = messageText.trim();

    if (!text || !activeChat || busy) return;

    if (!onSendMessage) {
      setError("Message sending is not configured.");
      return;
    }

    setError("");
    setBusy(true);

    try {
      await onSendMessage({
        conversationId: activeChat.id,
        text,
      });

      setMessageText("");
    } catch (err) {
      setError(err?.message || "Unable to send the message.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(chat) {
    if (!onDeleteConversation || busy) return;

    setError("");
    setBusy(true);

    try {
      await onDeleteConversation(chat.id);

      if (String(activeId) === String(chat.id)) {
        setActiveId(null);
      }
    } catch (err) {
      setError(err?.message || "Unable to remove this connection.");
    } finally {
      setBusy(false);
    }
  }

  function toggleSidebar() {
    if (window.innerWidth < 768) {
      setMobileSidebarOpen((value) => !value);
      setSidebarOpen(true);
      return;
    }

    setSidebarOpen((value) => !value);
    setMobileSidebarOpen(false);
  }

  return (
    <div
      className="flex h-dvh min-h-120 overflow-hidden font-sans antialiased"
      style={{ background: C.navy, color: C.light }}
    >
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      {sidebarOpen && (
        <aside
          className={`${mobileSidebarOpen ? "flex" : "hidden"
            } fixed inset-y-0 left-0 z-40 w-70 flex-col border-r border-[#958B80] bg-[#B7ADA0] text-[#101B2D] 
          md:relative md:flex`}
        >
          {/* Brand */}
          <div className="flex h-17 shrink-0 items-center justify-between border-b border-[#9D9387] px-5">
            <a href="/" className="flex items-center gap-2">
              <BrandMark />
              <span className="text-base font-semibold tracking-[-0.6px]">
                por<span style={{ color: C.red }}>chatal</span>
              </span>
            </a>

            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setMobileSidebarOpen(false)}
              className="p-2 text-[#514A42] hover:text-[#B42335] md:hidden"
            >
              <Icon name="close" />
            </button>
          </div>

          {/* Connection actions */}
          <div className="shrink-0 space-y-1 border-b border-[#9D9387] p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#625A51]">
              Connections
            </p>

            <button
              type="button"
              onClick={openJoinModal}
              className="flex min-h-10 w-full items-center gap-3 border border-[#536078] px-3 text-left text-sm 
              text-[#101B2D] hover:border-[#B42335] hover:text-[#B42335]"
            >
              <Icon name="plus" size={16} />
              Import connection code
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setMobileSidebarOpen(false);
                handleCreateCode();
              }}
              className="flex min-h-10 w-full items-center gap-3 px-3 text-left text-sm text-[#34332F] hover:text-[#B42335] 
              disabled:opacity-40"
            >
              <Icon name="copy" size={16} />
              {busy ? "Please wait..." : "Generate connection code"}
            </button>
          </div>

          {/* Conversation heading */}
          <div className="border-b border-[#9D9387] px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#625A51]">
              Conversations
            </p>
          </div>

          {/* Conversation list */}
          <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
            {loading ? (
              <p className="px-3 py-4 text-xs text-[#625A51]">
                Loading conversations...
              </p>
            ) : conversations.length === 0 ? (
              <div className="px-3 py-4">
                <p className="text-sm text-[#34332F]">
                  No conversations yet.
                </p>
                <p className="mt-2 text-xs leading-5 text-[#625A51]">
                  Import a connection code to start chatting.
                </p>
              </div>
            ) : (
              conversations.map((chat) => {
                const selected = String(activeId) === String(chat.id);

                return (
                  <div
                    key={chat.id}
                    className={`group flex items-center border-l-2 ${selected
                        ? "border-[#B42335] bg-[#D0C7BB]"
                        : "border-transparent hover:bg-[#CEC5B9]"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => selectChat(chat)}
                      className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left focus-visible:outline-none
                       focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#B42335]"
                    >
                      <Avatar
                        name={chat.name || chat.username || "User"}
                        small
                      />

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium">
                          {chat.name || chat.username || "Unknown user"}
                        </span>
                        <span className="mt-1 block truncate text-xs text-[#625A51]">
                          {chat.lastMessage || "No messages yet"}
                        </span>
                      </span>
                    </button>

                    {onDeleteConversation && (
                      <button
                        type="button"
                        aria-label="Remove connection"
                        title="Remove connection"
                        disabled={busy}
                        onClick={() => handleDelete(chat)}
                        className="mr-1 p-2 text-[#625A51] hover:text-[#B42335] disabled:opacity-40 sm:opacity-0
                         sm:group-hover:opacity-100"
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Account and logout */}
          <div className="flex shrink-0 items-center gap-3 border-t border-[#9D9387] px-4 py-4">
            <Avatar name={username} small />

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{username}</p>
              <p className="mt-1 text-[11px] text-[#625A51]">
                Your account
              </p>
            </div>

            <button
              type="button"
              aria-label="Log out"
              title="Log out"
              onClick={onLogout}
              className="p-2 text-[#514A42] hover:text-[#B42335]"
            >
              <Icon name="logout" size={17} />
            </button>
          </div>
        </aside>
      )}

      {/* Main workspace */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex min-h-17 shrink-0 items-center gap-3 border-b border-[#344155] px-4 py-3 sm:px-6">
          <button
            type="button"
            aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            onClick={toggleSidebar}
            className="p-2 text-[#B7ADA0] hover:text-white focus-visible:outline-none focus-visible:ring-1
             focus-visible:ring-[#B42335]"
          >
            <Icon name="menu" />
          </button>

          <div className="h-5 w-px bg-[#344155]" />

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-medium text-white">
              {activeChat
                ? activeChat.name || activeChat.username || "Conversation"
                : "Messages"}
            </h1>
            <p className="mt-1 text-[11px] text-[#B7ADA0]">
              {activeChat ? "Conversation" : "PorChatal workspace"}
            </p>
          </div>
        </header>

        {/* Error message */}
        {error && !showJoinForm && !showGeneratedCode && (
          <div
            role="alert"
            className="mx-4 mt-4 flex items-start justify-between gap-3 border border-[#B42335] px-3 py-3 text-xs 
            text-[#E6A1A8] sm:mx-6"
          >
            <span>{error}</span>
            <button
              type="button"
              aria-label="Dismiss error"
              onClick={() => setError("")}
              className="shrink-0"
            >
              <Icon name="close" size={15} />
            </button>
          </div>
        )}

        {/* Empty state */}
        {!activeChat ? (
          <section className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-12">
            <div className="w-full max-w-115">
              <div className="mb-8 flex items-center gap-4">
                <BrandMark />
                <div className="h-px flex-1 bg-[#344155]" />
              </div>

              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[2px] text-[#D45B69]">
                PorChatal / Messages
              </p>

              <h2 className="text-3xl font-medium leading-tight tracking-[-1px] text-[#E8E0D5] sm:text-4xl">
                No conversation selected
              </h2>

              <p className="mt-5 max-w-92.5 text-sm leading-7 text-[#B7ADA0]">
                Select a conversation from the sidebar or import a connection
                code to start chatting.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openJoinModal}
                  className="inline-flex min-h-11 items-center gap-2 border border-[#B42335] px-4 text-sm text-[#D45B69]
                   hover:bg-[#B42335]/10"
                >
                  <Icon name="plus" size={16} />
                  Import connection code
                </button>

                <OutlineButton
                  onClick={handleCreateCode}
                  disabled={busy}
                >
                  Generate code
                  <Icon name="copy" size={15} />
                </OutlineButton>
              </div>

              <div className="mt-12 flex items-start gap-3 border-t border-[#344155] pt-5">
                <span className="mt-0.5 text-[#B7ADA0]">
                  <Icon name="message" size={18} />
                </span>
                <p className="max-w-sm text-xs leading-5 text-[#B7ADA0]">
                  Your conversations appear here when you select a connection.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Messages */}
            <section
              aria-label="Conversation messages"
              className="flex min-h-0 flex-1 flex-col overflow-y-auto"
            >
              <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-6 sm:px-8">
                {activeMessages.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                    <div className="border border-[#536078] p-4 text-[#B7ADA0]">
                      <Icon name="message" size={23} />
                    </div>
                    <p className="mt-5 text-sm text-[#E8E0D5]">
                      No messages yet
                    </p>
                    <p className="mt-2 text-xs text-[#B7ADA0]">
                      Send a message to start the conversation.
                    </p>
                  </div>
                ) : (
                  <div className="mt-auto space-y-5">
                    {activeMessages.map((message, index) => {
                      const myId = currentUser?.id ?? currentUser?.userId;
                      const senderId = message.senderId;

                      const mine =
                        myId != null &&
                        senderId != null &&
                        String(myId) === String(senderId);

                      return (
                        <div
                          key={
                            message.id ||
                            `${message.createdAt || "message"}-${index}`
                          }
                          className={`flex ${mine ? "justify-end" : "justify-start"
                            }`}
                        >
                          <div
                            className={`max-w-[85%] border px-4 py-3 sm:max-w-[70%] ${mine
                                ? "border-[#536078] bg-[#1A2940]"
                                : "border-[#344155] bg-[#101B2D]"
                              }`}
                          >
                            <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-[#E8E0D5]">
                              {message.text || message.content || ""}
                            </p>

                            {message.createdAt && (
                              <p className="mt-2 text-right text-[10px] text-[#B7ADA0]">
                                {new Date(message.createdAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* Message composer */}
            <footer className="shrink-0 border-t border-[#344155] bg-[#101B2D] px-4 py-4 sm:px-6">
              <form
                onSubmit={handleSend}
                className="mx-auto flex w-full max-w-4xl items-end gap-3"
              >
                <textarea
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  placeholder="Write a message..."
                  aria-label="Write a message"
                  maxLength={5000}
                  rows={1}
                  className="min-h-11 max-h-36 min-w-0 flex-1 resize-y border border-[#536078] bg-[#0A1220] px-3 py-3 text-sm
                   text-[#E8E0D5] outline-none placeholder:text-[#B7ADA0]/70 focus:border-[#B42335]"
                />

                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={busy || !messageText.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#B42335] text-[#D45B69]
                   hover:bg-[#B42335]/10 hover:text-[#E8E0D5] focus-visible:outline-none focus-visible:ring-1
                    focus-visible:ring-[#B42335] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Icon name="send" size={17} />
                </button>
              </form>
            </footer>
          </>
        )}
      </main>

      {/* Connection modal */}
      {(showJoinForm || showGeneratedCode) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="connection-modal-title"
            className="w-full max-w-122.5 border border-[#344155] bg-[#101B2D] px-6 py-8 sm:px-9 sm:py-10"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 shrink-0 bg-[#B42335]" />
                <span className="text-[9px] font-semibold uppercase tracking-[2px] text-[#D45B69]">
                  {showJoinForm ? "New conversation" : "Share connection"}
                </span>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                disabled={busy}
                className="p-1 text-[#B7ADA0] hover:text-white disabled:opacity-40"
              >
                <Icon name="close" />
              </button>
            </div>

            <h2
              id="connection-modal-title"
              className="text-[27px] font-semibold leading-tight tracking-[-1.2px] text-[#E8E0D5] sm:text-[32px]"
            >
              {showJoinForm
                ? "Connect with someone."
                : "Share your connection code."}
            </h2>

            <p className="mt-3 text-xs leading-5 text-[#B7ADA0] sm:text-[13px]">
              {showJoinForm
                ? "Enter the temporary connection code shared with you."
                : "Share this temporary code with the person you want to connect with."}
            </p>

            {/* Import code form */}
            {showJoinForm && (
              <form onSubmit={handleJoin} className="mt-10">
                <label
                  htmlFor="modal-connection-code"
                  className="mb-5 block text-[9px] font-semibold uppercase tracking-[1.8px] text-[#B7ADA0]"
                >
                  Connection code
                </label>

                <input
                  id="modal-connection-code"
                  value={connectionCode}
                  onChange={(event) =>
                    setConnectionCode(event.target.value.toUpperCase())
                  }
                  placeholder="paste_connection_code"
                  autoComplete="off"
                  maxLength={32}
                  required
                  autoFocus
                  className="h-14.75 w-full rounded-none border border-[#536078] bg-[#0A1220] px-5 font-mono 
                  text-sm tracking-wide text-[#E8E0D5] outline-none placeholder:font-sans placeholder:text-[#746D64]
                   focus:border-[#B42335]"
                />

                {error && (
                  <p role="alert" className="mt-3 text-xs text-[#D45B69]">
                    {error}
                  </p>
                )}

                <div className="mt-6.5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={closeModal}
                    className="h-14.75 border border-[#536078] bg-transparent text-xs font-medium text-[#B7ADA0] 
                    hover:border-[#B7ADA0] hover:text-[#E8E0D5] disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={busy || !connectionCode.trim()}
                    className="h-14.75 border border-[#B42335] bg-transparent text-xs font-semibold text-[#D45B69]
                     hover:bg-[#B42335]/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {busy ? "Connecting..." : "Connect"}
                  </button>
                </div>
              </form>
            )}

            {/* Generated code */}
            {showGeneratedCode && (
              <div className="mt-10">
                <label
                  htmlFor="generated-connection-code"
                  className="mb-5 block text-[9px] font-semibold uppercase tracking-[1.8px] text-[#B7ADA0]"
                >
                  Your connection code
                </label>

                <div
                  id="generated-connection-code"
                  className="flex min-h-14.75 items-center break-all border border-[#536078] bg-[#0A1220] px-5 py-4 
                  font-mono text-sm tracking-wider text-[#E8E0D5]"
                >
                  {generatedCode}
                </div>

                {error && (
                  <p role="alert" className="mt-3 text-xs text-[#D45B69]">
                    {error}
                  </p>
                )}

                <div className="mt-6.5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="h-14.75 border border-[#536078] text-xs font-medium text-[#B7ADA0] hover:border-[#B7ADA0]
                     hover:text-[#E8E0D5]"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="h-14.75 border border-[#B42335] text-xs font-semibold text-[#D45B69] hover:bg-[#B42335]/10"
                  >
                    Copy code
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}