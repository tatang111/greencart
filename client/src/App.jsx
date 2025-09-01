import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import { useStore } from "./store/useStore";
import AuthDialogs from "./components/AuthDialogs";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import { useUpdateCart } from "./lib/useUpdateCart";
import useUserAuth from "./lib/useUserAuth";
import { useGetProducts } from "./lib/useGetProducts";
import LoadingStripe from "./components/LoadingStripe";
import Contact from "./pages/Contact";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const showUserLogin = useStore((state) => state.showUserLogin);
  const isSeller = useStore((state) => state.isSeller);
  useUpdateCart();
  useUserAuth()
  useGetProducts()


  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {!isSellerPath && <Navbar />}
      {showUserLogin && <AuthDialogs />}

      <Toaster richColors position="top-center" closeButton={true} />
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route
            path="/products/:category/:productid"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<LoadingStripe />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
            <Route />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
}

export default App;
