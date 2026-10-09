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
}

interface DetailsPageProps {
  params: Promise<{
    detailsId: string;
  }>;
}

const DetailsPage = async ({ params }: DetailsPageProps) => {
  const { detailsId } = await params;

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
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
              ৳{product.today}
            </p>

            <p className="text-xs text-gray-500">
              টাকা / {product.unit}
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
                ? `▲ ৳${difference}`
                : difference < 0
                  ? `▼ ৳${Math.abs(difference)}`
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

            {/* Today's price */}
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">আজকের দাম</p>
              <p className="mt-2 text-2xl font-bold text-green-600">
                ৳{product.today}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit}
              </p>
            </div>

            {/* Yesterday's price */}
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">গতকালের দাম</p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                ৳{product.yesterday}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit}
              </p>
            </div>

            {/* Price difference */}
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">দামের পরিবর্তন</p>
              <p
                className={`mt-2 text-2xl font-bold ${
                  difference > 0
                    ? "text-red-600"
                    : difference < 0
                      ? "text-green-600"
                      : "text-gray-600"
                }`}
              >
                {difference > 0 ? "+" : ""}
                ৳{difference}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                গতকালের তুলনায়
              </p>
            </div>
          </div>

          {/* Market table placeholder */}
          <div className="mt-7">
            <h2 className="mb-4 font-semibold text-gray-800">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="rounded-lg bg-[#F0F5F0] p-4 text-sm text-gray-600">
              
            </p>
          </div>
        </section>

      </div>
    </main>
  );
};

export default DetailsPage;