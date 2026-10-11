import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useHMSData } from '../../context/DataContext';
import { Plus, Trash2 } from 'lucide-react';

export const CreateBillModal = ({ isOpen, onClose }) => {
  const { patients, doctors, createBill } = useHMSData();

  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || '');
  const [paymentStatus, setPaymentStatus] = useState('Paid');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [discount, setDiscount] = useState(0);

  const [items, setItems] = useState([
    { description: 'Specialist Consultation Fee', category: 'Consultation', amount: 150 },
    { description: 'Diagnostic Blood Profile', category: 'Lab/Test', amount: 75 }
  ]);

  const handleAddItem = () => {
    setItems([...items, { description: 'Pharmacy Medication', category: 'Medicine', amount: 40 }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === 'amount' ? parseFloat(value) || 0 : value;
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Math.max(0, Number((subtotal + tax - (parseFloat(discount) || 0)).toFixed(2)));

  const handleSubmit = (e) => {
    e.preventDefault();
    const selPat = patients.find((p) => p.id === patientId) || patients[0];
    const selDoc = doctors.find((d) => d.id === doctorId) || doctors[0];

    createBill({
      patientId: selPat.id,
      patientName: selPat.fullName,
      doctorName: selDoc.fullName,
      items,
      subtotal,
      tax,
      discount: parseFloat(discount) || 0,
      total,
      paymentStatus,
      paymentMethod: paymentStatus === 'Paid' ? paymentMethod : 'Pending'
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate New Patient Invoice" maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Patient *</label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            >
              {patients.map((pat) => (
                <option key={pat.id} value={pat.id}>{pat.fullName} ({pat.id})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Attending Doctor *</label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>{doc.fullName} ({doc.department})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Billable Line Items */}
        <div className="border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Billable Items & Services</h4>
            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center gap-1 text-primary-600 font-bold hover:text-primary-700"
            >
              <Plus className="w-4 h-4" /> Add Item Line
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                  placeholder="Service description"
                  className="flex-2 px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white w-full"
                />
                <select
                  value={item.category}
                  onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
                  className="px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Lab/Test">Lab/Test</option>
                  <option value="Procedure">Procedure</option>
                  <option value="Other">Other</option>
                </select>
                <div className="flex items-center gap-1 w-28">
                  <span className="text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.amount}
                    onChange={(e) => handleItemChange(idx, 'amount', e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded-lg bg-white font-bold text-right"
                  />
                </div>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(idx)}
                    className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Calculation & Payment Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-slate-100">
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Payment Status *</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 font-medium"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            {paymentStatus === 'Paid' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Method *</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 font-medium"
                >
                  <option value="Card">Credit/Debit Card</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI Transfer</option>
                  <option value="Online">Online Banking</option>
                </select>
              </div>
            )}
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated Tax (5%):</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Discount Amount ($):</span>
              <input
                type="number"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-24 px-2 py-1 border border-slate-300 rounded text-right font-semibold bg-white"
              />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
              <span>Grand Total:</span>
              <span className="text-base text-primary-700">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow transition-colors"
          >
            Generate & Issue Invoice
          </button>
        </div>
      </form>
    </Modal>
  );
};
