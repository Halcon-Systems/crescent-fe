"use client";

import { useClientContext } from "@/context/clientContext";
import React, { useEffect, useState } from "react";
import { FiSearch, FiEye, FiEdit, FiTrash2, FiPlus, FiFilter } from "react-icons/fi";

// const dummyClients = Array.from({ length: 40 }, (_, i) => ({
//   id: i + 1,
//   irNo: `IR-${1000 + i}`,
//   name: `Client ${i + 1}`,
//   cnic: `12345-67890-${i}`,
//   cell: `0300-12345${i}`,
//   email: `client${i + 1}@example.com`,
//   vehicles: Math.floor(Math.random() * 5) + 1,
//   category: i % 2 === 0 ? "Gold" : "Silver",
//   activationDate: new Date().toLocaleDateString(),
//   dueBalance: (Math.random() * 1000).toFixed(2),
//   office: `Office ${i % 3 + 1}`,
// }));

const Clients = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [clients, setClients] = useState([]);

  const { openAddClientForm } = useClientContext();

  useEffect(() => {
    const dummyClients = Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      irNo: `IR-${1000 + i}`,
      name: `Client ${i + 1}`,
      cnic: `12345-67890-${i}`,
      cell: `0300-12345${i}`,
      email: `client${i + 1}@example.com`,
      vehicles: Math.floor(Math.random() * 5) + 1,
      category: i % 2 === 0 ? "Gold" : "Silver",
      activationDate: new Date().toLocaleDateString(),
      dueBalance: (Math.random() * 1000).toFixed(2),
      office: `Office ${i % 3 + 1}`,
    }));

    setClients(dummyClients);
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.irNo.toLowerCase().includes(search.toLowerCase()) ||
      client.cnic.includes(search)
  );

  const totalPages = Math.ceil(filteredClients.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentClients = filteredClients.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
      {/* Top Row: Search + Buttons */}
      <div className="flex justify-between items-center">
        {/* Search */}
        <div className="flex items-center gap-2 flex-1 max-w-md border border-gray-200 rounded-lg px-3 py-2">
          <FiSearch className="text-gray-900 w-5 h-5" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button onClick={openAddClientForm} className="flex items-center gap-1 bg-customBlue text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-customBlue/90 transition">
            <FiPlus />
            Add New
          </button>
          <button className="flex items-center gap-1 bg-white text-black border border-gray-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <FiFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-2">
                <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
              </th>
              <th className="p-2">IR No.</th>
              <th className="p-2">Client Name</th>
              <th className="p-2">CNIC No.</th>
              <th className="p-2">Cell No.</th>
              <th className="p-2">Email ID</th>
              <th className="p-2">No. of Vehicle</th>
              <th className="p-2">Client Category</th>
              <th className="p-2">Activation Date & Time</th>
              <th className="p-2">Due Balance (AMF)</th>
              <th className="p-2">Office</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client) => (
              <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">
                  <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
                </td>
                <td className="p-3">{client.irNo}</td>
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.cnic}</td>
                <td className="p-3">{client.cell}</td>
                <td className="p-3">{client.email}</td>
                <td className="p-3">{client.vehicles}</td>
                <td className="p-3">{client.category}</td>
                <td className="p-3">{client.activationDate}</td>
                <td className="p-3">{client.dueBalance}</td>
                <td className="p-3">{client.office}</td>
                <td className="p-3 flex items-center gap-2">
                  <button className="p-1 bg-yellow-400 text-gray-100 hover:bg-yellow-500 cursor-pointer rounded">
                    <FiEye />
                  </button>
                  <button className="p-1 bg-customBlue text-gray-100 hover:bg-blue-700 cursor-pointer rounded">
                    <FiEdit />
                  </button>
                  <button className="p-1 bg-red-600 text-gray-100 hover:bg-red-700 cursor-pointer rounded">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
        {/* Left: Page size */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Showing</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="text-gray-400">records</span>
        </div>

        {/* Center: Showing X to Y */}
        <div className="text-gray-400">
          Showing {startIndex + 1} to{" "}
          {endIndex > filteredClients.length
            ? filteredClients.length
            : endIndex}{" "}
          of {filteredClients.length} records
        </div>

        {/* Right: Pagination buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 py-1 rounded ${
                currentPage === i + 1
                  ? " text-customBlue border border-customBlue"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clients;
