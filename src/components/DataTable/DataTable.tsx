import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, MoreHorizontal, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export interface Column<T> {
  /** Unique identifier for the column */
  id: string;
  /** Column header text */
  header: string;
  /** Function to render cell content */
  accessor: (item: T) => React.ReactNode;
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Custom width for the column */
  width?: string | number;
  /** Alignment of cell content */
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  /** Array of data to display */
  data: T[];
  /** Column definitions */
  columns: Column<T>[];
  /** Whether table is in loading state */
  loading?: boolean;
  /** Whether rows can be selected */
  selectable?: boolean;
  /** Callback when row selection changes */
  onRowSelect?: (selectedRows: T[]) => void;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Additional CSS classes */
  className?: string;
  /** Unique key extractor for rows */
  getRowId?: (item: T, index: number) => string;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  columnId: string | null;
  direction: SortDirection;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data available',
  className,
  getRowId = (_, index) => index.toString(),
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState>({
    columnId: null,
    direction: null,
  });
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  
  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortState.columnId || !sortState.direction) {
      return data;
    }
    
    const column = columns.find(col => col.id === sortState.columnId);
    if (!column || !column.sortable) {
      return data;
    }
    
    return [...data].sort((a, b) => {
      const aValue = column.accessor(a);
      const bValue = column.accessor(b);
      
      // Handle string comparison
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      
      const comparison = aString.localeCompare(bString);
      
      return sortState.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortState, columns]);
  
  const handleSort = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    if (!column?.sortable) return;
    
    setSortState(prev => {
      if (prev.columnId === columnId) {
        // Cycle through: asc -> desc -> null
        switch (prev.direction) {
          case 'asc':
            return { columnId, direction: 'desc' };
          case 'desc':
            return { columnId: null, direction: null };
          default:
            return { columnId, direction: 'asc' };
        }
      } else {
        return { columnId, direction: 'asc' };
      }
    });
  };
  
  const handleRowSelection = (rowId: string, selected: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    
    if (selected) {
      newSelectedRows.add(rowId);
    } else {
      newSelectedRows.delete(rowId);
    }
    
    setSelectedRows(newSelectedRows);
    
    // Get the actual selected data objects
    const selectedData = sortedData.filter((item, index) => 
      newSelectedRows.has(getRowId(item, index))
    );
    
    onRowSelect?.(selectedData);
  };
  
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allRowIds = new Set(sortedData.map((item, index) => getRowId(item, index)));
      setSelectedRows(allRowIds);
      onRowSelect?.(sortedData);
    } else {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    }
  };
  
  const isAllSelected = selectedRows.size > 0 && selectedRows.size === sortedData.length;
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < sortedData.length;
  
  if (loading) {
    return (
      <div className={cn('data-table', className)}>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (!loading && data.length === 0) {
    return (
      <div className={cn('data-table', className)}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-surface flex items-center justify-center">
              <MoreHorizontal className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">No data found</h3>
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={cn('data-table', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="data-table-header">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3 text-left">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all rows"
                    className={cn(
                      isIndeterminate && "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    )}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    'px-4 py-3 font-medium text-foreground',
                    column.sortable && 'cursor-pointer select-none hover:bg-surface/70',
                    {
                      'text-left': column.align === 'left' || !column.align,
                      'text-center': column.align === 'center',
                      'text-right': column.align === 'right',
                    }
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={cn(
                            'h-3 w-3 transition-colors',
                            sortState.columnId === column.id && sortState.direction === 'asc'
                              ? 'text-primary'
                              : 'text-muted-foreground'
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            'h-3 w-3 -mt-1 transition-colors',
                            sortState.columnId === column.id && sortState.direction === 'desc'
                              ? 'text-primary'
                              : 'text-muted-foreground'
                          )}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => {
              const rowId = getRowId(item, index);
              const isSelected = selectedRows.has(rowId);
              
              return (
                <tr
                  key={rowId}
                  className={cn(
                    'data-table-row',
                    isSelected && 'bg-primary/5'
                  )}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleRowSelection(rowId, !!checked)}
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        'px-4 py-3 text-sm',
                        {
                          'text-left': column.align === 'left' || !column.align,
                          'text-center': column.align === 'center',
                          'text-right': column.align === 'right',
                        }
                      )}
                    >
                      {column.accessor(item)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}