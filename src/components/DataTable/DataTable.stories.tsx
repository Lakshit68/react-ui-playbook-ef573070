import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Badge } from '@/components/ui/badge';
import { DataTable, Column } from './DataTable';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastSeen: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
    lastSeen: '2024-01-20',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com', 
    role: 'Editor',
    status: 'active',
    joinDate: '2023-03-22',
    lastSeen: '2024-01-19',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'inactive',
    joinDate: '2023-05-10',
    lastSeen: '2023-12-15',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'pending',
    joinDate: '2024-01-10',
    lastSeen: 'Never',
  },
];

const sampleProducts: Product[] = [
  { id: 'P001', name: 'MacBook Pro', category: 'Laptops', price: 1299, stock: 15, status: 'in-stock' },
  { id: 'P002', name: 'iPhone 15', category: 'Phones', price: 999, stock: 3, status: 'low-stock' },
  { id: 'P003', name: 'iPad Air', category: 'Tablets', price: 599, stock: 0, status: 'out-of-stock' },
  { id: 'P004', name: 'AirPods Pro', category: 'Audio', price: 249, stock: 25, status: 'in-stock' },
];

// Column definitions
const userColumns: Column<User>[] = [
  {
    id: 'name',
    header: 'Name',
    accessor: (user) => user.name,
    sortable: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessor: (user) => user.email,
    sortable: true,
  },
  {
    id: 'role',
    header: 'Role',
    accessor: (user) => (
      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
        {user.role}
      </Badge>
    ),
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: (user) => (
      <Badge
        variant={
          user.status === 'active' ? 'default' :
          user.status === 'inactive' ? 'destructive' :
          'secondary'
        }
      >
        {user.status}
      </Badge>
    ),
    sortable: true,
  },
  {
    id: 'joinDate',
    header: 'Join Date',
    accessor: (user) => user.joinDate,
    sortable: true,
  },
];

const productColumns: Column<Product>[] = [
  {
    id: 'id',
    header: 'Product ID',
    accessor: (product) => (
      <code className="text-sm bg-surface px-2 py-1 rounded">{product.id}</code>
    ),
    width: '120px',
  },
  {
    id: 'name',
    header: 'Product Name',
    accessor: (product) => product.name,
    sortable: true,
  },
  {
    id: 'category',
    header: 'Category',
    accessor: (product) => product.category,
    sortable: true,
  },
  {
    id: 'price',
    header: 'Price',
    accessor: (product) => `$${product.price.toFixed(2)}`,
    sortable: true,
    align: 'right',
  },
  {
    id: 'stock',
    header: 'Stock',
    accessor: (product) => product.stock.toString(),
    sortable: true,
    align: 'center',
  },
  {
    id: 'status',
    header: 'Status',
    accessor: (product) => (
      <Badge
        variant={
          product.status === 'in-stock' ? 'default' :
          product.status === 'low-stock' ? 'destructive' :
          'secondary'
        }
      >
        {product.status.replace('-', ' ')}
      </Badge>
    ),
    sortable: true,
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DataTable Component

A powerful and flexible data table component with sorting, selection, and comprehensive state management.

## Features
- **Column sorting**: Click headers to sort data ascending/descending
- **Row selection**: Single or multiple row selection with callbacks
- **Loading states**: Built-in loading spinner and skeleton states
- **Empty states**: Customizable empty state with helpful messaging
- **Responsive design**: Horizontal scroll on smaller screens
- **Accessibility**: Full keyboard navigation and screen reader support
- **Flexible columns**: Custom renderers, alignment, and widths

## Anatomy
- **Header**: Sortable column headers with visual indicators
- **Body**: Data rows with hover states and selection
- **Empty State**: Informative message when no data is available
- **Loading State**: Spinner overlay during data fetching

## Accessibility
- Proper table semantics with thead/tbody
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader announcements for sorting changes
- Focus management for selection checkboxes

## Theming & Responsiveness
- Uses design system tokens for consistent theming
- Automatically adapts to light/dark themes
- Responsive with horizontal scroll on mobile
- Hover states and selection highlighting

## Best Practices

### Do's
- Provide meaningful column headers
- Use appropriate data types for sorting
- Include loading states for async data
- Implement proper error handling
- Use selection callbacks for user actions

### Don'ts
- Don't put too many columns without horizontal scroll
- Avoid complex nested components in cells
- Don't forget empty states
- Avoid missing accessibility attributes
        `,
      },
    },
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether table is in loading state',
    },
    selectable: {
      control: 'boolean', 
      description: 'Whether rows can be selected',
    },
    emptyMessage: {
      control: 'text',
      description: 'Custom empty state message',
    },
  },
  args: {
    onRowSelect: action('onRowSelect'),
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Basic examples
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyMessage: 'No users found. Try adjusting your search criteria.',
  },
};

// Advanced examples  
export const ProductTable: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A product inventory table with custom formatting and alignment',
      },
    },
  },
  args: {
    data: sampleProducts,
    columns: productColumns,
    selectable: true,
    getRowId: (product) => product.id,
  },
};

export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'DataTable with custom CSS classes and styling',
      },
    },
  },
  args: {
    data: sampleUsers.slice(0, 3),
    columns: userColumns,
    className: 'shadow-lg',
    selectable: true,
  },
};

// Interactive examples
export const SortingDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates sorting functionality across different data types',
      },
    },
  },
  render: () => {
    const columns: Column<User>[] = [
      {
        id: 'id',
        header: 'ID',
        accessor: (user) => user.id.toString(),
        sortable: true,
        width: '80px',
      },
      {
        id: 'name',
        header: 'Name (sortable)',
        accessor: (user) => user.name,
        sortable: true,
      },
      {
        id: 'email',
        header: 'Email (sortable)',
        accessor: (user) => user.email,
        sortable: true,
      },
      {
        id: 'role',
        header: 'Role (not sortable)',
        accessor: (user) => user.role,
        sortable: false,
      },
    ];

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click on sortable column headers to sort. Click again to reverse, and a third time to remove sorting.
        </p>
        <DataTable data={sampleUsers} columns={columns} />
      </div>
    );
  },
};

export const SelectionDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates row selection with feedback',
      },
    },
  },
  render: () => {
    const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Select rows to see the selection in action
          </p>
          <p className="text-sm font-medium">
            Selected: {selectedUsers.length} user(s)
          </p>
        </div>
        <DataTable
          data={sampleUsers}
          columns={userColumns}
          selectable
          onRowSelect={setSelectedUsers}
        />
        {selectedUsers.length > 0 && (
          <div className="p-4 bg-surface rounded-lg">
            <h4 className="font-medium mb-2">Selected Users:</h4>
            <ul className="text-sm space-y-1">
              {selectedUsers.map((user) => (
                <li key={user.id}>
                  {user.name} ({user.email})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const RealWorldExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A complete example showing a user management interface',
      },
    },
  },
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [users, setUsers] = React.useState(sampleUsers);

    const handleRefresh = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">User Management</h2>
            <p className="text-sm text-muted-foreground">
              Manage your team members and their permissions
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <DataTable
          data={users}
          columns={userColumns}
          loading={isLoading}
          selectable
          emptyMessage="No team members found. Invite some users to get started."
        />
      </div>
    );
  },
};