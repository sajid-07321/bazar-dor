"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {user ? (
        <>
          {/* Profile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-gray-100"
          >
            <img
              src={user.image || "/default-avatar.png"}
              alt={user.name || "User"}
              className="h-10 w-10 rounded-full border border-gray-200 object-cover"
            />

            <span className="text-sm font-medium text-[#26352D]">
              {user.name}
            </span>

            <span className="text-xs text-gray-500">▼</span>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-[#DCE5DC] bg-[#FAFCFA] p-5 shadow-lg">
              {/* User Details */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-[#26352D]">
                  {user.name}
                </h3>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {user.email}
                </p>
              </div>

              {/* Profile Link */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="mt-3 flex items-center gap-2 rounded-lg py-2 text-sm text-[#26352D] hover:bg-green-50"
              >
                <span>👤</span>
                আমার প্রোফাইল
              </Link>

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="mt-1 flex w-full items-center gap-2 rounded-lg py-2 text-left text-sm text-red-500 hover:bg-red-50"
              >
                <span>↪</span>
                সাইন আউট
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/signin"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;