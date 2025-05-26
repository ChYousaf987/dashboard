import React from "react";
import { FaShareAlt, FaCopy } from "react-icons/fa";

const stats = [
  { label: "Devices", value: "10 Devices Activated", icon: "📱" },
  { label: "Tracking", value: "45 clicks", icon: "📈" },
  { label: "Commission Earning", value: "4500", icon: "💸" },
  { label: "Estimated Payout", value: "4500", icon: "📤" },
];

const history = [
  { id: "79214204", date: "September 24, 2017", month: "Sep", amount: "$150.00" },
  { id: "79214078", date: "November 16, 2014", month: "Apr", amount: "$1,879.50" },
  { id: "79214066", date: "July 14, 2015", month: "Dec", amount: "$1,500.00" },
  { id: "79212231", date: "April 28, 2015", month: "Jul", amount: "$2,500.00" },
];

const AffiliateProgram = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen text-sm absolute top-20 right-0 w-[80%] px-10">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-semibold">Affiliate Program</h2>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-checked:bg-green-500 rounded-full peer relative after:absolute after:content-[''] after:w-5 after:h-5 after:bg-white after:rounded-full after:left-1 after:top-0.5 after:transition-all peer-checked:after:translate-x-full" />
        </label>
      </div>

      {/* YouTube + Link */}
      <div className="mb-6">
        <label className="block font-medium mb-1">YouTube Video Intro</label>
        <div className="flex items-center border border-black rounded-full px-3 py-2 bg-white">
          <input
            type="text"
            value="www.kuicktag.com/?ref=affiliate123"
            readOnly
            className="flex-1 outline-none rounded-full"
          />
          <button className="ml-2 text-gray-600">
            <FaShareAlt />
          </button>
          <button className="ml-2 text-gray-600">
            <FaCopy />
          </button>
        </div>
      </div>

      {/* Commission & Sales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-1">
            Default Commission Rate (%)
          </label>
          <input
            type="text"
            className="w-full border border-black rounded-full p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Set Average Sales Value
          </label>
          <input
            type="text"
            className="w-full border border-black rounded-full p-2"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6 justify-center">
        <button className="bg-black text-white px-6 py-3 rounded-full w-[40%]">
          cancel
        </button>
        <button className="border border-black px-6 py-3 rounded-full w-[40%]">
          Save
        </button>
      </div>

      {/* Stats */}
      <h3 className="text-lg font-semibold mb-2">Affiliate Stats & Income</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500">{s.label}</p>
              <p className="font-semibold">{s.value}</p>
            </div>
            <span className="text-2xl">{s.icon}</span>
          </div>
        ))}
      </div>

      {/* Payout */}
      <h3 className="text-lg font-semibold mb-2">Affiliate Payout</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1">Estimated Payout</label>
          <input
            type="text"
            value="$3,500"
            className="w-full border border-black rounded-full p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Paid Amount</label>
          <input
            type="text"
            className="w-full border border-black rounded-full p-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Remaining Payout</label>
          <input
            type="text"
            className="w-full border border-black rounded-full p-2"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-6 justify-center">
        <button className="bg-black text-white px-6 py-3 rounded-full w-[40%]">
          cancel
        </button>
        <button className="border border-black px-6 py-3 rounded-full w-[40%]">
          Save
        </button>
      </div>

      {/* History */}
      <h3 className="text-lg font-semibold mb-2">PAYOUT HISTORY</h3>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-left border-t">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Transaction ID</th>
              <th className="p-3">Date of Disbursement</th>
              <th className="p-3">PAYOUT MONTH</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{h.id}</td>
                <td className="p-3">{h.date}</td>
                <td className="p-3">{h.month}</td>
                <td className="p-3">{h.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 my-3 mx-3">
          <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md">
            Previous
          </button>
          <div className="flex space-x-1">
            {[1, 2, 3, "...", 8, 9, 10].map((page, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded-md ${
                  page === 1
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;
