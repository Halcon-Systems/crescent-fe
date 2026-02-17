export const inventoryCategories = [
  { label: "All", value: "all", count: "1245" },
  { label: "Electronics", value: "electronics", count: "342" },
  { label: "Vehicle Parts", value: "vehicle_parts", count: "256" },
  { label: "Office Supplies", value: "office_supplies", count: "189" },
  { label: "Tools", value: "tools", count: "145" },
  { label: "Safety Equipment", value: "safety_equipment", count: "98" },
  { label: "Fuel & Oil", value: "fuel_oil", count: "67" },
  { label: "Other", value: "other", count: "148" },
];

export const inventoryStatuses = [
  { label: "In Stock", value: "in_stock", count: "892" },
  { label: "Low Stock", value: "low_stock", count: "234" },
  { label: "Out of Stock", value: "out_of_stock", count: "89" },
  { label: "Discontinued", value: "discontinued", count: "30" },
];

export const generateMockInventory = () => {
  const categories = ["electronics", "vehicle_parts", "office_supplies", "tools", "safety_equipment", "fuel_oil", "other"];
  const statuses = ["in_stock", "low_stock", "out_of_stock", "discontinued"];
  const suppliers = ["Tech Supplies Inc", "Auto Parts Co", "Office Depot", "Tool World", "Safety First", "Fuel Masters"];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    sku: `INV-${1000 + i}`,
    name: `Inventory Item ${i + 1}`,
    description: `Description for inventory item ${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    quantity: Math.floor(Math.random() * 1000),
    minQuantity: Math.floor(Math.random() * 50) + 10,
    maxQuantity: Math.floor(Math.random() * 500) + 100,
    unitPrice: (Math.random() * 1000).toFixed(2),
    totalPrice: 0,
    supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    location: `Warehouse ${Math.floor(Math.random() * 5) + 1}-A${Math.floor(Math.random() * 20) + 1}`,
    lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    purchaseDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  })).map(item => ({
    ...item,
    totalPrice: (item.quantity * item.unitPrice).toFixed(2)
  }));
};

export const inventoryItems = generateMockInventory();
