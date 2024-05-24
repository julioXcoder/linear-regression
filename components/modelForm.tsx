import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Model } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  size: z
    .number({
      required_error: "Size is required",
      invalid_type_error: "Size must be a number",
    })
    .positive({ message: "Size must be a positive number" })
    .min(1, { message: "Size must be greater than zero" }),
});

interface Props {
  onSetSize: (size: number, model: Model) => void;
  model: Model;
}

const ModelForm = ({ onSetSize, model }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      size: 1500,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onSetSize(data.size, model);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>House size</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="house size"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ModelForm;
