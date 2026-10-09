import AllProducts from "@/components/AllProducts";
import TodayDown from "@/components/TodayDown";
import TodayUp from "@/components/TodayUp";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
      <div className="container mx-auto flex justify-between bg-[#FAFCFA] mt-8 rounded-3xl">
        {/* hero banner */}
        <div className="mt-5 pl-6 space-y-6">
          {/* left side */}
          <div className="text-green-500">
            <p className="bg-green-100 rounded-2xl pl-3 pr-3 inline-block">
              {new Date().toLocaleDateString("bn-BD", {
                day: "numeric",
                weekday: "long",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">আজকের বাজারের দাম এক নজরে</h2>
          </div>
          <div>
            <p className="text-[#727573]">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন- <br />
              সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
          </div>
          <div className="pb-8">
            <button className="btn bg-green-600 text-white rounded-[10] shadow ">
              সব পণ্য দেখুন
            </button>
          </div>
        </div>
        {/* items card */}
        <div>
          <Image src={"/bazar-hero.png"} width={400} height={200} alt="bazar" />
        </div>
      </div>

      {/* দাম বেড়েছে */}

      <TodayUp />

      {/* দাম কমেছে */}
      <TodayDown />

      {/* সব পণ্য */}
      <AllProducts />
    </div>
  );
}
