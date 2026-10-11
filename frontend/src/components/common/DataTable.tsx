import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyState?: React.ReactNode;
  className?: string;
}

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  onRowClick,
  emptyState,
  className,
}: DataTableProps<T>) {
  if (rows.length === 0 && emptyState) {
    return <div className={className}>{emptyState}</div>;
  }

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-container-lowest",
        className,
      )}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-surface-container-low">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{ width: col.width }}
                className={cn(
                  "h-14 px-5 font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface-variant",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  col.align !== "right" && col.align !== "center" && "text-left",
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={getRowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                "border-t border-outline-variant/40 transition-colors",
                onRowClick && "cursor-pointer hover:bg-surface-container-low/60",
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "px-5 py-4 align-middle font-body-md text-body-md text-on-surface",
                    col.align === "right" && "text-right",
                    col.align === "center" && "text-center",
                    col.className,
                  )}
                >
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}