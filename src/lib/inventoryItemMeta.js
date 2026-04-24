/**
 * Resolves unit-of-measurement from inventory / dropdown item payloads (flat or nested).
 */
export function resolveItemUnitOfMeasurement(item) {
  if (!item || typeof item !== "object") return "";

  const candidates = [
    item.unitOfMeasurement,
    item.uom,
    item.unit,
    item.unitName,
    item.measurementUnit,
    item.defaultUom,
    item.unit_of_measurement,
    item.defaultUnitOfMeasure,
    item.UOM,
    item.inventoryItem?.unitOfMeasurement,
    item.inventoryItem?.uom,
    item.inventoryItem?.unit,
    item.item?.unitOfMeasurement,
    item.item?.uom,
    item.item?.unit,
  ];

  for (const c of candidates) {
    if (c === undefined || c === null) continue;
    const s = String(c).trim();
    if (s.length > 0) return s;
  }
  return "";
}

/** Stable string id for selects and API payloads. */
export function resolveItemRecordId(item) {
  if (!item || typeof item !== "object") return "";
  const id =
    item.id ??
    item.itemId ??
    item._id ??
    item.inventoryItemId ??
    item.inventoryItem?.id ??
    item.value;
  if (id === undefined || id === null) return "";
  return String(id);
}
