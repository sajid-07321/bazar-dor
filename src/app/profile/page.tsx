"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const updateData: { name?: string; image?: string } = {};

      if (name.trim()) {
        updateData.name = name.trim();
      }

      if (image.trim()) {
        updateData.image = image.trim();
      }

      if (Object.keys(updateData).length === 0) {
        setMessage("আপডেট করার জন্য অন্তত একটি তথ্য দিন।");
        return;
      }

      await authClient.updateUser(updateData);
      setMessage("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch {
      setMessage("প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 pb-12 pt-8 text-[#26352D]">
      <div className="mx-auto w-full max-w-[736px]">
        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-[#68736B]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Profile Card */}
        <section className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#DCE5DC] bg-[#FAFCFA] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="h-[70px] w-[80px] shrink-0 overflow-hidden rounded-2xl bg-[#E9EEEA]">
              {user?.image ? (
                <img
                  src={user.image}
                  alt="প্রোফাইল ছবি"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#168447]">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold">
                {user?.name || "ব্যবহারকারী"}
              </h2>
              <p className="mt-1 break-all text-sm text-[#68736B] sm:text-base">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => authClient.signOut()}
            className="shrink-0 self-start rounded-lg border border-red-500 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 sm:self-center"
          >
            ↩ সাইন আউট
          </button>
        </section>

        {/* Profile Information Card */}
        <section className="rounded-2xl border border-[#DCE5DC] bg-[#FAFCFA] p-5 sm:p-6">
          <h2 className="mb-8 text-lg font-bold">তথ্য</h2>

          <form onSubmit={handleUpdateProfile}>
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  নাম
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={user?.name || "আপনার নাম লিখুন"}
                  className="w-full rounded-lg border border-[#DCE5DC] bg-transparent px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Profile Image URL */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium"
                >
                  প্রোফাইল ছবির URL
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder={user?.image || "https://example.com/image.jpg"}
                  className="w-full rounded-lg border border-[#DCE5DC] bg-transparent px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Feedback */}
              {message && (
                <p
                  role="status"
                  className="text-sm text-[#168447]"
                >
                  {message}
                </p>
              )}

              {/* Update Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;