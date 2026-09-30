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
              <FormLabel className="text-xs sm:text-sm font-semibold text-foreground">Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="h-11 rounded-md bg-background dark:bg-zinc-950/70 border-border dark:border-zinc-800 shadow-xs hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary text-foreground placeholder:text-muted-foreground px-4 transition-colors text-sm"
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
              <FormLabel className="text-xs sm:text-sm font-semibold text-foreground">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                    className="h-11 rounded-md bg-background dark:bg-zinc-950/70 border-border dark:border-zinc-800 shadow-xs hover:border-border/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary text-foreground placeholder:text-muted-foreground px-4 pr-10 transition-colors text-sm"
                    {...field} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors p-1"
                    title={showPassword ? "Hide password" : "Show password"}
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
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:text-zinc-950 data-[state=checked]:border-primary"
                  />
                </FormControl>
                <div className="leading-none flex items-center pt-0.5">
                  <FormLabel className="text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer select-none transition-colors">
                    Remember me
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <a href="#" className="text-sm font-medium text-primary hover:underline cursor-pointer transition-colors">
            Forgot password?
          </a>
        </div>

        <Button 
          type="submit" 
          disabled={form.formState.isSubmitting}
          className="h-11 sm:h-12 bg-primary hover:bg-primary/90 text-zinc-950 font-bold rounded-md w-full mt-2 cursor-pointer shadow-md hover:shadow-lg transition-all text-sm sm:text-base disabled:opacity-50"
        >
          {form.formState.isSubmitting ? (
            <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}
