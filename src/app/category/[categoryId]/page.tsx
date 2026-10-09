interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
};

type PageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

export default async function SingleProduct({ params }: PageProps) {
  const { categoryId } = await params;

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


  const products = allProducts.filter(
    (product) => product.category === categoryId
  );

  const categoryName = products[0]?.categoryNameBn ?? "";
  const categoryIcon = products[0]?.categoryIcon ?? "";

  return (
    <main className="min-h-screen bg-[#f1f6f2] text-[#26352d]">
      {/* Category Header */}
      <section className="mx-auto max-w-[1100px] px-5 pt-5">
        <div className="flex items-center gap-4 rounded-2xl border border-[#dce5df] bg-white px-5 py-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3f6f3] text-3xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-xl font-bold">{categoryName}</h1>

            <p className="text-sm text-gray-500">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </section>

      {/* Sort Bar */}
      <section className="mx-auto mt-5 max-w-[1100px] px-5">
        <div className="flex justify-end rounded-2xl border border-[#dce5df] bg-white px-5 py-3">
          <label className="flex items-center gap-3 text-sm text-gray-500">
            সাজান

            <select
              defaultValue="default"
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-[#26352d] outline-none"
            >
              <option value="default">ফিল্টার</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
              <option value="name">নাম অনুযায়ী</option>
            </select>
          </label>
        </div>
      </section>

      {/* Product Count */}
      <section className="mx-auto max-w-[1100px] px-5 pt-4">
        <p className="text-sm text-gray-500">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>
      </section>

      {/* Product Cards */}
      <section className="mx-auto max-w-[1100px] px-5 pb-16 pt-4">
        {products.length === 0 ? (
          <div className="rounded-2xl bg-white py-16 text-center">
            <p className="text-gray-500">
              
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ProductCard({ product }: { product: IProduct }) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <article className="rounded-2xl border border-[#dce5df] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Product Name */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f3f6f3] text-2xl">
          {product.image || product.categoryIcon}
        </div>

        <div>
          <h2 className="font-semibold">{product.nameBn}</h2>

          <p className="text-xs text-gray-500">
            প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-5">
        <p className="text-xs text-gray-500">আজকের দাম</p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="text-lg font-bold">
            {product.today.toLocaleString("bn-BD")} টাকা
          </p>

          <span
            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
              isUp
                ? "bg-red-50 text-red-500"
                : isDown
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "−"}{" "}
            {Math.abs(product.change?.pct ?? 0).toLocaleString("bn-BD")}%
          </span>
        </div>
      </div>
    </article>
  );
}