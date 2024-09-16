import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CgProfile } from "react-icons/cg";
import { TbTruckDelivery } from "react-icons/tb";
import { RiShoppingCart2Line } from "react-icons/ri";
import Link from "next/link";



const Navbar = () => {
  const navbtn = [
    {
      icon: <CgProfile size={25} />,
      text: "Login/Sign-up",
      link: "/sign-up",
    },
    {
      icon: <TbTruckDelivery size={25} />,
      text: "Track Order",
      link: "",
    },
    {
      icon: <RiShoppingCart2Line size={25} />,
      text: "Cart",
      link: "",
    },
  ];
  return (
    <div className=" bg-white flex justify-center items-center border-b-2 border-black">
      <div className=" min-w-[80%] flex justify-between items-center py-3 px-5 ">
        <div className="">
          <h1>Logo</h1>
        </div>
        <div>
          <form className="flex">
            <Input type="search" placeholder="Search items" />
            {/* <Button type="submit" className="bg-red-500"></Button> */}
          </form>
        </div>
        <div className="flex gap-10">
          {navbtn.map((items) => (
            <Button variant="ghost" key="">
              <Link
                href={items.link}
                className="gap-3 flex items-center justify-center"
              >
                {items.icon}
                {items.text}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
