/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import profileAvatar from "@/assets/profile.png";
import { useMyProfileQuery } from "@/redux/api/authApi";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";

const Topbar: React.FC<{ onHamburgerClick: () => void }> = ({
  onHamburgerClick,
}) => {
  const {data: meProfile} = useMyProfileQuery({});
  const profile = meProfile?.data;

  return (
    <header className="bg-white shadow-sm py-6 px-6 lg:px-16 w-full border-b border-red-200">
      <div className="flex justify-between items-center flex-wrap">
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={onHamburgerClick}
        >
          <AiOutlineMenu />
        </button>

        <div className="flex items-center gap-6">
          <h1 className="text-[#161616] flex items-center gap-2 text-[16px] md:text-[24px] font-bold">
          {profile?.fullName || "Super Admin"}
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <Link href={`/settings`}>
            <Image
              src={profile?.profileImage || profileAvatar}
              className="w-10 h-10 rounded-full"
              alt="profile icon"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
