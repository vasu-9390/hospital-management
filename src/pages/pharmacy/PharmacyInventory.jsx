import React, { useState } from 'react';
import { useHMSData } from '../../context/DataContext';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { MedicineFormModal } from '../../components/forms/MedicineFormModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Pill, Plus, Edit3, Trash2, AlertTriangle } from 'lucide-react';

export const PharmacyInventory = () => {
  const { pharmacy, deletePharmacyItem } = useHMSData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const columns = [
    {
      header: 'Drug Name & Code',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.name}</p>
          <span className="text-[10px] text-slate-400 font-mono">{row.id}</span>
        </div>
      )
    },
    { header: 'Category', accessor: 'category' },
    {
      header: 'Available Stock',
      render: (row) => (
        <span
          className={`font-extrabold ${
            row.stock <= row.lowStockThreshold ? 'text-rose-600' : 'text-slate-900'
          }`}
        >
          {row.stock} units
        </span>
      )
    },
    {
      header: 'Unit Price',
      render: (row) => <span className="font-bold text-emerald-700">${row.unitPrice.toFixed(2)}</span>
    },
    { header: 'Expiry Date', accessor: 'expiryDate' },
    { header: 'Manufacturer', accessor: 'manufacturer' },
    {
      header: 'Stock Status',
      render: (row) => (
        <Badge variant={row.stock <= row.lowStockThreshold ? 'danger' : 'success'}>
          {row.stock <= row.lowStockThreshold ? 'Low Stock Alert' : 'In Stock'}
        </Badge>
      )
    }
  ];

  const handleActions = (row) => (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setEditingMed(row)}
        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
        title="Edit Inventory Item"
      >
        <Edit3 className="w-4 h-4" />
      </button>
      <button
        onClick={() => setDeletingId(row.id)}
        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
        title="Delete Medicine"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Pharmacy & Drug Inventory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pharmaceutical stock tracking, unit pricing, batch expiry dates, and critical low-stock alerts
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs shadow transition-all"
        >
          <Plus className="w-4 h-4" /> Add Pharmacy Item
        </button>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={pharmacy}
        searchPlaceholder="Search medicines by name, category, manufacturer..."
        actions={handleActions}
      />

      <MedicineFormModal
        isOpen={isAddModalOpen || !!editingMed}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingMed(null);
        }}
        initialData={editingMed}
      />

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => deletePharmacyItem(deletingId)}
        title="Delete Medicine Item"
        message="Are you sure you want to remove this item from the pharmacy inventory?"
      />
    </div>
  );
};
