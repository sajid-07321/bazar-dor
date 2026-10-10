import Link from "next/link";

interface IProduct {
  id: string | number;
  slug: string;
  change?: {
    dir?: string;
    pct: number | string;
  };
  categoryIcon: string;
  categoryNameBn: string;
  today: number | string;
};

const toBanglaNumber = (number: number) => {
  return number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
};

const TodayDown = async () => {


    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
  const data = (await res.json()) as IProduct[]


  const todayDownPrice = data.filter((item) => item.change?.dir === "down")
  .slice(0,6)
  console.log(todayDownPrice);

    return (
         <section className="container mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-5">
          🔻 আজ দাম কমেছে
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {todayDownPrice.map((item) => (
           
           <Link
           key={item.id}
           href={`/details/${item.slug}`}>

            <div
              key={item.id}
              className="bg-[#FAFCFA] rounded-2xl p-5"
            >
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 rounded-xl p-3">
                  {item.categoryIcon}
                </div>

                <div>
                  <h3 className="font-bold">
                    {item.categoryNameBn}
                  </h3>

                  <p className="text-sm text-gray-500">
                    প্রতি কেজি
                  </p>
                </div>
              </div>

              <div className="mt-5 flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    আজকের দাম
                  </p>

                   <p className="mx-2 font-semibold text-xl">
                  {toBanglaNumber(Number(item.today))} টাকা
                  </p>
                </div>

                <span className="text-green-500 bg-gray-100 rounded-full px-3 py-1 text-sm py-4">
                  ▼ {toBanglaNumber(Number(item.change?.pct ?? 0))}%
                </span>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </section>
    );
};

export default TodayDown;