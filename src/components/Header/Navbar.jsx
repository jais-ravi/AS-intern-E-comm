"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CgProfile } from "react-icons/cg";
import { RiShoppingCart2Line } from "react-icons/ri";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Profilebtn from "../Profile/Profilebtn";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const {toast} = useToast();
  const router = useRouter();
  const handleLinkClick = (link) => {
    if (!session) {
      toast({
        title: "Please Login",
        description: "You have to Login first to access it",
        variant: "destructive",
      });
      setTimeout(() => {
        router.replace("/sign-in");
      }, 1500);
    } else {
      router.replace(link);
    }
  };

  const navbtn = [
    {
      icon: <RiShoppingCart2Line size={25} />,
      text: "Cart",
      link: "",
    },
  ];
  return (
    <div className=" bg-white flex justify-center items-center border-b-2 border-slate-400">
      <div className=" container flex justify-between items-center py-3  ">
        <div className="">
          <h1>Logo</h1>
        </div>
        <div>
          <form className="flex">
            <Input type="search" placeholder="Search items" />
            {/* <Button type="submit" className="bg-red-500"></Button> */}
          </form>
        </div>
        <div className="flex gap-5">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">
                  <div className="flex gap-2 capitalize text-sm">
                    <h1>Hello,</h1>
                    {user.username || user.email}
                  </div>
                  <Profilebtn />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          ) : (
            <Link
              href="/sign-in"
              className="gap-3 flex items-center justify-center"
            >
              <CgProfile size={25} />
              <h1 className="text-sm">Login/Sign-up</h1>
            </Link>
          )}
          {navbtn.map((items) => (
            <Button variant="ghost" key="" onClick={()=> handleLinkClick(items.link)}>
              
                {items.icon}
                <h1 className="text-sm">{items.text}</h1>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
