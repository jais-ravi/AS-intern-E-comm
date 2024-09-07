import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Card, CardContent } from "../ui/card";

const CatNav = () => {
  const CatData = [
    {
      CatName: "Category 1",
      
    },
    {
      CatName: "Category 1",
    },
  ];
  return (
    <div>
      <div className=" bg-white flex justify-center items-center border-b-2 border-black p-3">
        {CatData.map((CatData) => (
          <NavigationMenu key="">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{CatData.CatName}</NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  <Card>
                    <CardContent className="pt-6 flex flex-col gap-4 min-w-52">
                      <NavigationMenuLink>
                          link
                      </NavigationMenuLink>
                    </CardContent>
                  </Card>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ))}
      </div>
    </div>
  );
};

export default CatNav;
