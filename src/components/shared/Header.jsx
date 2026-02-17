"use client"

import { useClientContext } from '@/context/clientContext';
import { useInventoryContext } from '@/context/inventoryContext';
import { headerButtons } from '@/data/headerButtons';
import React, { useState, useEffect } from 'react'
import HeaderButton from './HeaderButton';
import NotificationIcon from './NotificationIcon';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
    const [activePage, setActivePage] = useState("clients");
    const [hasNotifications, setHasNotifications] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const { showAddClient } = useClientContext();
    const { showAddInventory } = useInventoryContext();

    // Update active page based on current pathname
    useEffect(() => {
        if (pathname.includes('/dashboard/inventory')) {
            setActivePage('inventory');
        } else if (pathname.includes('/dashboard/clients')) {
            setActivePage('clients');
        } else if (pathname.includes('/dashboard/vehicles')) {
            setActivePage('vehicles');
        }
    }, [pathname]);

    const handleButtonClick = (pageKey) => {
        setActivePage(pageKey);
        
        // Navigate to the appropriate page
        switch (pageKey) {
            case 'inventory':
                router.push('/dashboard/inventory');
                break;
            case 'clients':
                router.push('/dashboard/clients');
                break;
            case 'vehicles':
                router.push('/dashboard/vehicles');
                break;
            case 'geoFence':
                router.push('/dashboard/geo-fence');
                break;
            case 'accounts':
                router.push('/dashboard/accounts');
                break;
            case 'roboCall':
                router.push('/dashboard/robo-call');
                break;
            case 'reports':
                router.push('/dashboard/reports');
                break;
            default:
                break;
        }
    };

    const handleNotificationClick = () => {
        setHasNotifications(false);
    };

    return (
        <div className='flex flex-col gap-5'>
            <div className="flex justify-between items-center gap-2 sm:gap-4">
                {/* Buttons - Left side with flexible width */}
                <nav className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0 overflow-x-auto pb-2 scrollbar-hide">
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

                {/* Right side - Notification (fixed width) */}
                <div className="flex items-center flex-shrink-0">
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