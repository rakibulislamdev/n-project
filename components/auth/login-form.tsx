"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ViewIcon, ViewOffIcon } from "hugeicons-react";
import { toast } from "sonner";
import { loginAction } from "@/app/actions/auth";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean(),
});

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await loginAction(values);

      if (result.success) {
        toast.success(result.message);
        router.push("/dashboard");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-700 font-semibold">Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="h-11 rounded-md bg-zinc-50 border-zinc-200 focus-visible:ring-black focus-visible:ring-offset-0 px-4"
                  {...field} 
                />
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
              <FormLabel className="text-zinc-700 font-semibold">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                    className="h-11 rounded-md bg-zinc-50 border-zinc-200 focus-visible:ring-black focus-visible:ring-offset-0 px-4 pr-10"
                    {...field} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                  >
                    {showPassword ? (
                      <ViewOffIcon className="h-5 w-5" />
                    ) : (
                      <ViewIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-zinc-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                  />
                </FormControl>
                <div className="leading-none flex items-center pt-0.5">
                  <FormLabel className="text-sm font-medium text-zinc-700 cursor-pointer">
                    Remember me
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <a href="#" className="text-sm font-semibold text-black hover:underline">
            Forgot password?
          </a>
        </div>

        <Button 
          type="submit" 
          disabled={form.formState.isSubmitting}
          className="h-12 bg-black text-white hover:bg-zinc-800 rounded-md font-bold w-full mt-2"
        >
          {form.formState.isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}
