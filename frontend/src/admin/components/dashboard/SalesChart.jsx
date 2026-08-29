import { useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { salesChartData } from "../../constants/dashboardData";

const periods = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-coffee-dark text-coffee-cream px-3 py-2 rounded-lg shadow-lg">
        <p className="font-body text-xs font-semibold">{label}</p>
        <p className="font-body text-xs text-coffee-accent">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  const [period, setPeriod] = useState("daily");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-coffee-dark/5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
            Sales Overview
          </h3>
          <p className="font-body text-xs text-coffee-dark/50 mt-0.5">
            Revenue trend over time
          </p>
        </div>
        <div className="flex items-center gap-1 bg-coffee-cream rounded-full p-1 w-fit">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-3.5 py-1.5 rounded-full font-body text-xs font-semibold transition-colors ${
                period === p.key
                  ? "bg-coffee-dark text-coffee-cream"
                  : "text-coffee-dark/60 hover:text-coffee-dark"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesChartData[period]}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5A2B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5A2B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1E1E1E10"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#1E1E1E80" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#1E1E1E80" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#8B5A2B"
              strokeWidth={2.5}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesChart;
