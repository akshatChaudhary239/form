'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    propertySize: '',
    saleAmount: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sale-deed.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('PDF generation failed.');
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-white shadow-xl rounded-2xl w-full max-w-md md:max-w-xl p-6 md:p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-600 text-center mb-8">
          🖨️ Sale Deed PDF Generator
        </h1>

        <div className="space-y-4">
          {[
            { label: 'Full Name', name: 'fullName' },
            { label: "Father's Name", name: 'fatherName' },
            { label: 'Property Size (sq.ft)', name: 'propertySize' },
            { label: 'Sale Amount (₹)', name: 'saleAmount' },
          ].map((field) => (
            <motion.input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.label}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              onChange={handleChange}
              whileFocus={{ scale: 1.02 }}
            />
          ))}

          <motion.input
            type="date"
            name="date"
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            onChange={handleChange}
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <motion.button
          onClick={handleDownload}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Generate Pdf
        </motion.button>
      </motion.div>
    </main>
  );
}
