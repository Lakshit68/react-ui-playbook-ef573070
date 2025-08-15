import React, { useState } from 'react';
import { Search, Mail, User, Package, Settings } from 'lucide-react';
import { InputField } from '@/components/InputField';
import { DataTable, Column } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for demonstration
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', joinDate: '2023-03-22' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', joinDate: '2023-05-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'pending', joinDate: '2024-01-10' },
];

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

const Index = () => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-brand py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              React Component
              <br />
              <span className="text-brand-100">Development Playbook</span>
            </h1>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Professional-grade InputField and DataTable components built with React, TypeScript, and modern design patterns.
            </p>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-brand-600/10"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <Tabs defaultValue="input" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:w-96 mx-auto">
              <TabsTrigger value="input" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                InputField Component
              </TabsTrigger>
              <TabsTrigger value="table" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                DataTable Component
              </TabsTrigger>
            </TabsList>

            {/* InputField Tab */}
            <TabsContent value="input" className="space-y-8">
              <div className="text-center animate-slide-up">
                <h2 className="text-3xl font-bold mb-4">InputField Component</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  A flexible input component with validation states, multiple variants, and built-in accessibility features.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Basic Examples */}
                <Card className="animate-slide-up">
                  <CardHeader>
                    <CardTitle>Basic Variants</CardTitle>
                    <CardDescription>
                      Three visual styles: filled, outlined, and ghost
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <InputField
                      label="Outlined (Default)"
                      placeholder="Enter your text"
                      variant="outlined"
                    />
                    <InputField
                      label="Filled Variant"
                      placeholder="Enter your text"
                      variant="filled"
                    />
                    <InputField
                      label="Ghost Variant"
                      placeholder="Enter your text"
                      variant="ghost"
                    />
                  </CardContent>
                </Card>

                {/* Interactive Features */}
                <Card className="animate-slide-up">
                  <CardHeader>
                    <CardTitle>Interactive Features</CardTitle>
                    <CardDescription>
                      Clear button, password toggle, and loading states
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <InputField
                      label="Search"
                      placeholder="Search users..."
                      value={searchValue}
                      onChange={handleSearch}
                      clearable
                      startIcon={<Search className="h-4 w-4" />}
                    />
                    <InputField
                      label="Password"
                      placeholder="Enter password"
                      password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputField
                      label="Processing"
                      placeholder="Loading..."
                      loading
                      value="Checking availability..."
                    />
                  </CardContent>
                </Card>

                {/* Sizes and States */}
                <Card className="animate-slide-up">
                  <CardHeader>
                    <CardTitle>Sizes & States</CardTitle>
                    <CardDescription>
                      Different sizes and validation states
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <InputField
                      label="Small Size"
                      placeholder="Small input"
                      size="sm"
                    />
                    <InputField
                      label="Medium Size (Default)"
                      placeholder="Medium input"
                      size="md"
                    />
                    <InputField
                      label="Large Size"
                      placeholder="Large input"
                      size="lg"
                    />
                  </CardContent>
                </Card>

                {/* Login Form Example */}
                <Card className="animate-slide-up">
                  <CardHeader>
                    <CardTitle>Real-World Example</CardTitle>
                    <CardDescription>
                      A complete login form with validation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <InputField
                      label="Email Address"
                      placeholder="your@email.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      startIcon={<Mail className="h-4 w-4" />}
                      helperText="We'll never share your email"
                    />
                    <InputField
                      label="Password"
                      placeholder="Enter your password"
                      password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      invalid={password.length > 0 && password.length < 8}
                      errorMessage={password.length > 0 && password.length < 8 ? 'Password must be at least 8 characters' : undefined}
                    />
                    <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors">
                      Sign In
                    </button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* DataTable Tab */}
            <TabsContent value="table" className="space-y-8">
              <div className="text-center animate-slide-up">
                <h2 className="text-3xl font-bold mb-4">DataTable Component</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  A powerful data table with sorting, selection, and comprehensive state management.
                </p>
              </div>

              <div className="space-y-6">
                {/* Interactive Demo */}
                <Card className="animate-slide-up">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Interactive Demo</CardTitle>
                        <CardDescription>
                          Try sorting, selecting rows, and loading states
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          Selected: {selectedUsers.length} user(s)
                        </span>
                        <button
                          onClick={handleLoadingDemo}
                          disabled={isLoading}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary-hover transition-colors disabled:opacity-50"
                        >
                          {isLoading ? 'Loading...' : 'Demo Loading'}
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      data={sampleUsers}
                      columns={userColumns}
                      selectable
                      loading={isLoading}
                      onRowSelect={setSelectedUsers}
                      emptyMessage="No users found. Try adding some team members."
                    />
                  </CardContent>
                </Card>

                {/* Features Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="animate-slide-up">
                    <CardHeader>
                      <CardTitle className="text-lg">Sorting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Click column headers to sort data in ascending, descending, or original order.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Visual sort indicators</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="animate-slide-up">
                    <CardHeader>
                      <CardTitle className="text-lg">Selection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Select individual rows or use the header checkbox to select all.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-success"></div>
                        <span>Callback support</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="animate-slide-up">
                    <CardHeader>
                      <CardTitle className="text-lg">States</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        Built-in loading, empty, and error states with customizable messages.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-warning"></div>
                        <span>Accessible design</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Technical Details */}
                <Card className="animate-slide-up">
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                    <CardDescription>
                      Built with modern React patterns and TypeScript
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium mb-2">Features</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Generic TypeScript support</li>
                          <li>• Custom column renderers</li>
                          <li>• Responsive design</li>
                          <li>• Keyboard navigation</li>
                          <li>• Screen reader support</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Customization</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Column alignment options</li>
                          <li>• Custom cell renderers</li>
                          <li>• Flexible width controls</li>
                          <li>• Theme integration</li>
                          <li>• CSS class overrides</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-surface/50 py-12 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-lg font-semibold mb-4">Ready to Use These Components?</h3>
          <p className="text-muted-foreground mb-6">
            Both components are fully documented in Storybook with comprehensive examples and API documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors">
              View Storybook Docs
            </button>
            <button className="px-6 py-3 border border-border rounded-lg hover:bg-surface transition-colors">
              Copy Component Code
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;