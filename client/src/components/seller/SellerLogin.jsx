import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useStore } from "@/store/useStore";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axiosInstance";
import { toast } from "sonner";

const sellerSchema = z.object({
  email: z.string().nonempty("Email is required").email(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password minimal 8 character"),
});

const SellerLogin = () => {
  const isSeller = useStore((state) => state.isSeller);
  const setIsSeller = useStore((state) => state.setIsSeller);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { data } = useQuery({
    queryKey: ["sellerisauth"],
    queryFn: async () => {
      const res = await axiosInstance("/seller/is-auth");
      return res.data;
    },
    retry: false, // no retry on error
    refetchOnWindowFocus: false, // no recheck when window regains focus
  });

  useEffect(() => {
    if (data?.success === true) {
      setIsSeller(true)
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      const { email, password } = values;
      const res = await axiosInstance.post("/seller/login", {
        email,
        password,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Login Successfully");
      setIsSeller(true);
      navigate("/seller");
    },
    onError: () => {
      toast.error("Email or Password are wrong");
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    !isSeller && (
      <div className="w-full flex justify-center items-center h-screen ">
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader className="">
            <CardTitle className="text-2xl font-medium mx-auto pt-4 pb-2">
              <span className="text-primary">Seller</span> Login
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 mt-1"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="admin@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="tatank123"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                disabled={isPending}
                  type="submit"
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-primary mt-4 hover:bg-primary-dull cursor-pointer"
                >
                  {isPending ? "Login..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default SellerLogin;
