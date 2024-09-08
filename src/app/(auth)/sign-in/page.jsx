// "use client";

// import React, { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import Link from "next/link";
// import { useToast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation";
// import { signInSchema } from "@/schemas/loginSchema";
// import axios, { Axios, AxiosError } from "axios";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Loader2 } from "lucide-react";

// const page = () => {
//   const [username, setUsername] = useState("");
//   const [usernameMessage, setUsernameMessage] = useState("");
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();
//   const router = useRouter();

//   // ZOD implementation
//   const form = useForm({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//   });
//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post("/api/sign-up", data);
//       toast({
//         title: "Success",
//         description: response.data.message,
//       });
//       router.replace(`/verify/${username}`);
//       setIsSubmitting(false);
//     } catch (error) {
//       console.error("Error in signup of user", error);
//       // const axiosError = error ;
//       if (error.isAxiosError) {
//         const axiosError = AxiosError; //TODO:  may be used another approch
//         let errorMessage = axiosError.response?.data.message;
//         toast({
//           title: "Signu failed",
//           description: errorMessage,
//           variant: "destructive",
//         });
//         setIsSubmitting(false);
//       }
//     }
//   };
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Sign in Your account
//           </h1>
//           <p className="mb-4">Sign in to continue with your account</p>
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="email"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               name="password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="password" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button className="w-full" type="submit" disable={isSubmitting}>
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 "Signup"
//               )}
//               Login
//             </Button>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p>
//             Not a member yet?{" "}
//             <Button variant="link"  >
//               <Link href="/sign-up">signup</Link>
//             </Button>
//             {/* <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
//               Sign up
//             </Link> */}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;


import React from 'react'

const page = () => {
  return (
    <div>
      lolo
    </div>
  )
}

export default page

