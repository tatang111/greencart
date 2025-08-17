import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <Loader2 className="w-6 h-6 text-primary animate-spin" />;
    </div>
  );
};

export default Loading;
