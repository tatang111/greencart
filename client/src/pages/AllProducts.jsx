import Loading from "@/components/Loading";
import { ProductCard } from "@/components/ProductCard";
import { useGetProducts } from "@/lib/useGetProducts";
import { useStore } from "@/store/useStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const products = useStore((state) => state.products);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const searchQuery = useStore((state) => state.searchQuery);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { loading } = useGetProducts();

  useEffect(() => {
    if (!searchQuery) return setFilteredProducts(products);

    const filtered = products.filter((product) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  if (loading) return <Loading />;

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <h2 className="text-2xl font-medium uppercase">All Products</h2>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className="grid -ml-2 md:ml-0 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 md:gap-3 lg:grid-cols-5 mt-6">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
