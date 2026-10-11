import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useHMSData } from '../../context/DataContext';

export const MedicineFormModal = ({ isOpen, onClose, initialData = null }) => {
  const { addPharmacyItem, updatePharmacyItem } = useHMSData();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Analgesic / Antipyretic',
    stock: 100,
    unitPrice: 5.00,
    expiryDate: '2027-12-31',
    manufacturer: 'PharmaCare Global',
    lowStockThreshold: 30
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        category: 'Analgesic / Antipyretic',
        stock: 100,
        unitPrice: 5.00,
        expiryDate: '2027-12-31',
        manufacturer: 'PharmaCare Global',
        lowStockThreshold: 30
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updatePharmacyItem(initialData.id, formData);
    } else {
      addPharmacyItem(formData);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Pharmacy Item' : 'Add New Medicine Item'}>
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Medicine Name & Dose *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Paracetamol 650mg, Amoxicillin 500mg"
            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Drug Category *</label>
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Antibiotic, Cardiovascular"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Manufacturer *</label>
            <input
              type="text"
              name="manufacturer"
              required
              value={formData.manufacturer}
              onChange={handleChange}
              placeholder="Manufacturer company name"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Available Stock Count *</label>
            <input
              type="number"
              name="stock"
              min="0"
              required
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Low-Stock Alert Threshold *</label>
            <input
              type="number"
              name="lowStockThreshold"
              min="1"
              required
              value={formData.lowStockThreshold}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Unit Price ($) *</label>
            <input
              type="number"
              step="0.01"
              name="unitPrice"
              min="0"
              required
              value={formData.unitPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Batch Expiry Date *</label>
            <input
              type="date"
              name="expiryDate"
              required
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 focus:outline-none"
            />
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
            {initialData ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
