"use client"

import AddInventoryForm from '@/components/inventory/AddInventoryForm';
import Inventory from '@/components/inventory/Inventory';
import { useInventoryContext } from '@/context/inventoryContext';
import React from 'react'

const Page = () => {
  const { showAddInventory } = useInventoryContext();

  return (
    <div className="">
      <div className="mt-4">
        {showAddInventory ? <AddInventoryForm /> : <Inventory />}
      </div>
    </div>
  )
}

export default Page
