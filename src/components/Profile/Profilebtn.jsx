import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { User, LogOut, MapPinHouse, Truck } from "lucide-react";
import Link from "next/link";
import { useToast } from "../ui/use-toast";

const Profilebtn = () => {
  const { toast } = useToast();
  const handleSignOut = async () => {
    try {

      await signOut({ redirect: false });
      toast({
        title: "Signed Out",
        description: "You have successfully signed out.",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during sign out.",
        status: "error",
      });
    }
  };

  const menuData = [
    {
      name: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
      url: "",
    },
    {
      name: "Address",
      icon: <MapPinHouse className="mr-2 h-4 w-4" />,
      url: "",
    },
    {
      name: "Track Order",
      icon: <Truck className="mr-2 h-4 w-4" />,
      url: "",
    },
  ];
  return (
    <DropdownMenuContent className=" min-w-52">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {menuData.map((data) => (
        <Link href={data.url}>
          <DropdownMenuItem>
            {data.icon}
            <span>{data.name}</span>
          </DropdownMenuItem>
        </Link>
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem  onClick={() => handleSignOut()} >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default Profilebtn;
