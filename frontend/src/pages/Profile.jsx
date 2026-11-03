
import React, { useEffect, useState } from "react";
import { replace, useNavigate } from "react-router-dom";

function Avatar({ name = "", small = false }) {
    const initials = String(name)
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "?";

    return (
        <div
            className={`flex shrink-0 items-center justify-center border-2 border-[#9a1515] bg-[#080424] font-bold rounded-full
        text-[#f4f4f4] ${small ? "h-10 w-10 text-md" : "h-12 w-12 text-md"
                }`}
        >
            {initials}
        </div>
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
                stroke={"#B42335"}
                strokeWidth="1.5"
            />
            <path d="M6 15h21M6 19h13" stroke={"#B42335"} strokeWidth="1.5" />
            <path d="M34 8.5h4" stroke={"#B42335"} strokeWidth="1.5" />
        </svg>
    );
}

function Profile() {

    const [user, setUser] = useState({});

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
        }
    };

    const logoutUser = async () => {
        try {
            const responce = await fetch("http://localhost:5000/logout", {
                method: "POST",
                credentials: "include"
            })
            const data = await responce.json();

            if (!responce.ok) {
                throw new Error(data.message || "cannot log out");
            }

            console.log(data);

            navigate("/login", { replace: true });

        } catch (error) {
            console.error("Error occurred during logout:", error);
            setError(error.message || "Cannot log out");
        }
    }

    const deleteUser = async () => {
        try {
            const responce = await fetch("http://localhost:5000/delete", {
                method: "POST",
                credentials: "include"
            })

            const data = await responce.json();
            if (!responce.ok) {
                throw new Error(data.message || "cannot delete account");
            }
            console.log(data);

            navigate("/register", { replace: true });

        } catch (error) {
            
            console.error("Error occurred during account deletion:", error);
            setError(error.message || "Cannot delete account");
        }
    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        <div className="min-h-screen bg-[#05080d] text-[#E8E0D5] px-5 py-8">

            <div className="max-w-xl mx-auto">

                <h1 className="text-3xl font-semibold mb-10 flex gap-2 text-center">
                    <BrandMark />
                    Profile<span className="text-[#B42335]">.</span>
                </h1>

                <div className="border border-[#344155] bg-[#0A1220] p-7">

                    <div className="flex items-center gap-5 mb-8">
                        <Avatar name={user.username || ""} small />

                        <div>
                            <h2 className="text-xl font-medium">{user?.username}</h2>
                            <p className="text-sm text-[#8F877D] mt-1">
                                PorChatal account
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-[#344155] py-5">
                        <p className="text-xs text-[#8F877D] mb-2">USERNAME</p>
                        <p>{user?.username}</p>
                    </div>

                    <div className="border-t border-[#344155] pt-6 flex gap-3">
                        <button
                            onClick={logoutUser}
                            className="flex-1 border border-[#344155] py-3 text-sm hover:border-[#B42335]">
                            Logout
                        </button>

                        <button
                            onClick={deleteUser}
                            className="flex-1 bg-[#B42335] py-3 text-sm hover:bg-[#921C2B]">
                            Delete account
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;
