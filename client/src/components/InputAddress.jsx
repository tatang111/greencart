import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const InputAddress = ({ form, name, classes, address }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              className={`${classes} `}
              type={name === "zipCode" ? "number" : "text"}
              placeholder={
                name === "email"
                  ? "Email address"
                  : name.charAt(0).toUpperCase() + name.slice(1)
              }
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputAddress;
