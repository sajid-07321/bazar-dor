"use client"

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const ProfilePage = () => {

    const { data: session } = authClient.useSession();
      const user = session?.user;
      console.log(user);

      const handleUpdateProfile = async (e:React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const newUserData = Object.fromEntries(formData.entries()) as {name: string, image: string}
        await authClient.updateUser({
            ...newUserData
        })
        
      }
    return (
        <div>
           
             <div className="flex flex-col items-center gap-2">
         <Link href={'/profile'}>
               <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img
                alt="Tailwind-CSS-Avatar-component"
                src={user?.image as string}
              />
            </div>
          </div>
         </Link>

        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
         </div>

         <form
      onSubmit={handleUpdateProfile}
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

        
        {/* update button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white shadow-md transition hover:bg-green-800"
        >
          প্রোফাইল আপডেট করুন
        </button>
      </div>

    </form>

        </div>
    );
};

export default ProfilePage;