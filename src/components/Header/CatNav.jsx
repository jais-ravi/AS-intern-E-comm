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
import Link from "next/link";

const CatNav = () => {
  const CatData = [
    {
      name: "Category 1",
      links: [
        { name: "Link 1.1", url: "/link1-1" },
        { name: "Link 1.2", url: "/link1-2" },
        { name: "Link 1.3", url: "/link1-3" },
      ],
    },
    {
      name: "Category 2",
      links: [
        { name: "Link 2.1", url: "/link2-1" },
        { name: "Link 2.2", url: "/link2-2" },
      ],
    },
    {
      name: "Category 3",
      links: [
        { name: "Link 3.1", url: "/link3-1" },
        { name: "Link 3.2", url: "/link3-2" },
        { name: "Link 3.3", url: "/link3-3" },
        { name: "Link 3.4", url: "/link3-4" },
      ],
    },
    {
      name: "Category 4",
      links: [
        { name: "Link 4.1", url: "/link4-1" },
        { name: "Link 4.2", url: "/link4-2" },
      ],
    },
    {
      name: "Category 5",
      links: [
        { name: "Link 5.1", url: "/link5-1" },
        { name: "Link 5.2", url: "/link5-2" },
      ],
    },
    {
      name: "Category 6",
      links: [
        { name: "Link 6.1", url: "/link6-1" },
        { name: "Link 6.2", url: "/link6-2" },
        { name: "Link 6.3", url: "/link6-3" },
      ],
    },
    {
      name: "Category 7",
      links: [
        { name: "Link 7.1", url: "/link7-1" },
        { name: "Link 7.2", url: "/link7-2" },
        { name: "Link 7.3", url: "/link7-3" },
        { name: "Link 7.3", url: "/link7-3" },
        { name: "Link 7.3", url: "/link7-3" },
        { name: "Link 7.3", url: "/link7-3" },
      ],
    },
    {
      name: "Category 8",
      links: [
        { name: "Link 8.1", url: "/link8-1" },
        { name: "Link 8.2", url: "/link8-2" },
      ],
    },
  ];

  return (
    <div>
      <div className="bg-white flex justify-center items-center border-b-2 border-black p-3 gap-3">
        {CatData.map((category) => (
          <NavigationMenu key={category.name}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  <Card>
                    <CardContent className="pt-6 flex flex-col gap-4 min-w-52">
                      {category.links.map((link) => (
                        <NavigationMenuLink asChild key={link.url}>
                          <Link href={link.url}>{link.name}</Link>
                        </NavigationMenuLink>
                      ))}
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
