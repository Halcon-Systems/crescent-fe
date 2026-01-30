import React from 'react'
import { Star, StarOff, Sun, RotateCcw, Bell, Settings } from "lucide-react";

const Navbar = () => {
  const iconClasses =
    "w-5 h-5 cursor-pointer text-gray-900 transition hover:text-customBlue hover:scale-110";

  return (
    <div>
      <nav className="
  bg-white
  fixed
  top-0
  z-20
  border-b border-gray-200
  w-full
  md:left-64
  md:w-[calc(100%-16rem)]
">
        <div className="flex flex-wrap items-center justify-between px-6 py-4">
          <div className='flex gap-5'>
            {/* starting icons */}
          <div className="flex items-center gap-3">
            <Settings className={iconClasses} />
            <Star
              className={iconClasses}
            />

          </div>
          {/* heading "Organization Setup" */}
          <div className="flex items-center">
            <span className="self-center text-xl text-gray-400 text-heading font-medium whitespace-nowrap">Organization Setup</span>
          </div>
          </div>

          <div className="flex items-center md:order-2 w-full md:w-auto">
            {/* Mobile search button - hidden on desktop */}
            <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="flex items-center justify-center md:hidden text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-2 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm w-10 h-10 focus:outline-none">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
              <span className="sr-only">Search</span>
            </button>

            {/* Search bar - full width on mobile, auto width on desktop */}
            <label htmlFor="input-group-1" className="sr-only">Search</label>
            <div className="relative w-full md:w-auto md:flex-1 md:max-w-md">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
              </div>
              <input type="text" id="input-group-1" className="block w-full ps-9 pe-3 py-2.5 bg-gray-100 rounded-xl outline-none text-heading text-sm rounded-base px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="Search" />
            </div>

            {/* right side icons */}
            <div className="flex items-center gap-4 ml-5">
              {/* Light Theme */}
              <Sun className={iconClasses} />

              {/* Refresh */}
              <RotateCcw className={iconClasses} />

              {/* Notification */}
              <Bell className={iconClasses} />

              {/* Custom Icon (change later) */}
              <Settings className={iconClasses} />
            </div>

            {/* Menu button - hidden as per image */}
            <button data-collapse-toggle="navbar-search" type="button" className="hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" /></svg>
            </button>
          </div>

          {/* Navigation menu - hidden as per image */}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
              </div>
              <input type="text" id="input-group-1" className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="Search" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar