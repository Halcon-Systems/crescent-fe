"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useEmployees } from "@/hooks/employee/useEmployees";
import { useCreateEmployee } from "@/hooks/employee/useCreateEmployee";
import { useUpdateEmployee } from "@/hooks/employee/useUpdateEmployee";
import { useDeleteEmployee } from "@/hooks/employee/useDeleteEmployee";
import FieldWrapper from "@/components/ui/FieldWrapper";
import Input from "@/components/ui/Input";
import FormActions from "../components/FormActions";
import SearchList from "../components/SearchList";
import EditModal from "../components/EditModal";
import ViewModal from "../components/ViewModal";

const EmployeeTabContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [emailId, setEmailId] = useState("");
  const [primaryMobileNo, setPrimaryMobileNo] = useState("");
  const [cnic, setCnic] = useState("");
  const [designation, setDesignation] = useState("");
  const [nextOfKin, setNextOfKin] = useState("");
  const [nextOfKinContact, setNextOfKinContact] = useState("");
  const [editEmailId, setEditEmailId] = useState("");
  const [editPrimaryMobileNo, setEditPrimaryMobileNo] = useState("");
  const [editCnic, setEditCnic] = useState("");
  const [editDesignation, setEditDesignation] = useState("");
  const [editNextOfKin, setEditNextOfKin] = useState("");
  const [editNextOfKinContact, setEditNextOfKinContact] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [localEmployees, setLocalEmployees] = useState([]);

  const { data, isLoading, error, isFetching, isPending, refetch } =
    useEmployees();

  const { mutate: deleteEmployee } = useDeleteEmployee({
    onSuccess: () => refetch(),
  });

  const {
    mutate: updateEmployee,
    isPending: isUpdating,
    error: updateError,
    reset: resetUpdateError,
  } = useUpdateEmployee({
    onSuccess: () => {
      resetForm();
      setShowEditModal(false);
      refetch();
    },
  });

  const { mutate: toggleStatus } = useUpdateEmployee();

  const { mutate: createEmployee, isPending: isCreating } = useCreateEmployee({
    onSuccess: () => {
      resetForm();
      refetch();
    },
  });

  // Sync localEmployees with data whenever data changes
  useEffect(() => {
    if (!isLoading && !error && data) {
      const mapped = data.map((employee) => ({
        id: employee.employeeId,
        name: employee.emailId,
        email: employee.emailId,
        mobile: employee.primaryMobileNo,
        designation: employee.designation,
        isActive: employee.isActive,
      }));
      setLocalEmployees(mapped);
    }
  }, [data, isLoading, error]);

  const employees = useMemo(() => {
    if (isLoading || error) return [];
    return localEmployees;
  }, [localEmployees, isLoading, error]);

  const resetForm = () => {
    setEmailId("");
    setPrimaryMobileNo("");
    setCnic("");
    setDesignation("");
    setNextOfKin("");
    setNextOfKinContact("");
    setSelectedEmployee(null);
  };

  const resetEditForm = () => {
    setEditEmailId("");
    setEditPrimaryMobileNo("");
    setEditCnic("");
    setEditDesignation("");
    setEditNextOfKin("");
    setEditNextOfKinContact("");
  };

  const handleCreateEmployee = () => {
    if (!emailId.trim() || !primaryMobileNo.trim()) return;
    createEmployee({
      emailId,
      primaryMobileNo,
      cnic,
      designation,
      nextOfKin,
      nextOfKinContact,
      isActive: true,
    });
  };

  const handleDeleteEmployee = (itemName, index) => {
    if (employees[index]?.id) {
      deleteEmployee(employees[index].id);
    }
  };

  const handleEditEmployee = (item) => {
    setSelectedEmployee(item);
    setEditEmailId(item.email || "");
    setEditPrimaryMobileNo(item.mobile || "");
    const employeeData = data?.find((e) => e.employeeId === item.id);
    setEditCnic(employeeData?.cnic || "");
    setEditDesignation(item.designation || "");
    setEditNextOfKin(employeeData?.nextOfKin || "");
    setEditNextOfKinContact(employeeData?.nextOfKinContact || "");
    setShowEditModal(true);
  };

  const handleUpdateEmployee = (onSuccess) => {
    if (!editEmailId.trim() || !selectedEmployee) return;
    updateEmployee(
      {
        id: selectedEmployee.id,
        payload: {
          emailId: editEmailId,
          primaryMobileNo: editPrimaryMobileNo,
          cnic: editCnic,
          designation: editDesignation,
          nextOfKin: editNextOfKin,
          nextOfKinContact: editNextOfKinContact,
        },
      },
      { onSuccess }
    );
  };

  const handleToggleEmployee = (item) => {
    if (item?.id) {
      setLocalEmployees((prev) =>
        prev.map((employee) =>
          employee.id === item.id ? { ...employee, isActive: !employee.isActive } : employee
        )
      );
      toggleStatus({ id: item.id, payload: { isActive: !item.isActive } });
    }
  };

  const handleViewEmployee = (item) => {
    setViewItem(item);
    setShowViewModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    resetEditForm();
    resetUpdateError?.();
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setViewItem(null);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* SECTION 1: Add Employee */}
      <div className="pb-6 md:pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
          Add Employee
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <FieldWrapper label="Email" className="text-sm">
              <Input
                placeholder="Enter email"
                className="text-sm py-2"
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Primary Mobile No" className="text-sm">
              <Input
                placeholder="Enter mobile number"
                className="text-sm py-2"
                value={primaryMobileNo}
                onChange={(e) => setPrimaryMobileNo(e.target.value)}
              />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="CNIC" className="text-sm">
              <Input
                placeholder="e.g., 35202-1234567-1"
                className="text-sm py-2"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
              />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Designation" className="text-sm">
              <Input
                placeholder="Enter designation"
                className="text-sm py-2"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Next of Kin" className="text-sm">
              <Input
                placeholder="Enter next of kin name"
                className="text-sm py-2"
                value={nextOfKin}
                onChange={(e) => setNextOfKin(e.target.value)}
              />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Next of Kin Contact" className="text-sm">
              <Input
                placeholder="Enter contact number"
                className="text-sm py-2"
                value={nextOfKinContact}
                onChange={(e) => setNextOfKinContact(e.target.value)}
              />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Employee ID" className="text-sm">
              <Input
                value="Auto"
                readOnly
                className="text-sm py-2 bg-gray-50"
                placeholder="Auto"
              />
            </FieldWrapper>
          </div>
        </div>

        <FormActions
          onSave={handleCreateEmployee}
          tabName="Employee"
        />
      </div>

      {/* SECTION 2: Search Item */}
      <div className="pb-6 md:pb-8">
        <SearchList
          isLoading={isLoading || isFetching || isPending}
          error={error?.message}
          items={employees}
          showView={true}
          showEdit={true}
          showDelete={true}
          showToggle={true}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onView={handleViewEmployee}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onToggle={handleToggleEmployee}
          tabName="Employee"
        />
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={showEditModal}
        selectedItem={selectedEmployee}
        onUpdate={handleUpdateEmployee}
        onClose={handleCloseEditModal}
        isUpdating={isUpdating}
        error={updateError?.message}
        title="Edit Employee"
        itemType="employee"
        fields={[
          { label: "Email", value: editEmailId, onChange: setEditEmailId },
          { label: "Primary Mobile No", value: editPrimaryMobileNo, onChange: setEditPrimaryMobileNo },
          { label: "CNIC", value: editCnic, onChange: setEditCnic },
          { label: "Designation", value: editDesignation, onChange: setEditDesignation },
          { label: "Next of Kin", value: editNextOfKin, onChange: setEditNextOfKin },
          { label: "Next of Kin Contact", value: editNextOfKinContact, onChange: setEditNextOfKinContact },
        ]}
      />

      {/* View Modal */}
      <ViewModal
        isOpen={showViewModal}
        item={viewItem}
        onClose={handleCloseViewModal}
        title="Employee Details"
        fields={[
          { key: "id", label: "Employee ID" },
          { key: "email", label: "Email" },
          { key: "mobile", label: "Primary Mobile" },
          { key: "designation", label: "Designation" },
          {
            key: "isActive",
            label: "Status",
            render: (value) => (value ? "Active" : "Inactive"),
          },
        ]}
      />
    </div>
  );
};

export default EmployeeTabContent;
