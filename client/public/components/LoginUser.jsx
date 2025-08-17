import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpUser from "./SignUpUser";
import { useState } from "react";

const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Minimum password is 8"),
});

const LoginUser = ({open, setOpen}) => {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    alert(values.email);
  });

  return (
    <Dialog open={open === "login"} onOpenChange={isOpen => setOpen(isOpen ? "login" : "")}>
      <DialogTrigger asChild>
        <Button
        onClick={() => setOpen("login")}
          className="rounded-full mt-2 md:mt-0 w-25 md:w-full px-7 cursor-pointer hover:bg-[var(--color-primary-dull)] transition duration-300 ease-in-out hover:text-white bg-[var(--color-primary)] text-white "
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="w-100">
        <Form {...form}>
          <form onSubmit={onSubmit} className="">
            <DialogHeader className="my-5">
              <DialogTitle className="text-center">User Login</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Type here" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Type here"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p>
                Create an account?{" "}
                <SignUpUser open={open} setOpen={setOpen} />
              </p>
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginUser;
