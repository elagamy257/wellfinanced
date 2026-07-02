import React from 'react';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export function Table({ children, className = '', ...props }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-card border border-white/10 bg-white/2 backdrop-blur-[10px]">
      <table className={`w-full border-collapse text-left ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={`border-b border-white/10 bg-white/2 ${className}`} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={`divide-y divide-white/5 ${className}`} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = '', ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr 
      className={`transition-colors hover:bg-white/4 ${className}`} 
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '', ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th 
      className={`px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-muted ${className}`} 
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className = '', ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td 
      className={`px-6 py-4 text-sm font-bold text-text-primary align-middle ${className}`} 
      {...props}
    >
      {children}
    </td>
  );
}

export function TableFooter({ children, className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot className={`border-t border-white/10 bg-white/2 ${className}`} {...props}>
      {children}
    </tfoot>
  );
}
