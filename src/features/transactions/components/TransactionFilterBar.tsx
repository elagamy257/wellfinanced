'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface TransactionFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export function TransactionFilterBar({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus
}: TransactionFilterBarProps) {
  return (
    <div className="p-5 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full md:max-w-xs">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Search ledger..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-white/5 hover:bg-white/8 focus:bg-bg-2 border border-white/5 focus:border-primary/20 text-xs font-bold text-white placeholder-slate-400 rounded-xl outline-none transition-all"
        />
      </div>

      {/* Dropdown Filters */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="h-11 px-4 bg-white/5 border border-white/5 text-xs text-slate-300 font-bold rounded-xl outline-none focus:border-primary/20 cursor-pointer hover:bg-white/8 transition-all"
        >
          <option value="all" className="bg-bg-2">All Types</option>
          <option value="income" className="bg-bg-2">Income</option>
          <option value="expense" className="bg-bg-2">Expenses</option>
          <option value="debt" className="bg-bg-2">Debt</option>
        </select>

        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="h-11 px-4 bg-white/5 border border-white/5 text-xs text-slate-300 font-bold rounded-xl outline-none focus:border-primary/20 cursor-pointer hover:bg-white/8 transition-all"
        >
          <option value="all" className="bg-bg-2">All Statuses</option>
          <option value="cleared" className="bg-bg-2">Cleared</option>
          <option value="pending" className="bg-bg-2">Pending</option>
        </select>
      </div>
    </div>
  );
}
