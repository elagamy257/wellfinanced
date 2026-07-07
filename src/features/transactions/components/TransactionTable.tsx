'use client';

import React from 'react';
import { Badge } from '@/components/ui';
import { Tag, Trash2 } from 'lucide-react';
import { TransactionItem } from '../mocks';

interface TransactionTableProps {
  transactions: TransactionItem[];
  onDelete: (id: string) => void;
}

export function TransactionTable({ transactions, onDelete }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse text-xs select-none">
        <thead>
          <tr className="border-b border-white/5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
            <th className="p-5 font-bold">Source / Payee</th>
            <th className="p-5 font-bold">Date</th>
            <th className="p-5 font-bold">Category</th>
            <th className="p-5 font-bold text-right">Amount</th>
            <th className="p-5 font-bold text-center">Status</th>
            <th className="p-5 font-bold text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-10 text-center text-slate-400 font-medium leading-relaxed">
                No transactions match the selected filters.
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-white/2 transition-colors duration-150">
                <td className="p-5 font-bold text-white min-w-[200px]">
                  {tx.source}
                  {tx.notes && (
                    <span className="text-[10px] font-normal text-slate-400 block mt-1 leading-normal italic">
                      Note: {tx.notes}
                    </span>
                  )}
                </td>
                <td className="p-5 text-slate-300 font-medium whitespace-nowrap">
                  {new Date(tx.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
                <td className="p-5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-slate-300 font-bold">
                    <Tag className="w-3.5 h-3.5 text-primary/70" />
                    {tx.category}
                  </span>
                </td>
                <td className={`p-5 text-right font-black text-sm whitespace-nowrap ${
                  tx.type === 'income' ? 'text-success' : 'text-white'
                }`}>
                  {tx.type === 'income' ? '+' : ''}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="p-5 text-center whitespace-nowrap">
                  <Badge 
                    variant={tx.status === 'cleared' ? 'mint' : 'yellow'}
                    className="font-bold text-[9px] uppercase tracking-widest"
                  >
                    {tx.status}
                  </Badge>
                </td>
                <td className="p-5 text-center">
                  <button
                    onClick={() => onDelete(tx.id)}
                    className="p-1.5 rounded-lg hover:bg-danger/10 text-slate-400 hover:text-danger transition-colors cursor-pointer"
                    aria-label="Delete Transaction"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
