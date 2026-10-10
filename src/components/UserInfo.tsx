"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleSignOut = async () => {
    await authClient.signOut();
  }

  return (
    <div>
      {user ? (
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
          <h2>{user.name}</h2>
          <button onClick={handleSignOut} className="btn">সাইন আউট</button>
        </div>
      ) : (
        <div>
         <Link href={'/signin'}>
          <button className="btn">সাইন ইন</button>
         </Link>
          <Link href={'/signup'}>
          <button className="btn bg-green-600 text-white">সাইন আপ</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
