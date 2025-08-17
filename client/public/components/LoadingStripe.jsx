import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoadingStripe = () => {
  const navigate = useNavigate();
  let { search } = useLocation();

  const queryparams = new URLSearchParams(search);
  const nextUrl = queryparams.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`)
      }, 5000);
    }
  }, [nextUrl]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 bordere-gray-300 border-t-primary"></div>
    </div>
  );
};

export default LoadingStripe;
