interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  today: number;
  yesterday: number;
  lastWeek?: number;
  lastMonth?: number;
  unit: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  image?: string;
   markets?: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

interface DetailsPageProps {
  params: Promise<{
    detailsId: string;
  }>;
}

const toBanglaNumber = (number: number) => {
  return number.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
};


const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { detailsId } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Products fetch failed");
  }

  const result = await res.json();

  const allProducts: IProduct[] = Array.isArray(result)
    ? result
    : Array.isArray(result.data)
      ? result.data
      : [];

  const product = allProducts.find(
    (item) => item.slug === detailsId
  );

  if (!product) {
    return <p className="p-6">পণ্য খুঁজে পাওয়া যায়নি।</p>;
  }

  const difference = product.today - product.yesterday;

  const markets = product.markets ?? [];

const lowestPrice = markets.length
  ? Math.min(...markets.map((market) => market.min))
  : 0;

const highestPrice = markets.length
  ? Math.max(...markets.map((market) => market.max))
  : 0;

const averagePrice = markets.length
  ? markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0
    ) / markets.length
  : 0;

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <p className="mb-5 text-sm text-gray-500">
          হোম <span className="mx-2">›</span>
          {product.categoryNameBn ?? "পণ্য"}
          <span className="mx-2">›</span>
          <span className="text-gray-800">{product.nameBn}</span>
        </p>

        {/* Product Header */}
        <section className="flex flex-col justify-between gap-5 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-3xl">
              {product.categoryIcon ?? product.image ?? "🛒"}
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit} · বাজারদর
              </p>

              <p className="mt-2 text-xs text-gray-500">
                গতকালের তুলনায় দামের পরিবর্তন
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#F0F5F0] px-6 py-4 text-center sm:min-w-36">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="text-3xl font-bold text-gray-800">
              ৳{toBanglaNumber (product.today)}
            </p>

            <p className="text-xs text-gray-500">
              টাকা / কেজি
            </p>

            <p
              className={`mt-1 text-sm font-semibold ${
                difference > 0
                  ? "text-red-600"
                  : difference < 0
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {difference > 0
                ? `▲ %${toBanglaNumber(difference)}`
                : difference < 0
                  ? `▼ %${toBanglaNumber(Math.abs(difference))}`
                  : "দাম অপরিবর্তিত"}
            </p>
          </div>
        </section>

        {/* Price Details */}
        <section className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 font-semibold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
  {/* Lowest price */}
  <div className="rounded-xl border border-gray-200 p-4">
    <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
    <p className="mt-2 text-2xl font-bold text-green-600">
      {markets.length ? `৳${toBanglaNumber(lowestPrice)}` : "তথ্য নেই"}
    </p>
    <p className="mt-1 text-xs text-gray-500">
      সব বাজারের মধ্যে সবচেয়ে কম
    </p>
  </div>

  {/* Highest price */}
  <div className="rounded-xl border border-gray-200 p-4">
    <p className="text-sm text-gray-500">সর্বাধিক দাম</p>
    <p className="mt-2 text-2xl font-bold text-red-600">
      {markets.length ? `৳${toBanglaNumber(highestPrice)}` : "তথ্য নেই"}
    </p>
    <p className="mt-1 text-xs text-gray-500">
      সব বাজারের মধ্যে সবচেয়ে বেশি
    </p>
  </div>

  {/* Average price */}
  <div className="rounded-xl border border-gray-200 p-4">
    <p className="text-sm text-gray-500">গড় দাম</p>
    <p className="mt-2 text-2xl font-bold text-gray-800">
      {markets.length ? `৳${toBanglaNumber(averagePrice)}` : "তথ্য নেই"}
    </p>
    <p className="mt-1 text-xs text-gray-500">
      সব বাজারের গড় দাম
    </p>
  </div>
</div>

         {/* Market Price Table */}
<div className="mt-7">
  <h2 className="mb-4 font-semibold text-gray-800">
    বাজারভিত্তিক আজকের দাম
  </h2>

  <div className="overflow-x-auto rounded-xl border border-gray-200">
    <table className="w-full text-left text-sm">
      <thead className="bg-[#F0F5F0] text-gray-700">
        <tr>
          <th className="px-4 py-4 font-semibold">বাজার</th>
          <th className="px-4 py-4 font-semibold">বিভাগ</th>
          <th className="px-4 py-4 font-semibold">সর্বনিম্ন</th>
          <th className="px-4 py-4 font-semibold">সর্বাধিক</th>
          <th className="px-4 py-4 font-semibold">গড়</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {product.markets?.map((market, index) => {
          const average = (market.min + market.max) / 2;

          return (
            <tr
              key={`${market.market}-${index}`}
              className="transition-colors hover:bg-gray-50"
            >
              <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-800">
                {market.market}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                {market.division}
              </td>

              <td className="whitespace-nowrap px-4 py-4 font-medium text-green-600">
                ৳{toBanglaNumber (market.min)}
              </td>

              <td className="whitespace-nowrap px-4 py-4 font-medium text-red-600">
                ৳{toBanglaNumber (market.max)}
              </td>

              <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-800">
               ৳{toBanglaNumber(average)}
               </td>
            </tr>
          );
        })}

        
      </tbody>
    </table>
  </div>
</div>
        </section>

      </div>
    </main>
  );
};

export default DetailsPage;
