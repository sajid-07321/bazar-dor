import Link from "next/link";

const toBanglaNumber = (number: number) => {
  return number.toString().replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
};

const AllProducts = async () => {

     const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products")
  const data = await res.json()
  console.log(data);
  

    return (
        <section className="container mx-auto mt-10 pb-10">
        <h2 className="text-2xl font-bold mb-5">
          সব পণ্য
        </h2>

        <p className="text-gray-500 mb-5">
          মোট ৩৩ টি পণ্য দেখানো হচ্ছে
        </p>

 
        <div className="grid grid-cols-3 gap-4">
         
          {data.map((item: any) => (

            <Link
            key={item.id}
            href={`/details/${item.slug}`}
            className="block"
            >
           
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

               <div className="bg-gray-100 rounded-full px-3 text-sm py-4">
                <span
               
              className={
                item.change.dir === "up"
                  ? "text-red-500"
                  : "text-green-500"
                  
              }
            >
               {item.change.dir === "up" ? "▲" : "▼"}{" "}
              {toBanglaNumber(item.change.pct)}%
            </span>
               </div>
              </div>
              
            </div>
          
          </Link>
          ))}
           
        </div>
            
      </section>

    );
};

export default AllProducts;