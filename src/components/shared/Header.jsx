"use client"

import { useClientContext } from '@/context/clientContext';
import { headerButtons } from '@/data/headerButtons';
import React, { useState } from 'react'
import HeaderButton from './HeaderButton';
import NotificationIcon from './NotificationIcon';

const Header = () => {
    const [activePage, setActivePage] = useState("clients");
    const [hasNotifications, setHasNotifications] = useState(true);

    const { showAddClient } = useClientContext();

    const handleButtonClick = (pageKey) => {
        setActivePage(pageKey);
    };

    const handleNotificationClick = () => {
        setHasNotifications(false);
    };

    return (

        <div className='flex flex-col gap-5'>
            <div className="flex justify-between items-center">
                {/* Buttons - Left side */}
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
            <div className="w-full h-2 rounded-full bg-customBlue my-2"></div>
        </div>
    )
}

export default Header