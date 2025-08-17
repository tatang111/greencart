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

const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Minimum password is 8"),
});

const SignUpUser = ({ open, setOpen }) => {
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
    <Dialog
      open={open === "signup"}
      onOpenChange={(isOpen) => setOpen(isOpen ? "signup" : "")}
    >
      <DialogTrigger asChild>
        {open === "login" && (
          <span
            onClick={() => setOpen("signup")}
            className="text-[var(--color-primary)] cursor-pointer hover:underline"
          >
            click here
          </span>
        )}
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
              <p>Create an account?</p>
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

export default SignUpUser;
