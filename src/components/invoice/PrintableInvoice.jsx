import React from 'react';
import { Printer, Activity } from 'lucide-react';
import { Modal } from '../common/Modal';

export const PrintableInvoice = ({ isOpen, onClose, bill }) => {
  if (!bill) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Invoice Details - ${bill.id}`} maxWidth="max-w-3xl">
      <div className="flex justify-end mb-4 no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium text-xs shadow transition-all"
        >
          <Printer className="w-4 h-4" />
          Print / Save PDF
        </button>
      </div>

      <div className="printable-area p-8 bg-white rounded-xl border border-slate-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary-600 text-white rounded-xl">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">CarePulse Medical Center</h2>
              <p className="text-xs text-slate-500">742 Evergreen Terrace, Health District</p>
              <p className="text-xs text-slate-500">Phone: +1 (800) 555-CARE | billing@carepulse.org</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-lg border border-primary-200 uppercase tracking-widest mb-1">
              INVOICE
            </span>
            <h3 className="text-sm font-bold text-slate-800">{bill.id}</h3>
            <p className="text-xs text-slate-500">Date: {bill.date}</p>
          </div>
        </div>

        {/* Patient & Doctor info */}
        <div className="grid grid-cols-2 gap-6 my-6 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">Billed To:</p>
            <p className="font-bold text-slate-900 text-sm">{bill.patientName}</p>
            <p className="text-slate-600">ID: {bill.patientId}</p>
            <p className="text-slate-600">Status: <span className="font-semibold text-emerald-600">{bill.paymentStatus}</span></p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">Attending Physician:</p>
            <p className="font-bold text-slate-900 text-sm">{bill.doctorName}</p>
            <p className="text-slate-600">Payment Method: {bill.paymentMethod || 'N/A'}</p>
          </div>
        </div>

        {/* Line Items Table */}
        <table className="w-full text-left text-xs mb-6">
          <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
            <tr>
              <th className="py-3 px-4 rounded-l-lg">Item / Service Description</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4 text-right rounded-r-lg">Amount ($)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bill.items?.map((item, idx) => (
              <tr key={idx}>
                <td className="py-3 px-4 font-medium text-slate-800">{item.description}</td>
                <td className="py-3 px-4 text-slate-500">{item.category}</td>
                <td className="py-3 px-4 text-right font-bold text-slate-800">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold">${(bill.subtotal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (5%):</span>
              <span className="font-semibold">${(bill.tax || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Discount:</span>
              <span className="font-semibold text-rose-600">-${(bill.discount || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Payable:</span>
              <span className="text-primary-700">${(bill.total || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-100 text-center text-[11px] text-slate-400">
          <p className="font-semibold">Thank you for choosing CarePulse Medical Center!</p>
          <p>This is a computer-generated invoice. For queries, contact support@carepulse.org</p>
        </div>
      </div>
    </Modal>
  );
};
