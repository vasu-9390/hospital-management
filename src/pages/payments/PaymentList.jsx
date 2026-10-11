import React from 'react';
import { useHMSData } from '../../context/DataContext';
import { DataTable } from '../../components/common/DataTable';
import { Badge } from '../../components/common/Badge';
import { CreditCard } from 'lucide-react';

export const PaymentList = () => {
  const { payments } = useHMSData();

  const columns = [
    {
      header: 'Payment ID & Date',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900">{row.paymentId}</p>
          <span className="text-[10px] text-slate-400 font-mono">{row.paymentDate}</span>
        </div>
      )
    },
    { header: 'Patient Name', accessor: 'patientName' },
    {
      header: 'Associated Invoice',
      render: (row) => <span className="font-bold text-primary-700">{row.billId}</span>
    },
    {
      header: 'Amount Paid',
      render: (row) => <span className="font-black text-emerald-700">${row.amount.toFixed(2)}</span>
    },
    {
      header: 'Payment Method',
      render: (row) => (
        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
          {row.paymentMethod}
        </span>
      )
    },
    {
      header: 'Status',
      render: (row) => <Badge variant="success">{row.paymentStatus}</Badge>
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Payment Transactions Log</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit logs for completed payments via Cash, Credit Card, UPI, and Online Banking
          </p>
        </div>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={payments}
        searchPlaceholder="Search payments by patient, invoice ID, method..."
        filterKey="paymentMethod"
        filterOptions={['Card', 'Cash', 'UPI', 'Online']}
      />
    </div>
  );
};
