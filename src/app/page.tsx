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
      alert('Error generating PDF. Check console.');
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center mb-6 text-indigo-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sale PDF Generator
        </motion.h1>

        <div className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="propertySize"
            placeholder="Property Size (sq.ft)"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            name="saleAmount"
            placeholder="Sale Amount (₹)"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="date"
            name="date"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold transition hover:bg-indigo-700"
        >
          🖨️ Generate
        </motion.button>
      </motion.div>
    </main>
  );
}
