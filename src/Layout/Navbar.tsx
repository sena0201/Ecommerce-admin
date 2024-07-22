"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsHouseGear } from "react-icons/bs";
import {
  LuLayoutDashboard,
  LuUserCog,
} from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";
import { RiBillLine, RiMenu2Line } from "react-icons/ri";

function Navbar() {
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const handleSmallNavbar = () => {
    setIsSmall(!isSmall);
  };
  return (
    <nav
      className={`${
        isSmall ? "" : "w-[350px]"
      } bg-primary min-h-screen rounded-r-3xl text-white p-[30px] text-base transition duration-300 ease-in-out ${
        isSmall ? "flex flex-col items-center" : ""
      }`}
    >
      <div className="flex items-center gap-5">
        <button
          className="text-4xl p-3"
          onClick={handleSmallNavbar}
        >
          <RiMenu2Line />
        </button>
        {!isSmall && (
          <div className="text-[45px]">Logo</div>
        )}
      </div>
      <p className="text-sm text-grey mt-5">MENU</p>
      <ul className="my-8">
        {/* <li>
          <Link
            href={"Dashboard"}
            className="flex items-center gap-4 p-5 hover:bg-link-hover hover:text-primary hover:rounded-2xl"
          >
            <LuLayoutDashboard className="text-xl" />
            {!isSmall && (
              <p className="font-medium">Dashboard</p>
            )}
          </Link>
        </li> */}
        <li>
          <Link
            href={"Supplier"}
            className="flex items-center gap-4 p-5 hover:bg-link-hover hover:text-primary hover:rounded-2xl"
          >
            <BsHouseGear className="text-xl" />
            {!isSmall && (
              <p className="font-medium">Suppiler</p>
            )}
          </Link>
        </li>
        <li>
          <Link
            href={"Category"}
            className="flex items-center gap-4 p-5 hover:bg-link-hover hover:text-primary hover:rounded-2xl"
          >
            <MdOutlineCategory className="text-xl" />
            {!isSmall && (
              <p className="font-medium">Category</p>
            )}
          </Link>
        </li>
        <li>
          <Link
            href={"Product"}
            className="flex items-center gap-4 p-5 hover:bg-link-hover hover:text-primary hover:rounded-2xl"
          >
            <PiShoppingBagOpenDuotone className="text-xl" />
            {!isSmall && (
              <p className="font-medium">Product</p>
            )}
          </Link>
        </li>
        <li>
          <Link
            href={"Order"}
            className="flex items-center gap-4 p-5 hover:bg-link-hover hover:text-primary hover:rounded-2xl"
          >
            <RiBillLine className="text-xl" />
            {!isSmall && (
              <p className="font-medium">Order</p>
            )}
          </Link>
        </li>

        {/* <li>
          <Link
            href={"User"}
            className="flex items-center gap-4 p-5 hover:bg-link-hover hover:text-primary hover:rounded-2xl"
          >
            <LuUserCog className="text-xl" />
            {!isSmall && (
              <p className="font-medium">User</p>
            )}
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
