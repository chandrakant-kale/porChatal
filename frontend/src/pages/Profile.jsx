
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/Midnight Blue and Crimson Botanical Vignette.png";

function Avatar({ name = "" }) {
  const initials =
    String(name)
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "?";

  return (
    <div className="h-16 w-16 shrink-0 rounded-full border-2 border-[#B42335] bg-[#080424] flex items-center 
    justify-center text-xl font-bold text-white">
      {initials}
    </div>
  );
}

function BrandMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect
        x="5.5"
        y="8.5"
        width="28"
        height="23"
        stroke="#B42335"
        strokeWidth="1.5"
      />
      <path d="M6 15h21M6 19h13" stroke="#B42335" strokeWidth="1.5" />
      <path d="M34 8.5h4" stroke="#B42335" strokeWidth="1.5" />
    </svg>
  );
}

function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      setError(error.message);
    }
  };

  const logoutUser = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Cannot log out");
      }

      navigate("/login", { replace: true });
    } catch (error) {
      setError(error.message || "Cannot log out");
    } finally {
      setLoading(false);
      setConfirmation("");
    }
  };

  const deleteUser = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/delete", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Cannot delete account");
      }

      navigate("/register", { replace: true });
    } catch (error) {
      setError(error.message || "Cannot delete account");
    } finally {
      setLoading(false);
      setConfirmation("");
    }
  };

  const handleConfirm = () => {
    if (confirmation === "logout") {
      logoutUser();
    }

    if (confirmation === "delete") {
      deleteUser();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div
      className="min-h-screen bg-[#05080d] bg-cover bg-center bg-fixed text-[#E8E0D5]"
      style={{
        backgroundImage: `linear-gradient(rgba(5,8,13,0.82), rgba(5,8,13,0.94)), url(${background})`,
      }}
    >
      <div className="min-h-screen px-5 py-8 flex items-center justify-center">

        <div className="w-full max-w-lg">

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <BrandMark />

            <div>
              <p className="text-sm font-semibold tracking-[0.2em]">
                PORCHATAL
              </p>
              <p className="text-[10px] tracking-[0.2em] text-[#8F877D]">
                YOUR PERSONAL SPACE
              </p>
            </div>
          </div>

          {/* Profile */}
          <div className="border border-[#344155] bg-[#0A1220]/90 backdrop-blur-sm p-5 md:p-7">

            <p className="text-xs tracking-[0.25em] text-[#B42335] mb-3">
              ACCOUNT SETTINGS
            </p>

            <h1 className="text-3xl font-semibold mb-9">
              Your profile<span className="text-[#B42335]">.</span>
            </h1>

            {/* User */}
            <div className="flex items-center gap-5 mb-9">
              <Avatar name={user.username || ""} />

              <div>
                <h2 className="text-xl font-medium">
                  {user.username || "Loading..."}
                </h2>

                <p className="text-sm text-[#8F877D] mt-1">
                  PorChatal account
                </p>
              </div>
            </div>

            {/* Username */}
            <div className="border-y border-[#344155] py-5">
              <p className="text-[11px] tracking-[0.2em] text-[#8F877D] mb-2">
                USERNAME
              </p>

              <p className="text-sm">
                {user.username || "Not available"}
              </p>
            </div>

            {/* Error */}
            {error && (
              <p className="mt-5 text-sm text-[#D45B69]">
                {error}
              </p>
            )}

            {/* Actions */}
            <div className="mt-8 space-y-3">

              <button
                onClick={() => {
                  setError("");
                  setConfirmation("logout");
                }}
                className="w-full border border-[#344155] py-3.5 text-sm transition hover:border-[#B42335] 
                hover:bg-[#18263A]"
              >
                Logout
              </button>

              <button
                onClick={() => {
                  setError("");
                  setConfirmation("delete");
                }}
                className="w-full border border-[#B42335] py-3.5 text-sm text-[#D45B69] transition hover:bg-[#B42335]
                 hover:text-white"
              >
                Delete account
              </button>

            </div>
          </div>

          <p className="text-center text-xs text-[#8F877D] mt-5 tracking-wider">
            YOUR SPACE. YOUR CONTROL.
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm">

          <div className="w-full max-w-sm border border-[#344155] bg-[#0A1220] p-7">

            <p className="text-xs tracking-[0.2em] text-[#B42335] mb-4">
              CONFIRM ACTION
            </p>

            <h2 className="text-xl font-semibold mb-3">
              {confirmation === "logout"
                ? "Logout from PorChatal?"
                : "Delete your account?"}
            </h2>

            <p className="text-sm leading-6 text-[#8F877D] mb-7">
              {confirmation === "logout"
                ? "Are you sure you want to log out of your account?"
                : "This action is permanent. Your account and associated connections will be deleted."}
            </p>

            <div className="flex gap-3">

              <button
                disabled={loading}
                onClick={() => setConfirmation("")}
                className="flex-1 border border-[#344155] py-3 text-sm hover:bg-[#18263A]"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleConfirm}
                className="flex-1 bg-[#B42335] py-3 text-sm hover:bg-[#921C2B] disabled:opacity-50"
              >
                {loading
                  ? "Please wait..."
                  : confirmation === "logout"
                    ? "Logout"
                    : "Delete"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
