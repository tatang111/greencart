import { categories } from "@/assets/assets";
import { ProductCard } from "@/components/ProductCard";
import { useGetProducts } from "@/lib/useGetProducts";
import { useStore } from "@/store/useStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const { category } = useParams();
  const products = useStore((state) => state.products);
  const searchQuery = useStore((state) => state.searchQuery);
  const { loading } = useGetProducts()
  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  useEffect(() => {
    if (!searchQuery) return setFilteredProducts(products);

    const filtered = products.filter((product) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-20">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />;
      </div>
    );

  return (
    <div>
      {searchCategory && (
        <div className="mt-16 flex flex-col">
          <div className="flex flex-col items-end w-max">
            <h2 className="text-2xl font-medium uppercase">{searchCategory.text.toUpperCase()}</h2>
            <div className="w-16 h-0.5 bg-primary rounded-full"></div>
          </div>
          <div className="grid -ml-2 md:ml-0 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 md:gap-3 lg:grid-cols-5 mt-6">
            {filteredProducts
              .filter((product) => product.inStock)
              .filter(
                (product) =>
                  product.category.toLowerCase() === category.toLowerCase()
              )
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      )}
      {!searchCategory && (
        <div className="mt-16 flex flex-col">
          <div className="flex flex-col items-end w-max">
            <h2 className="text-2xl font-medium uppercase">
              there are no fruits in this category
            </h2>
            <div className="w-16 h-0.5 bg-primary rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
