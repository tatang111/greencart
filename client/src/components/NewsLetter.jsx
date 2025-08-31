import { useState } from "react";
import { toast } from "sonner";

const NewsLetter = () => {
  const [text, setText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setText('')
    toast.success("Successfully subscribed");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 mt-24 pb-14">
      <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Deal!</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>
      <form
        onSubmit={submitHandler}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
