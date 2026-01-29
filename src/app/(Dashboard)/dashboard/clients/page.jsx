"use client"

import AddClientForm from '@/components/clients/AddClientForm';
import Clients from '@/components/clients/Clients';
import HeaderButton from '@/components/shared/HeaderButton';
import NotificationIcon from '@/components/shared/NotificationIcon';
import { useClientContext } from '@/context/clientContext';
import { headerButtons } from '@/data/headerButtons';
import React, { useState } from 'react'

const Page = () => {
  const [activePage, setActivePage] = useState("clients");
  const [hasNotifications, setHasNotifications] = useState(true);

  const { showAddClient } = useClientContext();

  const handleButtonClick = (pageKey) => {
    setActivePage(pageKey);
    // Yahan par page change ka logic add kar sakte hain
    // Jaise routing ya state update
  };

  const handleNotificationClick = () => {
    // Notification panel open karna ya count reset karna
    setHasNotifications(false);
    // Notification panel open logic
  };

  return (
    <header className="">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between gap-4">
          {/* Buttons */}
          <nav className="flex items-center gap-2 flex-1">
            {headerButtons.map((button) => (
              <HeaderButton
                key={button.id}
                title={button.title}
                icon={button.icon}
                active={activePage === button.pageKey}
                onClick={() => handleButtonClick(button.pageKey)}
              />
            ))}
          </nav>

          {/* Right side - Notification and User Menu */}
          <div className="flex items-center gap-4">
            {/* Notification Bell with click handler */}
            <button
              onClick={handleNotificationClick}
              className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors relative"
              aria-label="Notifications"
            >
              <NotificationIcon hasNotification={hasNotifications} />
            </button>
          </div>
        </div>

        {/* Full-width bar under buttons */}
        <div className="w-full h-2 rounded-full bg-customBlue mt-2"></div>

        {/* Dynamic clients Content */}
        <div className="mt-4">
          {showAddClient ? <AddClientForm /> : <Clients />}
        </div>
      </div>
    </header>
  )
}

export default Page