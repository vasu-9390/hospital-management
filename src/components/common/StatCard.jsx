import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, value, change, isIncrease, icon: Icon, color = 'blue' }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${colorMap[color] || colorMap.blue}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
      {change && (
        <div className="mt-3 flex items-center text-xs font-medium">
          {isIncrease ? (
            <span className="flex items-center text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              +{change}
            </span>
          ) : (
            <span className="flex items-center text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">
              <TrendingDown className="w-3.5 h-3.5 mr-1" />
              -{change}
            </span>
          )}
          <span className="text-slate-500 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
};
