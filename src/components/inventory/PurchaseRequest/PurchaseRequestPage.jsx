'use client';
import React, { useState, useMemo } from 'react';
import { Plus, X, Loader } from 'lucide-react';
import DataTable from '@/components/components/DataTable';
import FieldWrapper from '@/components/ui/FieldWrapper';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ValidationErrorModal from '@/components/components/ValidationErrorModal';
import SuccessModal from '@/components/ui/SuccessModal';

const PurchaseRequestPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [successModal, setSuccessModal] = useState({ isOpen: false, message: '' });

  const [localRequests, setLocalRequests] = useState([
    { id: 'PR001', name: 'PR001', officeId: '1', officeName: 'Head Office', userId: 'admin@example.com', createdAt: new Date().toISOString(), status: 'DRAFT', isActive: true },
    { id: 'PR002', name: 'PR002', officeId: '2', officeName: 'Branch Office', userId: 'user@example.com', createdAt: new Date().toISOString(), status: 'SUBMITTED', isActive: true }
  ]);

  const [purchaseRequestItems, setPurchaseRequestItems] = useState([]);
  const [purchaseFormData, setPurchaseFormData] = useState({
    officeId: '', storeId: '', itemSku: '', itemId: '',
    itemName: '', unitOfMeasurement: '', quantity: 1
  });

  const [offices] = useState([
    { id: '1', branchName: 'Head Office' },
    { id: '2', branchName: 'Branch Office' }
  ]);

  const [items] = useState([
    { id: '1', name: 'Laptop Dell Latitude', sku: 'LAPTOP-001', unitOfMeasurement: 'pieces', price: 1200 },
    { id: '2', name: 'Wireless Mouse', sku: 'MOUSE-001', unitOfMeasurement: 'pieces', price: 25 }
  ]);

  const [stores] = useState([
    { id: '1', name: 'Main Store', officeId: '1' },
    { id: '2', name: 'Branch Store', officeId: '2' }
  ]);

  const [user] = useState({ id: 'admin@example.com', userId: 'admin' });

  const requests = useMemo(() => (isLoading ? [] : localRequests), [localRequests, isLoading]);

  const tableColumns = [
    { key: 'officeName', label: 'Office', width: '15%' },
    { key: 'userId', label: 'User ID', width: '20%' },
    { key: 'id', label: 'Purchased Request', width: '15%' },
    {
      key: 'createdAt', label: 'Created On', width: '15%',
      render: (item) => new Date(item.createdAt).toLocaleDateString()
    },
    { key: 'section', label: 'Group / Section', width: '15%', render: () => 'General' },
    {
      key: 'status', label: 'Status', width: '10%',
      render: (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
          item.status === 'APPROVED' || item.status === 'SUBMITTED' ? 'bg-green-100 text-green-700' :
          item.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {item.status || 'DRAFT'}
        </span>
      )
    }
  ];

  const resetForm = () => {
    setPurchaseRequestItems([]);
    setPurchaseFormData({ officeId: '', storeId: '', itemSku: '', itemId: '', itemName: '', unitOfMeasurement: '', quantity: 1 });
  };

  const handleOpenModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const handleQuantityChange = (value) => {
    const num = parseInt(value) || 1;
    if (num > 0) setPurchaseFormData(prev => ({ ...prev, quantity: num }));
  };

  const handleAddItem = () => {
    if (!purchaseFormData.itemId) {
      setValidationErrors(['Item']);
      setShowValidationError(true);
      return;
    }
    const selectedItem = items.find(i => i.id === purchaseFormData.itemId);
    if (!selectedItem) return;

    setPurchaseRequestItems(prev => [...prev, {
      id: Date.now(),
      itemId: selectedItem.id,
      itemSku: selectedItem.sku,
      itemName: selectedItem.name,
      unitOfMeasurement: purchaseFormData.unitOfMeasurement || selectedItem.unitOfMeasurement,
      quantity: purchaseFormData.quantity,
      unitPrice: selectedItem.price || 0
    }]);
    setPurchaseFormData(prev => ({ ...prev, itemSku: '', itemId: '', itemName: '', unitOfMeasurement: '', quantity: 1 }));
  };

  const handleRemoveItem = (itemId) => {
    setPurchaseRequestItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAddRequest = () => {
    if (!purchaseFormData.officeId || purchaseRequestItems.length === 0) {
      setValidationErrors(['Office', 'Items']);
      setShowValidationError(true);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newRequest = {
        id: `PR${String(localRequests.length + 1).padStart(3, '0')}`,
        name: `PR${String(localRequests.length + 1).padStart(3, '0')}`,
        officeId: purchaseFormData.officeId,
        officeName: offices.find(o => o.id === purchaseFormData.officeId)?.branchName,
        userId: user?.id || 'N/A',
        createdAt: new Date().toISOString(),
        status: 'DRAFT',
        isActive: true,
        items: purchaseRequestItems
      };
      setLocalRequests(prev => [newRequest, ...prev]);
      setIsSubmitting(false);
      setSuccessModal({ isOpen: true, message: 'Purchase Request created successfully' });
      handleCloseModal();
    }, 1500);
  };

  const handleDeleteRequest = (itemName, index) => {
    if (requests[index]?.id) {
      setLocalRequests(prev => prev.filter(r => r.id !== requests[index].id));
    }
  };

  const handleEditRequest = (item) => {
    setPurchaseRequestItems(item.items || []);
    setPurchaseFormData(prev => ({ ...prev, officeId: item.officeId }));
    setShowAddModal(true);
  };

  return (
    <div className="bg-white p-8 min-h-screen scrollbar-hide m-5 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Purchase Requests</h1>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-6 py-2.5 bg-customBlue text-white font-semibold rounded-lg hover:bg-customBlue/90"
        >
          <Plus size={18} />
          Add New Request
        </button>
      </div>

      {/* Table */}
      <div className="pb-6 md:pb-8">
        <DataTable
          isLoading={isLoading}
          error={null}
          items={requests}
          columns={tableColumns}
          showView={true}
          showEdit={true}
          showDelete={true}
          showToggle={false}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onEdit={handleEditRequest}
          onDelete={handleDeleteRequest}
          tabName="Purchase Request"
        />
      </div>

      {/* ── Add / Edit Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          {/* flex-col + maxHeight keeps header/footer sticky */}
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex flex-col" style={{ maxHeight: '90vh' }}>

            {/* Sticky Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
              <h2 className="text-lg font-semibold text-gray-900">Add New Purchase Request</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

              {/* Office / Store / User / Date */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FieldWrapper label="Office" required className="text-sm">
                  <Select
                    value={purchaseFormData.officeId}
                    onChange={(e) => setPurchaseFormData(prev => ({ ...prev, officeId: e.target.value }))}
                    className="text-sm"
                  >
                    <option value="">Select Office</option>
                    {offices.map(o => <option key={o.id} value={o.id}>{o.branchName}</option>)}
                  </Select>
                </FieldWrapper>

                <FieldWrapper label="Store" required className="text-sm">
                  <Select
                    value={purchaseFormData.storeId}
                    onChange={(e) => setPurchaseFormData(prev => ({ ...prev, storeId: e.target.value }))}
                    className="text-sm"
                  >
                    <option value="">Select Store</option>
                    {stores
                      .filter(s => !purchaseFormData.officeId || s.officeId === purchaseFormData.officeId)
                      .map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </Select>
                </FieldWrapper>

                <FieldWrapper label="User ID" required className="text-sm">
                  <Input value={user?.id || 'Loading...'} disabled className="text-sm py-2 bg-gray-50" />
                </FieldWrapper>

                <FieldWrapper label="Date & Time" required className="text-sm">
                  <Input value={new Date().toLocaleString()} disabled className="text-sm py-2 bg-gray-50" />
                </FieldWrapper>
              </div>

              {/* Item Selection */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FieldWrapper label="Item SKU / Name" required className="text-sm">
                    <Select
                      value={purchaseFormData.itemId}
                      onChange={(e) => {
                        const selected = items.find(i => i.id === e.target.value);
                        if (selected) {
                          setPurchaseFormData(prev => ({
                            ...prev,
                            itemId: selected.id,
                            itemSku: selected.sku,
                            itemName: selected.name,
                            unitOfMeasurement: selected.unitOfMeasurement
                          }));
                        }
                      }}
                      className="text-sm"
                    >
                      <option value="">Select Item</option>
                      {items.map(i => <option key={i.id} value={i.id}>{i.sku} - {i.name}</option>)}
                    </Select>
                  </FieldWrapper>

                  <FieldWrapper label="Unit of Measurement" required className="text-sm">
                    <Input value={purchaseFormData.unitOfMeasurement} disabled className="text-sm py-2 bg-gray-50" />
                  </FieldWrapper>
                </div>

                <FieldWrapper label="Quantity" required className="text-sm">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleQuantityChange(purchaseFormData.quantity - 1)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-semibold cursor-pointer">−</button>
                    <Input
                      type="number"
                      value={purchaseFormData.quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      className="text-sm py-2 text-center flex-1"
                    />
                    <button onClick={() => handleQuantityChange(purchaseFormData.quantity + 1)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-semibold cursor-pointer">+</button>
                  </div>
                </FieldWrapper>

                
              </div>

              {/* Review Details Table */}
              {purchaseRequestItems.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Review Details</h3>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-4 py-3 font-semibold text-gray-700">S. No.</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-700">Item SKU</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-700">Item Name</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-700">Unit</th>
                          <th className="text-left px-4 py-3 font-semibold text-gray-700">Quantity</th>
                          <th className="text-center px-4 py-3 font-semibold text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseRequestItems.map((item, index) => (
                          <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-700">{String(index + 1).padStart(2, '0')}</td>
                            <td className="px-4 py-3 text-gray-700">{item.itemSku}</td>
                            <td className="px-4 py-3 text-gray-700">{item.itemName}</td>
                            <td className="px-4 py-3 text-gray-700">{item.unitOfMeasurement}</td>
                            <td className="px-4 py-3 text-gray-700">{item.quantity}</td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="w-6 h-6 rounded bg-red-500 hover:bg-red-600 flex items-center justify-center text-white mx-auto"
                              >
                                ✕
                              </button>
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
                onClick={handleAddRequest}
                disabled={isSubmitting}
                className="w-40 py-3.5 bg-customBlue text-white hover:bg-customBlue/90 rounded-lg text-sm font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader size={16} className="animate-spin" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Validation Error Modal */}
      <ValidationErrorModal
        isOpen={showValidationError}
        onClose={() => setShowValidationError(false)}
        missingFields={validationErrors}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={() => setSuccessModal({ isOpen: false, message: '' })}
        title="Success"
        message={successModal.message}
      />
    </div>
  );
};

export default PurchaseRequestPage;