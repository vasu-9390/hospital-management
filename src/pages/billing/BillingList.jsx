import React, { useState } from 'react';
import { useHMSData } from '../../context/DataContext';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { CreateBillModal } from '../../components/forms/CreateBillModal';
import { PrintableInvoice } from '../../components/invoice/PrintableInvoice';
import { Receipt, Plus, Printer, CheckCircle } from 'lucide-react';

export const BillingList = () => {
  const { bills, updateBillStatus } = useHMSData();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const columns = [
    {
      header: 'Invoice ID & Date',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.id}</p>
          <span className="text-[10px] text-slate-400 font-mono">{row.date}</span>
        </div>
      )
    },
    {
      header: 'Patient Billed',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.patientName}</p>
          <span className="text-[10px] text-slate-500">ID: {row.patientId}</span>
        </div>
      )
    },
    { header: 'Attending Physician', accessor: 'doctorName' },
    {
      header: 'Amount ($)',
      render: (row) => <span className="font-extrabold text-primary-700">${row.total.toFixed(2)}</span>
    },
    {
      header: 'Payment Status',
      render: (row) => (
        <Badge variant={row.paymentStatus === 'Paid' ? 'success' : row.paymentStatus === 'Pending' ? 'warning' : 'danger'}>
          {row.paymentStatus}
        </Badge>
      )
    }
  ];

  const handleActions = (row) => (
    <div className="flex items-center gap-1.5">
      {row.paymentStatus !== 'Paid' && (
        <button
          onClick={() => updateBillStatus(row.id, 'Paid', 'Cash')}
          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-lg border border-emerald-200 text-xs flex items-center gap-1"
          title="Mark as Paid"
        >
          <CheckCircle className="w-3.5 h-3.5" /> Mark Paid
        </button>
      )}
      <button
        onClick={() => setSelectedBill(row)}
        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center gap-1"
      >
        <Printer className="w-3.5 h-3.5" /> Invoice
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Billing & Invoice Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Itemized hospital bills, consultation charges, lab fee calculations, and invoice printing
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-xs shadow transition-all"
        >
          <Plus className="w-4 h-4" /> Create Patient Invoice
        </button>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={bills}
        searchPlaceholder="Search invoices by patient, doctor, status..."
        filterKey="paymentStatus"
        filterOptions={['Paid', 'Pending', 'Unpaid']}
        actions={handleActions}
      />

      <CreateBillModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <PrintableInvoice isOpen={!!selectedBill} onClose={() => setSelectedBill(null)} bill={selectedBill} />
    </div>
  );
};
