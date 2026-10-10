"use client";

import { authClient } from "@/lib/auth-client";

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
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
              <img
                alt="Tailwind-CSS-Avatar-component"
                src={user?.image as string}
              />
            </div>
          </div>
          <h2>{user.name}</h2>
          <button onClick={handleSignOut} className="btn">সাইন আউট</button>
        </div>
      ) : (
        <div>
          <button className="btn">সাইন ইন</button>
          <button className="btn bg-green-600 text-white">সাইন আপ</button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
