'use client';
import { useEffect, useMemo, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoicePDF } from '@/app/ui/InvoicePDF';

interface Order {
  orderId: string;
  medicineName: string;
  hospitalName: string;
  quantity: number;
  manufacturerStatus: string;
}

interface Invoice {
  invoiceNumber: string;
  generatedAt: string;
  vendor: { name: string; email: string };
  order: {
    orderId: string;
    hospital: string;
    medicineName: string;
    quantity: number;
    pricePerUnit: number;
    total: number;
  };
}

const ITEMS_PER_PAGE = 10;

export default function VendorInvoicesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoiceMap, setInvoiceMap] = useState<{ [orderId: string]: Invoice }>({});
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Order>('orderId');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetch('/api/vendor-invoice')
      .then(res => res.json())
      .then(data => setOrders(data.reverse()))
      .catch(() => setError('Failed to load orders.'));

    const saved = localStorage.getItem('generatedInvoices');
    if (saved) {
      setInvoiceMap(JSON.parse(saved));
    }
  }, []);

  const handleGenerateInvoice = async (orderId: string) => {
    setError('');
    try {
      const res = await fetch(`/api/vendor-invoice/${orderId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const updatedMap = { ...invoiceMap, [orderId]: data };
      setInvoiceMap(updatedMap);
      localStorage.setItem('generatedInvoices', JSON.stringify(updatedMap));
    } catch (err: any) {
      setError(err.message || 'Error generating invoice.');
    }
  };

  const filteredOrders = useMemo(() => {
    return orders
      .filter(
        o =>
          o.medicineName.toLowerCase().includes(search.toLowerCase()) ||
          o.hospitalName.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (typeof aVal === 'string') {
          return sortOrder === 'asc'
            ? aVal.localeCompare(bVal as string)
            : (bVal as string).localeCompare(aVal);
        }
        return sortOrder === 'asc'
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      });
  }, [orders, search, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4"> Orders Invoice</h1>

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search medicine or hospital..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                {['orderId', 'medicineName', 'hospitalName', 'quantity'].map((field, idx) => (
                  <th
                    key={idx}
                    className="p-3 cursor-pointer select-none"
                    onClick={() => handleSort(field as keyof Order)}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}{' '}
                    {sortField === field && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                ))}
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedOrders.map(o => (
                <tr key={o.orderId} className="hover:bg-gray-50 transition duration-200">
                  <td className="p-3">{o.orderId}</td>
                  <td className="p-3">{o.medicineName}</td>
                  <td className="p-3">{o.hospitalName}</td>
                  <td className="p-3">{o.quantity}</td>
                  <td className="p-3 text-center">
                    {invoiceMap[o.orderId] ? (
                      <PDFDownloadLink
                        document={<InvoicePDF invoice={invoiceMap[o.orderId]} />}
                        fileName={`${invoiceMap[o.orderId].invoiceNumber}.pdf`}
                        className="inline-block px-4 py-1 text-white bg-green-600 hover:bg-green-700 rounded shadow transition"
                      >
                        Download PDF
                      </PDFDownloadLink>
                    ) : (
                      <button
                        onClick={() => handleGenerateInvoice(o.orderId)}
                        className="inline-block px-4 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded shadow transition"
                      >
                        Generate Invoice
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
