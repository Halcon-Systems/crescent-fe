"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  User,
  LayoutDashboard,
  Users,
  Truck,
  MapPin,
  Boxes,
  Wallet,
  Bell,
  Building2,
  FileText,
} from "lucide-react";
import LogoSVG from "@/components/svg/logoSVG";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [hasUserImage, setHasUserImage] = useState(true);

  const userImage = "/users/user.png"; // optional

  const MenuItem = ({ icon: Icon, label, active }) => (
    <a
      href="/dashboard/clients"
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
        ${
          active
            ? "bg-customGreen text-white"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1">{label}</span>
    </a>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button className="sm:hidden p-2 m-2">
        <svg width="24" height="24" fill="none">
          <path
            stroke="currentColor"
            strokeWidth={2}
            d="M5 7h14M5 12h14M5 17h10"
          />
        </svg>
      </button>

      <aside className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200">
        <div className="flex flex-col h-full px-4 py-4 overflow-y-auto">

          {/* LOGO */}
          <div className="flex items-center gap-2 mb-4 px-2">
            <LogoSVG />
          </div>

          {/* USER DROPDOWN */}
          <div className="relative border-y border-gray-200 py-2 mb-4">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center w-full gap-3 px-2 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
                {hasUserImage ? (
                  <Image
                    src={userImage}
                    alt="User"
                    width={32}
                    height={32}
                    className="object-cover"
                    onError={() => setHasUserImage(false)}
                  />
                ) : (
                  <User className="w-4 h-4 text-gray-600" />
                )}
              </div>

              {/* Name */}
              <span className="flex-1 text-sm font-medium text-left truncate">
                User Name
              </span>

              {/* Arrow */}
              <svg
                className={`w-4 h-4 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth={2}
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg z-50">
                <a className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  Profile
                </a>
                <a className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                  Settings
                </a>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MENU */}
          <MenuItem icon={LayoutDashboard} label="Dashboards" />
          <MenuItem icon={Users} label="Clients" active/>
          <MenuItem icon={Truck} label="Vehicles" />

          {/* PAGES */}
          <p className="mt-4 mb-1 px-2 text-xs font-semibold uppercase text-gray-400">
            Pages
          </p>
          <MenuItem icon={MapPin} label="Geo Fence" />
          <MenuItem icon={Boxes} label="Inventory" />
          <MenuItem icon={Wallet} label="Finance & Accounts" />
          <MenuItem icon={Bell} label="Complaints" />

          {/* SETUP */}
          <p className="mt-4 mb-1 px-2 text-xs font-semibold uppercase text-gray-400">
            Setup
          </p>
          <MenuItem icon={Bell} label="Notifications" />
          <MenuItem icon={Building2} label="Organization Setup" />
          <MenuItem icon={FileText} label="Reports" />

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
