import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaBuilding } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaCommentsDollar } from "react-icons/fa";
import { BsFileBarGraphFill } from "react-icons/bs";

const cardData = [
  {
    title: "Total Companies",
    value: "5000",
    icon: <FaBuilding className="text-[#F58852]" />,
    bg: "bg-orange-100",
  },
  {
    title: "Total Customers",
    value: "5000",
    icon: <MdPeopleAlt className="text-[#F58852]" />,
    bg: "bg-orange-100",
  },
  {
    title: "Active Companies",
    value: "5000",
    icon: <FaBuilding className="text-[#F58852]" />,
    bg: "bg-orange-100",
  },
  {
    title: "Active Customers",
    value: "5000",
    icon: <MdPeopleAlt className="text-[#F58852]" />,
    bg: "bg-orange-100",
  },
];

const affiliateCards = [
  {
    title: "Total Active Affiliates",
    value: "5000",
    icon: <FaCommentsDollar className="text-[#34A853]" />,
  },
  {
    title: "Affiliate Payouts",
    value: "5000",
    icon: <AiFillDollarCircle className="text-[#34A853]" />,
  },
  {
    title: "Sales In Value",
    value: "5000",
    icon: <BsFileBarGraphFill className="text-[#34A853]" />,
  },
];

const activeCustomerData = [
  { month: "Oct", value1: 154, value2: 50 },
  { month: "Jan", value1: 453, value2: 60 },
  { month: "Jul", value1: 883, value2: 70 },
  { month: "Nov", value1: 185, value2: 50 },
  { month: "Feb", value1: 130, value2: 40 },
  { month: "Oct", value1: 447, value2: 55 },
  { month: "Feb", value1: 703, value2: 45 },
];

const activeCustomerDatas = [
  { month: "Oct", value1: 154, value2: 50 },
  { month: "Jan", value1: 453, value2: 60 },
  { month: "Jul", value1: 883, value2: 70 },
  { month: "Nov", value1: 185, value2: 50 },
  { month: "Feb", value1: 130, value2: 40 },
  { value1: 447, value2: 55 },
  { value1: 703, value2: 45 },
];

const Card = ({ title, value, icon, bg }) => (
  <div className="w-[45%] bg-white p-5 rounded-xl shadow-lg">
    <div className="flex justify-between gap-2 items-center">
      <h3 className="text-gray-500 text-lg font-medium">{title}</h3>
      <div className={`p-3 rounded-xl bg-[#FDF1EB] text-lg`}>{icon}</div>
    </div>
    <p className="text-indigo-900 font-semibold text-xl mt-3">{value}</p>
  </div>
);

// Affiliate-style cards
const AffiliateCard = ({ title, value, icon }) => (
  <div className="w-[30%] bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
    <div className="flex justify-end ">
      <div className="w-16 h-16 flex items-center justify-center bg-green-200 rounded-3xl text-white text-2xl">
        {icon}
      </div>
    </div>
    <div className="flex items-start gap-3">
      <div>
        <p className="text-gray-500 w-[70%] font-semibold mt-4 text-xl">
          {title}
        </p>
        <p className="text-indigo-900 flex items-end font-semibold text-base mt-3">
          {value}
        </p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="absolute top-20 right-0 bg-[#FAFAFA] w-[80%] float-right">
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="w-full flex gap-5">
          {/* Company Cards */}
          <div className="w-[60%] flex flex-wrap gap-4">
            {cardData.map((card, idx) => (
              <Card key={idx} {...card} />
            ))}
          </div>

          {/* Active Customers Chart */}
          <div className="w-[40%] flex flex-col gap-10">
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <h2 className="font-semibold text-gray-700">Active Customer</h2>
                <select className="text-sm bg-transparent text-gray-600">
                  <option>Month</option>
                </select>
              </div>
              <div className="flex items-start">
                <div className="flex flex-col justify-between h-[200px] pr-2 mt-5">
                  {activeCustomerData.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-500 h-[24px] flex items-center"
                    >
                      {item.month}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={activeCustomerData}
                      barCategoryGap="30%"
                      margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
                    >
                      <XAxis hide />
                      <YAxis hide />
                      <Tooltip cursor={{ fill: "transparent" }} />
                      <Bar dataKey="value1" stackId="a" fill="#FF5722" />
                      <Bar
                        dataKey="value2"
                        stackId="a"
                        fill="#1C1C1C"
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    {activeCustomerData.map((item, idx) => (
                      <span key={idx}>{item.value1 + item.value2}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-5">
          {/* Affiliate Cards Below */}
          <div className="w-[60%] flex flex-wrap mt-10 gap-4">
            {affiliateCards.map((card, idx) => (
              <AffiliateCard key={idx} {...card} />
            ))}
          </div>

          <div className="w-[40%] flex flex-col gap-10">
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <h2 className="font-semibold text-gray-700">Active Customer</h2>
                <select className="text-sm bg-transparent text-gray-600">
                  <option>Month</option>
                </select>
              </div>
              <div className="flex items-start">
                <div className="flex flex-col justify-between h-[150px] pr-2 mt-5">
                  {activeCustomerDatas.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-500  flex items-center"
                    >
                      {item.month}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart
                      data={activeCustomerDatas}
                      barCategoryGap="30%"
                      margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
                    >
                      <XAxis hide />
                      <YAxis hide />
                      <Tooltip cursor={{ fill: "transparent" }} />
                      <Bar dataKey="value1" stackId="a" fill="#34A853" />
                      <Bar
                        dataKey="value2"
                        stackId="a"
                        fill="#2D2D2D"
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    {activeCustomerDatas.map((item, idx) => (
                      <span key={idx}>{item.value1 + item.value2}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
