import { axiosInstance } from "@/api/axiosInstance";
import { useStore } from "@/store/useStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const AuthDialogs = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setShowUserLogin = useStore((state) => state.setShowUserLogin);
  const setCartItems = useStore((state) => state.setCartItems);
  const addUser = useStore((state) => state.addUser);

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post(`/user/${state}`, {
        name,
        email,
        password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (state === "register") {
        toast.success("Successfully Registered");
      } else {
        toast.success("Successfully Logged in");
      }
      setName('')
      setEmail('')
      setPassword('')
      setName('')
      setCartItems(data.user.cartItems);
      addUser(data.user);
      setShowUserLogin(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err.response.data.message || "Failed to register, try again later"
      );
    },
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      return toast.error("Password minimum 8 characters");
    }
    mutate();
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthDialogs;
