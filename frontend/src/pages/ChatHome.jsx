import { useEffect, useMemo, useState } from "react";
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

function Avatar({ name = "", small = false }) {
  const initials = String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

  return (
    <div
      className={`flex shrink-0 items-center justify-center border border-[#9A9083] bg-[#C9C0B4] font-semibold rounded-full
        text-[#101B2D] ${small ? "h-8 w-8 text-[10px]" : "h-10 w-10 text-xs"
        }`}
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
      className={`inline-flex min-h-10 items-center justify-center gap-2 border border-[#536078] px-3 text-sm
        text-[#E8E0D5] transition-colors hover:border-[#B42335] hover:text-[#D45B69] focus-visible:outline-none
        focus-visible:ring-1 focus-visible:ring-[#B42335] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

export default function ChatHome({
  conversations = [],
  messages = [],
  currentUser = null,
  onSelectConversation,
  onSendMessage,
  loading = false,
  socket,
}) {
  const [user, setUser] = useState(currentUser || {});
  const [connection, setConnection] = useState([]);


  const [activeId, setActiveId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [messageText, setMessageText] = useState("");

  const [connectionCode, setConnectionCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);

  const [showConnectionOptions, setShowConnectionOptions] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showGeneratedCode, setShowGeneratedCode] = useState(false);

  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();

  // GET USER
  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/home", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Cannot get user");
      }

      const data = await response.json();
      setUser(data.user || {});
    } catch (error) {
      console.error("Error getting user:", error);
    }
  };

  // GET CONNECTIONS
  const getUserConnection = async () => {
    try {
      const response = await fetch("http://localhost:5000/connections", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Cannot get connections");
      }

      const data = await response.json();

      if (!Array.isArray(data.connections)) {
        throw new Error("Invalid connections response");
      }

      const formattedConnections = data.connections.map((item) => ({
        ...item,
        id: item.user_id,
        name: item.username,
      }));

      setConnection(formattedConnections);

    } catch (error) {
      console.error("Error getting connections:", error);
      setError(error.message || "Cannot get connections");
    }
  };


  const getConnectionCode = async () => {
    if (busy) return;

    setError("");
    setBusy(true);
    try {
      const response = await fetch("http://localhost:5000/connections/code", {
        method: "POST",
        credentials: "include"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Cannot get connection Code");
      }

      if (!data.code) {
        throw new Error("Server did not return a connection code");

      }
      setConnectionCode(data.code)
      setGeneratedCode(data.code)
      setTimeLeft(120);

      setShowGeneratedCode(false);
      setShowJoinForm(false);
      setShowGeneratedCode(true);

    } catch (error) {
      console.error("Error getting code:", error);
    } finally {
      setBusy(false);
    }
  }

  const deleteConnection = async (chat) => {
    const otherUserId = chat?.user_id ?? chat?.id;

    if (!otherUserId) {
      setError("Cannot delete connection: user ID is missing.");
      return false;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/connections/${otherUserId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete connection");
      }

      setConnection((previous) =>
        previous.filter(
          (item) => String(item.id ?? item.user_id) !== String(otherUserId)
        )
      );

      if (String(activeId) === String(otherUserId)) {
        setActiveId(null);
        setMessageText("");
      }

      setError("");
      return true;
    } catch (error) {
      console.error("Cannot delete the connection:", error);
      setError(error.message || "Failed to delete connection");
      return false;
    }
  };

  const joinConnection = async (e) => {
    e.preventDefault();

    const code = connectionCode.trim().toUpperCase();

    if (code.length !== 6) {
      setError("Please enter a valid connection code.");
      return;
    }

    if (busy) return;

    setBusy(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/connections/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to connect.");
      }

      await getUserConnection();

      setConnectionCode("");
      setShowJoinForm(false);
      setShowConnectionOptions(false);
      setError("");
    } catch (error) {
      console.error("Error joining connection:", error);
      setError(error.message || "Failed to connect.");
    } finally {
      setBusy(false);
    }
  };

  const userLogout = async () => {
    try {
      const responce = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include"
      })
      const data = await responce.json();

      if (!responce.ok) {
        throw new Error(data.message || "Cannot Log out");
      }
      console.log(data);

      navigate("/login", { replace: true });

    } catch (error) {
      console.error("Error occurred during logout:", error);
      setError(error.message || "Cannot log out");
    }
  }



  useEffect(() => {
    if (!showGeneratedCode || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [showGeneratedCode, timeLeft]);

  useEffect(() => {
    getUser();
    getUserConnection();
  }, []);

  // KEEP USER DATA IN SYNC WITH PARENT
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  // ACTIVE CHAT
  const activeChat = useMemo(
    () =>
      connection.find(
        (chat) => String(chat.id) === String(activeId)
      ) ||
      conversations.find(
        (chat) => String(chat.id) === String(activeId)
      ) ||
      null,
    [connection, conversations, activeId]
  );

  // ACTIVE MESSAGES
  const activeMessages = useMemo(
    () =>
      activeChat
        ? messages.filter((message) => {
          const messageConnectionId =
            message.conversationId ??
            message.connectionId ??
            message.conversation_id ??
            message.connection_id;

          return (
            String(messageConnectionId) === String(activeChat.id)
          );
        })
        : [],
    [messages, activeChat]
  );

  function selectChat(chat) {
    if (!chat?.id) {
      setError("Invalid connection.");
      return;
    }

    setActiveId(chat.id);
    setError("");
    setMessageText("");
    setMobileSidebarOpen(false);

    if (socket?.connected) {
      socket.emit(
        "conversation:join",
        { otherUserId: chat.id },
        (response) => {
          if (!response?.success) {
            setError(
              response?.message || "Could not join the conversation."
            );
          }
        }
      );
    }

    onSelectConversation?.(chat);
  }

  function openConnectionOptions() {
    setError("");
    setShowJoinForm(false);
    setShowGeneratedCode(false);
    setShowConnectionOptions(true);
    setMobileSidebarOpen(false);
  }

  function openImportModal() {
    setConnectionCode("");
    setError("");
    setShowConnectionOptions(false);
    setShowGeneratedCode(false);
    setShowJoinForm(true);
  }

  function closeModals() {
    if (busy) return;

    setShowConnectionOptions(false);
    setShowJoinForm(false);
    setShowGeneratedCode(false);
    setConnectionCode("");
    setError("");
  }


  // COPY CODE
  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(generatedCode);
    } catch {
      setError("Copy failed. Select the code and copy it manually.");
    }
  }



  // SEND MESSAGE
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
        text: messageText.trim(),
      });

      setMessageText("");
    } catch (err) {
      setError(err.message || "Unable to send the message.");
    } finally {
      setBusy(false);
    }
  }


  function toggleSidebar() {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileSidebarOpen((value) => !value);
      setSidebarOpen(true);
      return;
    }

    setSidebarOpen((value) => !value);
    setMobileSidebarOpen(false);
  }

  const modalOpen =
    showConnectionOptions || showJoinForm || showGeneratedCode;

  return (
    <div
      className="flex h-dvh min-h-0 overflow-hidden font-sans antialiased"
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
          className={`${mobileSidebarOpen ? "flex" : "hidden"}
            fixed inset-y-0 left-0 z-40 w-70 flex-col border-r border-[#958B80] bg-[#B7ADA0] text-[#101B2D]
            md:relative md:flex`}
        >
          {/* Brand */}
          <div className="flex h-17 shrink-0 items-center justify-between border-b border-[#9D9387] px-5">
            <a href="/" className="flex items-center gap-2">
              <BrandMark />
              <span className="text-base font-semibold tracking-[-0.6px]">
                por<span style={{ color: C.red }}>chat</span>al
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

          {/* Connect button */}
          <div className="shrink-0 border-b border-[#9D9387] p-4">
            <button
              type="button"
              onClick={openConnectionOptions}
              className="flex min-h-10 w-full items-center justify-center gap-2 border border-[#536078] px-3 text-sm
                text-[#101B2D] transition-colors hover:border-[#B42335] hover:text-[#B42335] focus-visible:outline-none
                focus-visible:ring-1 focus-visible:ring-[#B42335]"
            >
              <Icon name="plus" size={16} />
              Connect
            </button>
          </div>

          {/* Conversations heading */}
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
            ) : connection.length === 0 ? (
              <div className="px-3 py-4">
                <p className="text-sm text-[#34332F]">
                  No conversations yet.
                </p>
                <p className="mt-2 text-xs leading-5 text-[#625A51]">
                  Select Connect to start a conversation.
                </p>
              </div>
            ) : (
              connection.map((chat) => {
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
                        name={chat?.username}
                        small
                      />

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium">
                          {chat?.username}
                        </span>

                        <span className="mt-1 block truncate text-xs text-[#625A51]">
                          {chat.lastMessage || "No messages yet"}
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      aria-label="Remove connection"
                      title="Remove connection"
                      disabled={busy}
                      onClick={() => { deleteConnection(chat) }}
                      className="mr-1 p-2 text-[#625A51] hover:text-[#B42335] disabled:opacity-40 sm:opacity-0
                          sm:group-hover:opacity-100"
                    >
                      <Icon name="trash" size={15} />
                    </button>

                  </div>
                );
              })
            )}
          </div>

          {/* Account and logout */}
          <div className="flex shrink-0 items-center gap-3 border-t border-[#9D9387] px-4 py-4">
            <Avatar name={user.username || ""} small />

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">
                {user.username || ""}
              </p>
              <p className="mt-1 text-[11px] text-[#625A51]">
                Your account
              </p>
            </div>

            <button
              type="button"
              aria-label="Log out"
              title="Log out"
              onClick={userLogout}
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

        {/* Main error message */}
        {error && !modalOpen && (
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
                Your conversations.
                <br />
                Your space.
              </h2>

              <p className="mt-5 max-w-92.5 text-sm leading-7 text-[#B7ADA0]">
                Some conversations are meant to stay in the moment.
                Connect privately and chat without a permanent conversation archive.
              </p>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={openConnectionOptions}
                  className="inline-flex min-h-11 items-center gap-2 border border-[#B42335] px-4 text-sm text-[#D45B69]
                    transition-colors hover:bg-[#B42335]/10"
                >
                  <Icon name="plus" size={16} />
                  Connect
                </button>
              </div>

              <div className="mt-12 flex items-start gap-3 border-t border-[#344155] pt-5">
                <span className="mt-0.5 text-[#B7ADA0]">
                  <Icon name="message" size={18} />
                </span>

                <p className="max-w-sm text-xs leading-5 text-[#B7ADA0]">
                  Connect with someone using a temporary invitation code and start a conversation.
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
                      const myId =
                        currentUser?.id ??
                        currentUser?.userId ??
                        user?.id ??
                        user?.userId;
                      const senderId =
                        message.senderId ?? message.sender_id;

                      const mine =
                        myId != null &&
                        senderId != null &&
                        String(myId) === String(senderId);

                      return (
                        <div className={`flex w-full ${mine ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[75%] border border-slate-700 bg-[#111c2e] px-5 py-4 ${mine ? "ml-auto" :
                              "mr-auto"
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
                  className="min-h-11 max-h-36 min-w-0 flex-1 resize-y border border-[#536078] bg-[#0A1220] px-3 py-3
                    text-sm text-[#E8E0D5] outline-none placeholder:text-[#B7ADA0]/70 focus:border-[#B42335]"
                />

                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={busy || !messageText.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#B42335] text-[#D45B69]
                    transition-colors hover:bg-[#B42335]/10 hover:text-[#E8E0D5] focus-visible:outline-none
                    focus-visible:ring-1 focus-visible:ring-[#B42335] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Icon name="send" size={17} />
                </button>
              </form>
            </footer>
          </>
        )}
      </main>

      {/* Connection modals */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModals();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="connection-modal-title"
            className="w-full max-w-122.5 border border-[#344155] bg-[#101B2D] px-6 py-8 sm:px-9 sm:py-10"
          >
            {/* Modal heading */}
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 shrink-0 bg-[#B42335]" />
                <span className="text-[9px] font-semibold uppercase tracking-[2px] text-[#D45B69]">
                  {showConnectionOptions
                    ? "Connections"
                    : showJoinForm
                      ? "New conversation"
                      : "Share connection"}
                </span>
              </div>

              <button
                type="button"
                onClick={closeModals}
                aria-label="Close modal"
                disabled={busy}
                className="p-1 text-[#B7ADA0] hover:text-white disabled:opacity-40"
              >
                <Icon name="close" />
              </button>
            </div>

            {/* Combined Connect menu */}
            {showConnectionOptions &&
              !showGeneratedCode &&
              !showJoinForm && (
                <>
                  <h2
                    id="connection-modal-title"
                    className="text-[27px] font-semibold leading-tight tracking-[-1.2px] text-[#E8E0D5] sm:text-[32px]"
                  >
                    Make a connection.
                  </h2>

                  <p className="mt-3 text-xs leading-5 text-[#B7ADA0] sm:text-[13px]">
                    Start a new connection or enter a code someone shared with
                    you.
                  </p>

                  <div className="mt-8 space-y-3">
                    <button
                      type="button"
                      onClick={openImportModal}
                      className="flex min-h-17 w-full items-center justify-between gap-4 border border-[#536078] px-4 py-3
                      text-left text-sm text-[#E8E0D5] transition-colors hover:bg-[#B42335]/10 hover:text-[#D45B69]"
                    >
                      <span>
                        <span className="block font-medium">
                          Import connection code
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-[#B7ADA0]">
                          Connect using a code you received
                        </span>
                      </span>

                      <Icon name="plus" />
                    </button>

                    <button
                      type="button"
                      disabled={busy}
                      onClick={getConnectionCode}
                      className="flex min-h-17 w-full items-center justify-between gap-4 border border-[#536078] px-4 py-3
                      text-left text-sm text-[#E8E0D5] transition-colors hover:bg-[#B42335]/10 hover:text-[#D45B69]
                      disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span>
                        <span className="block font-medium">
                          {busy
                            ? "Generating code..."
                            : "Generate connection code"}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-[#B7ADA0]">
                          Create a code to share with someone
                        </span>
                      </span>

                      <Icon name="copy" />
                    </button>
                  </div>

                  {error && (
                    <p role="alert" className="mt-4 text-xs text-[#D45B69]">
                      {error}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={closeModals}
                    disabled={busy}
                    className="mt-6 h-11 w-full border border-[#536078] text-xs font-medium text-[#B7ADA0]
                    hover:border-[#B7ADA0] hover:text-[#E8E0D5] disabled:opacity-40"
                  >
                    Cancel
                  </button>
                </>
              )}

            {/* Import connection code */}
            {showJoinForm && (
              <>
                <h2
                  id="connection-modal-title"
                  className="text-[27px] font-semibold leading-tight tracking-[-1.2px] text-[#E8E0D5] sm:text-[32px]"
                >
                  Connect with someone.
                </h2>

                <p className="mt-3 text-xs leading-5 text-[#B7ADA0] sm:text-[13px]">
                  Enter the temporary connection code shared with you.
                </p>

                <form onSubmit={joinConnection} className="mt-8">
                  <label
                    htmlFor="modal-connection-code"
                    className="mb-3 block text-[9px] font-semibold uppercase tracking-[1.8px] text-[#B7ADA0]"
                  >
                    Connection code
                  </label>

                  <input
                    id="modal-connection-code"
                    value={connectionCode}
                    onChange={(event) =>
                      setConnectionCode(
                        event.target.value.toUpperCase().slice(0, 6)
                      )
                    }
                    placeholder="Paste connection code"
                    autoComplete="off"
                    maxLength={6}
                    required
                    autoFocus
                    className="h-14.75 w-full rounded-none border border-[#536078] bg-[#0A1220] px-5 font-mono text-sm
                      tracking-wide text-[#E8E0D5] outline-none placeholder:font-sans placeholder:text-[#746D64]
                      focus:border-[#B42335]"
                  />

                  {error && (
                    <p role="alert" className="mt-3 text-xs text-[#D45B69]">
                      {error}
                    </p>
                  )}

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        setShowJoinForm(false);
                        setShowConnectionOptions(true);
                        setConnectionCode("");
                        setError("");
                      }}
                      className="h-13.5 border border-[#536078] bg-transparent text-xs font-medium text-[#B7ADA0]
                        hover:border-[#B7ADA0] hover:text-[#E8E0D5] disabled:opacity-50"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={busy || connectionCode.trim().length !== 6}
                      className="h-13.5 border border-[#B42335] bg-transparent text-xs font-semibold text-[#D45B69]
                        hover:bg-[#B42335]/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {busy ? "Connecting..." : "Connect"}
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Generated connection code */}
            {showGeneratedCode && (
              <>
                <h2
                  id="connection-modal-title"
                  className="text-[27px] font-semibold leading-tight tracking-[-1.2px] text-[#E8E0D5] sm:text-[32px]"
                >
                  Share your connection code.
                </h2>

                <p className="mt-3 text-xs leading-5 text-[#B7ADA0] sm:text-[13px]">
                  Share this code with the person you want to connect with.
                </p>

                <div className="mt-8">
                  <label
                    htmlFor="generated-connection-code"
                    className="mb-3 block text-[9px] font-semibold uppercase tracking-[1.8px] text-[#B7ADA0]"
                  >
                    Your connection code
                  </label>

                  <div
                    id="generated-connection-code"
                    className="flex min-h-14.75 items-center break-all border border-[#536078] bg-[#0A1220] px-5 py-4
                      font-mono text-sm tracking-wider text-[#E8E0D5] select-all"
                  >
                    {connectionCode}
                  </div>

                  <p
                    className={`mt-3 text-xs leading-5 ${timeLeft === 0 ? "text-[#D45B69]" : "text-[#B7ADA0]"
                      }`}
                  >
                    {timeLeft === 0
                      ? "This code has expired. Generate a new one."
                      : `Code expires in ${String(Math.floor(timeLeft / 60)).padStart(2, "0")}
                      :${String(timeLeft % 60).padStart(2, "0")} and can only be used once.`}
                  </p>

                  {error && (
                    <p role="alert" className="mt-3 text-xs text-[#D45B69]">
                      {error}
                    </p>
                  )}

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowGeneratedCode(false);
                        setShowConnectionOptions(true);
                        setError("");
                      }}
                      className="h-13.5 border border-[#536078] text-xs font-medium text-[#B7ADA0] hover:border-[#B7ADA0]
                        hover:text-[#E8E0D5]"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="h-13.5 border border-[#B42335] text-xs font-semibold text-[#D45B69] hover:bg-[#B42335]/10"
                    >
                      Copy code
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}