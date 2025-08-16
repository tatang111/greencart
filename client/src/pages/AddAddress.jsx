import { assets } from "@/assets/assets";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputAddress from "@/components/InputAddress";
import { Button } from "@/components/ui/button";
import { usePost } from "@/lib/usePost";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useStore } from "@/store/useStore";

const addressSchema = z.object({
  firstName: z
    .string()
    .nonempty("Firstname is required")
    .min(3, "First name minimal 3 character"),
  lastName: z
    .string()
    .nonempty("Lastname is required")
    .min(3, "Lastname minimal 3 character"),
  email: z.string().email(),
  street: z.string().nonempty("Street is required"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  zipCode: z.coerce.number({
    required_error: "Zip code is required",
    invalid_type_error: "Zip code must be a number",
  }),
  country: z.string().nonempty("Country is required"),
  phone: z.string().nonempty("Phone is required"),
});

const AddAddress = () => {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipCode: 0,
      country: "",
      phone: "",
    },
  });
  const user = useStore((state) => state.user);

  const { mutate, isPending } = usePost("/address", {
    onSuccess: () => {
      toast.success("Successfully adding Address");
      navigate("/cart")
    },
    onError: (err) => {
      toast.error(err.message)
    }
  });

  const onSubmit = (values) => {
    const payload = {
      address: values,
      userId: user._id
    }
    mutate(payload);
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:mt-4"
            >
              <div className="flex gap-3 flex-col md:flex-row">
                <InputAddress form={form} name="firstName" classes="" />
                <InputAddress form={form} name="lastName" classes="" />
              </div>
              <InputAddress form={form} name="email" classes="" />
              <InputAddress form={form} name="street" classes="" />
              <div className="flex gap-3 flex-col md:flex-row">
                <InputAddress form={form} name="city" classes="" />
                <InputAddress form={form} name="state" classes="" />
              </div>
              <div className="flex gap-3 flex-col md:flex-row">
                <InputAddress form={form} name="zipCode" classes="" />
                <InputAddress form={form} name="country" classes="" />
              </div>
              <InputAddress form={form} name="phone" classes="" />
              <Button
                disabled={isPending}
                className="bg-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dull w-full cursor-pointer py-6"
              >
                {isPending ? "Saving..." : "Save Address"}
              </Button>
            </form>
          </Form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
