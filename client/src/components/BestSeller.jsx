import { ProductCard } from "./ProductCard";
import { useStore } from "@/store/useStore";
import { useGetProducts } from "@/lib/useGetProducts";

const BestSeller = () => {
  const { products } = useStore();
  const { loading } = useGetProducts()

  if (loading) return <p>loading...</p>;
  return (
    <div className="mt-16">
      <p className="teext-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:grid-cols-5  mt-6">
        {Array.isArray(products) &&
          products
            .filter((product) => product.inStock)
            .slice(0, 5)
            .map((product, index) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default BestSeller;
