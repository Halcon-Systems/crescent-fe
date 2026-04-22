"use client";

import React, { useState } from 'react';
import { Plus, X, Loader } from 'lucide-react';
import DataTable from '../../components/DataTable';
import FieldWrapper from '../../ui/FieldWrapper';
import Input from '../../ui/Input';
import Select from '../../ui/Select';

const PurchaseOrderPage = () => {
    const [orders, setOrders] = useState([
        { id: '1', store: 'Head Office', userId: 'admin@example.com', purchasedRequestNo: 'PR001', purchaseOrderNo: 'PO001', createdOn: '2024-02-20 10:30:00', approvalStatus: 'APPROVED', deliveryStatus: 'PENDING' },
        { id: '2', store: 'Branch Office', userId: 'user@example.com', purchasedRequestNo: 'PR002', purchaseOrderNo: 'PO002', createdOn: '2024-02-18 14:15:00', approvalStatus: 'DRAFT', deliveryStatus: 'PENDING' }
    ]);

    const [offices] = useState([
        { id: '1', branchName: 'Head Office' },
        { id: '2', branchName: 'Branch Office' }
    ]);

    const [items] = useState([
        { id: '1', name: 'Laptop Dell Latitude', unitOfMeasurement: 'pieces', price: 1200 },
        { id: '2', name: 'Wireless Mouse', unitOfMeasurement: 'pieces', price: 25 }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [previewPO, setPreviewPO] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, poId: null });
    const [deleting, setDeleting] = useState(null);

    const [formData, setFormData] = useState({
        officeId: '',
        office: '',
        user: '1 - Admin User',
        date: '',
        expectedDeliveryDate: '',
        taxAmount: '',
        shippingCost: '',
        discountAmount: '',
        notes: '',
        poItems: [],
        currentItem: {
            itemId: '', itemName: '', unitOfMeasurement: '',
            quantityOrdered: 1, unitPrice: '', totalPrice: ''
        }
    });

    const tableColumns = [
        { key: 'store', label: 'Store', width: '15%' },
        { key: 'userId', label: 'User', width: '15%' },
        { key: 'purchasedRequestNo', label: 'PR #', width: '12%' },
        { key: 'purchaseOrderNo', label: 'PO #', width: '12%' },
        { key: 'createdOn', label: 'Created On', width: '15%' },
        {
            key: 'approvalStatus', label: 'Approval Status', width: '12%',
            render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.approvalStatus === 'APPROVED' ? 'bg-green-100 text-green-700' :
                    item.approvalStatus === 'REJECTED' ? 'bg-red-100 text-red-700' :
                    item.approvalStatus === 'SUBMITTED' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                }`}>{item.approvalStatus}</span>
            )
        },
        {
            key: 'deliveryStatus', label: 'Delivery Status', width: '12%',
            render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.deliveryStatus === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                    item.deliveryStatus === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                }`}>{item.deliveryStatus}</span>
            )
        }
    ];

    const filteredOrders = orders.filter(order =>
        order.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.purchasedRequestNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.purchaseOrderNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const resetForm = () => ({
        officeId: '', office: '', user: '1 - Admin User', date: '',
        expectedDeliveryDate: '', taxAmount: '', shippingCost: '',
        discountAmount: '', notes: '', poItems: [],
        currentItem: { itemId: '', itemName: '', unitOfMeasurement: '', quantityOrdered: 1, unitPrice: '', totalPrice: '' }
    });

    const handleOpenModal = () => {
        setFormData(resetForm());
        setShowAddModal(true);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
        setFormData(resetForm());
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        const unitPrice = formData.currentItem.unitPrice;
        setFormData(prev => ({
            ...prev,
            currentItem: {
                ...prev.currentItem,
                quantityOrdered: value,
                totalPrice: unitPrice ? (value * parseFloat(unitPrice)).toFixed(2) : ''
            }
        }));
    };

    const handleUnitPriceChange = (e) => {
        const unitPrice = e.target.value;
        const qty = formData.currentItem.quantityOrdered;
        setFormData(prev => ({
            ...prev,
            currentItem: {
                ...prev.currentItem,
                unitPrice,
                totalPrice: unitPrice && qty ? (parseFloat(unitPrice) * qty).toFixed(2) : ''
            }
        }));
    };

    const handleIncrement = () => {
        const newQty = formData.currentItem.quantityOrdered + 1;
        const unitPrice = formData.currentItem.unitPrice;
        setFormData(prev => ({
            ...prev,
            currentItem: {
                ...prev.currentItem,
                quantityOrdered: newQty,
                totalPrice: unitPrice ? (newQty * parseFloat(unitPrice)).toFixed(2) : ''
            }
        }));
    };

    const handleDecrement = () => {
        const newQty = Math.max(1, formData.currentItem.quantityOrdered - 1);
        const unitPrice = formData.currentItem.unitPrice;
        setFormData(prev => ({
            ...prev,
            currentItem: {
                ...prev.currentItem,
                quantityOrdered: newQty,
                totalPrice: unitPrice ? (newQty * parseFloat(unitPrice)).toFixed(2) : ''
            }
        }));
    };

    const handleAddItem = () => {
        const { currentItem } = formData;
        if (!currentItem.itemId || !currentItem.unitPrice || currentItem.quantityOrdered < 1) return;
        setFormData(prev => ({
            ...prev,
            poItems: [...prev.poItems, { ...currentItem, id: Date.now() }],
            currentItem: { itemId: '', itemName: '', unitOfMeasurement: '', quantityOrdered: 1, unitPrice: '', totalPrice: '' }
        }));
    };

    const handleRemoveItem = (id) => {
        setFormData(prev => ({ ...prev, poItems: prev.poItems.filter(item => item.id !== id) }));
    };

    const handleSubmit = () => {
        if (!formData.officeId || formData.poItems.length === 0) return;
        setLoading(true);
        setTimeout(() => {
            const newOrder = {
                id: String(orders.length + 1),
                store: formData.office,
                userId: formData.user,
                purchasedRequestNo: `PR${String(orders.length + 1).padStart(3, '0')}`,
                purchaseOrderNo: `PO${String(orders.length + 1).padStart(3, '0')}`,
                createdOn: new Date().toLocaleString(),
                approvalStatus: 'DRAFT',
                deliveryStatus: 'PENDING'
            };
            setOrders(prev => [newOrder, ...prev]);
            setLoading(false);
            handleCloseModal();
        }, 1500);
    };

    const handleDelete = (itemName, index) => {
        setDeleteModal({ isOpen: true, poId: filteredOrders[index]?.id });
    };

    const handleConfirmDelete = () => {
        if (!deleteModal.poId) return;
        setDeleting(deleteModal.poId);
        setTimeout(() => {
            setOrders(prev => prev.filter(o => o.id !== deleteModal.poId));
            setDeleteModal({ isOpen: false, poId: null });
            setDeleting(null);
        }, 1000);
    };

    return (
        <div className="bg-white p-8 min-h-screen scrollbar-hide m-5 rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
                <button
                    onClick={handleOpenModal}
                    className="flex items-center gap-2 px-6 py-2.5 bg-customBlue text-white font-semibold rounded-lg hover:bg-customBlue/90"
                >
                    <Plus size={18} />
                    Add Purchase Order
                </button>
            </div>

            {/* Table */}
            <div className="pb-6 md:pb-8">
                <DataTable
                    isLoading={false}
                    error={null}
                    items={filteredOrders}
                    columns={tableColumns}
                    showView={true}
                    showEdit={false}
                    showDelete={true}
                    showToggle={false}
                    searchQuery={searchTerm}
                    onSearchChange={setSearchTerm}
                    onView={(item) => setPreviewPO(item)}
                    onDelete={handleDelete}
                    tabName="Purchase Order"
                />
            </div>

            {/* ── Add Purchase Order Modal ── */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    {/* Modal container — flex column, fixed max height */}
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col" style={{ maxHeight: '90vh' }}>

                        {/* Sticky Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
                            <h2 className="text-lg font-semibold text-gray-900">Add New Purchase Order</h2>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

                            {/* Office / User / Date */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FieldWrapper label="Office" required className="text-sm">
                                    <Select
                                        value={formData.officeId}
                                        onChange={(e) => {
                                            const selected = offices.find(o => o.id === e.target.value);
                                            setFormData(prev => ({ ...prev, officeId: e.target.value, office: selected?.branchName || '' }));
                                        }}
                                        className="text-sm"
                                    >
                                        <option value="">Select Office</option>
                                        {offices.map(o => <option key={o.id} value={o.id}>{o.branchName}</option>)}
                                    </Select>
                                </FieldWrapper>

                                <FieldWrapper label="User" required className="text-sm">
                                    <Input value={formData.user} disabled placeholder="Auto" className="text-sm py-2 bg-gray-50" />
                                </FieldWrapper>

                                <FieldWrapper label="Date & Time" required className="text-sm">
                                    <Input type="datetime-local" value={formData.date} disabled placeholder="Auto" className="text-sm py-2 bg-gray-50" />
                                </FieldWrapper>
                            </div>

                            {/* Item Selection */}
                            <div className="border-t border-gray-200 pt-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FieldWrapper label="Item Name" required className="text-sm">
                                        <Select
                                            value={formData.currentItem.itemName}
                                            onChange={(e) => {
                                                const selected = items.find(i => i.name === e.target.value);
                                                setFormData(prev => ({
                                                    ...prev,
                                                    currentItem: {
                                                        ...prev.currentItem,
                                                        itemId: selected?.id || '',
                                                        itemName: e.target.value,
                                                        unitOfMeasurement: selected?.unitOfMeasurement || ''
                                                    }
                                                }));
                                            }}
                                            className="text-sm"
                                        >
                                            <option value="">Select Item</option>
                                            {items.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                                        </Select>
                                    </FieldWrapper>

                                    <FieldWrapper label="Unit of Measurement" className="text-sm">
                                        <Input value={formData.currentItem.unitOfMeasurement} disabled placeholder="Auto" className="text-sm py-2 bg-gray-50" />
                                    </FieldWrapper>
                                </div>

                                <FieldWrapper label="Quantity Ordered" required className="text-sm">
                                    <div className="flex items-center gap-2">
                                        <button onClick={handleDecrement} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-semibold cursor-pointer">−</button>
                                        <Input type="number" value={formData.currentItem.quantityOrdered} onChange={handleQuantityChange} min="1" className="text-sm py-2 text-center flex-1" />
                                        <button onClick={handleIncrement} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-semibold cursor-pointer">+</button>
                                    </div>
                                </FieldWrapper>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FieldWrapper label="Unit Price" required className="text-sm">
                                        <Input type="number" value={formData.currentItem.unitPrice} onChange={handleUnitPriceChange} placeholder="0.00" step="0.01" min="0" className="text-sm py-2" />
                                    </FieldWrapper>
                                    <FieldWrapper label="Total Price" className="text-sm">
                                        <Input value={formData.currentItem.totalPrice} disabled placeholder="Auto calculated" className="text-sm py-2 bg-gray-50" />
                                    </FieldWrapper>
                                </div>

                            </div>

                            {/* Review Items Table */}
                            {formData.poItems.length > 0 && (
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-base font-semibold text-gray-800 mb-4">Review Details</h3>
                                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-50 border-b border-gray-200">
                                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">S.No.</th>
                                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Item Name</th>
                                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Qty</th>
                                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Unit Price</th>
                                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total</th>
                                                    <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formData.poItems.map((item, index) => (
                                                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                                        <td className="py-3 px-4 text-sm text-gray-700">{index + 1}</td>
                                                        <td className="py-3 px-4 text-sm text-gray-700">{item.itemName}</td>
                                                        <td className="py-3 px-4 text-sm font-semibold text-gray-700">{item.quantityOrdered}</td>
                                                        <td className="py-3 px-4 text-sm text-gray-700">{item.unitPrice}</td>
                                                        <td className="py-3 px-4 text-sm font-semibold text-gray-700">{item.totalPrice}</td>
                                                        <td className="py-3 px-4 text-center">
                                                            <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 font-bold text-base">✕</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sticky Footer */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-white shrink-0">
                            <button
                                onClick={handleCloseModal}
                                className="w-40 py-3.5 border border-customBlue text-customBlue hover:bg-gray-50 rounded-lg text-sm font-medium transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-40 py-3.5 bg-customBlue text-white hover:bg-customBlue/90 rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading && <Loader size={16} className="animate-spin" />}
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Preview Modal ── */}
            {previewPO && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col" style={{ maxHeight: '90vh' }}>

                        {/* Sticky Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
                            <h2 className="text-lg font-semibold text-gray-900">Purchase Order Details</h2>
                            <button onClick={() => setPreviewPO(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    ['Store', previewPO.store],
                                    ['User', previewPO.userId],
                                    ['PR #', previewPO.purchasedRequestNo],
                                    ['PO #', previewPO.purchaseOrderNo],
                                    ['Created On', previewPO.createdOn],
                                    ['Approval Status', previewPO.approvalStatus],
                                    ['Delivery Status', previewPO.deliveryStatus],
                                ].map(([label, value]) => (
                                    <div key={label}>
                                        <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
                                        <p className="text-sm text-gray-900">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sticky Footer */}
                        <div className="flex justify-end px-6 py-4 border-t border-gray-200 bg-white shrink-0">
                            <button
                                onClick={() => setPreviewPO(null)}
                                className="w-40 py-3.5 bg-customBlue text-white hover:bg-customBlue/90 rounded-lg text-sm font-medium transition cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Confirmation Modal ── */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col" style={{ maxHeight: '90vh' }}>

                        {/* Sticky Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
                            <h2 className="text-lg font-semibold text-gray-900">Confirm Delete</h2>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                            <p className="text-gray-600">Are you sure you want to delete this purchase order? This action cannot be undone.</p>
                        </div>

                        {/* Sticky Footer */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-white shrink-0">
                            <button
                                onClick={() => setDeleteModal({ isOpen: false, poId: null })}
                                className="w-40 py-3.5 border border-customBlue text-customBlue hover:bg-gray-50 rounded-lg text-sm font-medium transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={!!deleting}
                                className="w-40 py-3.5 bg-red-600 text-white hover:bg-red-700 rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {deleting && <Loader size={16} className="animate-spin" />}
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseOrderPage;