interface TableShellProps {
  headers: string[];
  empty?: string;
  isEmpty?: boolean;
  children: React.ReactNode;
}

export default function TableShell({ headers, empty = "Nothing to show here.", isEmpty = false, children }: TableShellProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead className="bg-surface-container text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
          <tr>
            {headers.map((heading) => (
              <th key={heading} scope="col" className="px-5 py-3.5">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant text-xs text-on-surface-variant [&>tr>td]:px-5 [&>tr>td]:py-4">
          {children}
        </tbody>
      </table>
      {isEmpty ? <p className="px-5 py-10 text-center text-sm text-on-surface-variant">{empty}</p> : null}
    </div>
  );
}
