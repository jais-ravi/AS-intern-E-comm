"use client";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { signUpSchema } from "@/schemas/signupSchema";
import { Card } from "@/components/ui/card";

export default function Page(req) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // ZOD implementation
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/sign-up", data);

      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        // Use the returned userId (_id) to navigate to the verify route
        router.replace(`/verify/${response.data.userId}`);
      }

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in signup of user", error);

      if (axios.isAxiosError(error)) {
        let errorMessage =
          error.response?.data.message || "Something went wrong!";
        toast({
          title: "Signup failed",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signup failed",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }

      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <Card className=" w-[80%] drop-shadow-2xl">
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="hidden bg-muted lg:block">
            <Image
              src="/next.svg"
              alt="Image"
              width="1920"
              height="1080"
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Signup</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your details below to create a new account
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Signup"
                    )}
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="underline">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
