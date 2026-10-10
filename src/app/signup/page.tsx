"use client"

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";


const SignUpPage = () => {

    const onSubmit = async (e:React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as{name:string, email: string, image: string, password:string}
     
        const {data, error} = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        })

        if(data){
            toast.success("আমাদের ওয়েব সাইট এ আপনাকে স্বাগতম")
            redirect("/")
            console.log(data);
        }

        if(error){
            toast.error("কিছু একটা ভুল হয়েছে পুনরায় চেষ্টা করুন")
            console.log(error);
        }
        
    }


     const handleGoogleSignUp = async () => {
        await authClient.signIn.social({
          provider: "google",
        });
        
        
      };



    return (

       <div className="min-h-screen bg-[#F0F5F0] px-4 py-10">
  <div className="mx-auto max-w-md">

    {/* Heading */}
    <div className="mb-6 text-center">
      <h2 className="text-3xl font-bold text-[#26352D]">
        অ্যাকাউন্ট তৈরি করুন
      </h2>

      <p className="mt-2 text-sm text-[#7A827C]">
        বিনা খরচে সাইন আপ করে বিস্তারিত দাম দেখুন।
      </p>
    </div>

    {/* Sign Up Form */}
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[#DCE5DC] bg-[#FAFCFA] p-6 sm:p-8"
    >
      <div className="space-y-5">

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-[#26352D]"
          >
            নাম
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="যেমন: রহিম উদ্দিন"
            className="w-full rounded-lg border border-[#DCE5DC] bg-transparent px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium text-[#26352D]"
          >
            প্রোফাইল ছবির URL
          </label>

          <input
            id="image"
            name="image"
            type="url"
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border border-[#DCE5DC] bg-transparent px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#26352D]"
          >
            ইমেইল
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-[#DCE5DC] bg-transparent px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-[#26352D]"
          >
            পাসওয়ার্ড
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full rounded-lg border border-[#DCE5DC] bg-transparent px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white shadow-md transition hover:bg-green-800"
        >
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </div>

      {/* Divider */}
      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#DCE5DC]" />
        <span className="text-sm text-gray-600">অথবা</span>
        <div className="h-px flex-1 bg-[#DCE5DC]" />
      </div>

      {/* Google Sign Up Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#DCE5DC] px-4 py-3 text-sm font-semibold text-[#26352D] transition hover:bg-green-50"
        >
          <svg
            viewBox="0 0 48 48"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
            />
            <path
              fill="#34A853"
              d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
            />
            <path
              fill="#FBBC05"
              d="M12.6 27.7a12 12 0 0 1 0-7.4V15H5.8a20 20 0 0 0 0 17.9l6.8-5.2Z"
            />
            <path
              fill="#EA4335"
              d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15l6.8 5.3c1.6-4.8 6.1-8.4 11.4-8.4Z"
            />
          </svg>

          Google দিয়ে চালিয়ে যান
        </button>
      </div>

      {/* Sign In Link */}
      <p className="mt-5 text-center text-sm text-[#475569]">
        অ্যাকাউন্ট আছে?{" "}
        <a
          href="/signin"
          className="font-medium text-green-700 hover:underline"
        >
          সাইন ইন করুন
        </a>
      </p>
    </form>

    {/* Back to Home */}
    <div className="mt-6 text-center">
      <Link
        href="/"
        className="text-sm text-[#7A827C] transition hover:text-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>

  </div>
</div>
    );
};

export default SignUpPage;