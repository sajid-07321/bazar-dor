import Image from "next/image";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header className="mt-4">

      {/* Top Header */}
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="flex gap-2">
          <Image
            className="bg-green-600 rounded-2xl pr-1"
            src="/logo-icon.png"
            width={60}
            height={50}
            alt=""
          />

          <div>
            <div className="font-bold text-2xl">বাজার দর</div>

            <p className="text-gray-600">
              {new Date().toLocaleDateString("bn-BD", {
                day: "numeric",
                weekday: "long",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div>
          <button className="btn">সাইন ইন</button>
          <button className="btn bg-green-600 text-white">সাইন আপ</button>
        </div>
      </div>

      {/* Full width border */}
      <div className="border-b border-gray-300 border-t mt-4 border-gray-300">

        {/* Nav content */}
        <div className="container mx-auto py-3">
          <NavLinks />
        </div>

      </div>

    </header>
  );
};
export default Header;