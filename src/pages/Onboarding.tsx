import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";

function Onboarding() {
  const form = useForm();

  return (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(() => {
        console.log("Submitted");
      })}
    >
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value="mentions" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Direct messages and mentions
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value="all" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    All messages
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormDescription>Testing Forms!</FormDescription>
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  );
}

export default Onboarding;
