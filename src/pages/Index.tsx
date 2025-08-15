import React, { useState } from 'react';
import { Search, Mail, User, Package, Settings, Sparkles, Star, Zap, Code, Database, Palette, BookOpen } from 'lucide-react';
import { InputField } from '@/components/InputField';
import { DataTable, Column } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-surface">
        <AppSidebar />
        
        <main className="flex-1 overflow-hidden">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border/50">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-xl font-bold gradient-text">Component Playground</h1>
                  <p className="text-sm text-muted-foreground">Interactive React component showcase</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="animate-glow">
                  <Star className="h-3 w-3 mr-1" />
                  Professional Grade
                </Badge>
              </div>
            </div>
          </header>

          <div className="overflow-y-auto h-full">
            {/* Hero Section */}
            <section id="hero" className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
              <div className="absolute inset-0">
                <div className="absolute top-20 left-20 h-32 w-32 bg-accent-cyan/30 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-40 right-32 h-24 w-24 bg-accent-pink/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 left-1/3 h-28 w-28 bg-accent-orange/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
              </div>
              
              <div className="relative py-24 px-6">
                <div className="mx-auto max-w-5xl text-center">
                  <div className="animate-fade-in">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-8">
                      <Sparkles className="h-4 w-4 text-white" />
                      <span className="text-white font-medium">Professional React Components</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                      React Component
                      <br />
                      <span className="gradient-text bg-gradient-to-r from-white via-accent-cyan to-white bg-clip-text text-transparent">
                        Development Playbook
                      </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                      Professional-grade <span className="font-semibold">InputField</span> and <span className="font-semibold">DataTable</span> components built with React, TypeScript, and modern design patterns.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                      <button className="glass-card px-8 py-4 text-lg font-semibold text-white hover:scale-105 transition-all duration-300">
                        <Zap className="h-5 w-5 mr-2 inline" />
                        Explore Components
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-2xl text-lg font-semibold text-white hover:bg-white/30 transition-all duration-300">
                        <Code className="h-5 w-5 mr-2 inline" />
                        View Storybook
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6">
              <div className="mx-auto max-w-6xl">
                <div className="text-center mb-16 animate-fade-in">
                  <h2 className="text-4xl font-bold mb-6">Why Choose Our Components?</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Built with modern React patterns, TypeScript safety, and comprehensive accessibility support.
                  </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  <Card className="glass-card animate-slide-up border-0">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center mb-4">
                        <Code className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">TypeScript First</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Full TypeScript support with comprehensive type definitions and IntelliSense support for better developer experience.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="glass-card animate-slide-up border-0" style={{ animationDelay: '100ms' }}>
                    <CardHeader>
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent-pink to-accent-orange flex items-center justify-center mb-4">
                        <Palette className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">Beautiful Design</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Stunning glass morphism effects, smooth animations, and a cohesive design system that adapts to your brand.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="glass-card animate-slide-up border-0" style={{ animationDelay: '200ms' }}>
                    <CardHeader>
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent-green to-brand-600 flex items-center justify-center mb-4">
                        <Database className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">Production Ready</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Thoroughly tested, accessible, and optimized for performance with comprehensive Storybook documentation.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Main Components Section */}
            <section id="components" className="py-20 px-6 bg-white/30">
              <div className="mx-auto max-w-7xl">
                <Tabs defaultValue="input" className="space-y-12">
                  <div className="text-center">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass-card border-0 p-2">
                      <TabsTrigger 
                        value="input" 
                        className="flex items-center gap-2 data-[state=active]:bg-white/80 data-[state=active]:text-brand-600 data-[state=active]:shadow-card"
                      >
                        <Settings className="h-4 w-4" />
                        InputField
                      </TabsTrigger>
                      <TabsTrigger 
                        value="table"
                        className="flex items-center gap-2 data-[state=active]:bg-white/80 data-[state=active]:text-brand-600 data-[state=active]:shadow-card"
                      >
                        <Package className="h-4 w-4" />
                        DataTable
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {/* InputField Tab */}
                  <TabsContent value="input" className="space-y-12" id="input">
                    <div className="text-center animate-slide-up">
                      <h2 className="text-4xl font-bold mb-6 gradient-text">InputField Component</h2>
                      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        A flexible input component with validation states, multiple variants, and built-in accessibility features.
                      </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                      {/* Variants Showcase */}
                      <Card className="glass-card animate-slide-up border-0">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center">
                              <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <CardTitle>Visual Variants</CardTitle>
                              <CardDescription>Three beautiful styles to match your design</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">OUTLINED</label>
                            <InputField
                              placeholder="Clean and minimal"
                              variant="outlined"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">FILLED</label>
                            <InputField
                              placeholder="Subtle background"
                              variant="filled"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">GHOST</label>
                            <InputField
                              placeholder="Invisible until focus"
                              variant="ghost"
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Interactive Features */}
                      <Card className="glass-card animate-slide-up border-0" style={{ animationDelay: '100ms' }}>
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent-pink to-accent-orange flex items-center justify-center">
                              <Zap className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <CardTitle>Interactive Features</CardTitle>
                              <CardDescription>Enhanced UX with smart interactions</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <InputField
                            label="Search with clear"
                            placeholder="Type and see the magic..."
                            value={searchValue}
                            onChange={handleSearch}
                            clearable
                            startIcon={<Search className="h-4 w-4" />}
                          />
                          <InputField
                            label="Password with toggle"
                            placeholder="Your secret password"
                            password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <InputField
                            label="Loading state"
                            placeholder="Processing..."
                            loading
                            value="Validating input..."
                          />
                        </CardContent>
                      </Card>

                      {/* Size Variants */}
                      <Card className="glass-card animate-slide-up border-0" style={{ animationDelay: '200ms' }}>
                        <CardHeader>
                          <CardTitle>Size Variants</CardTitle>
                          <CardDescription>Perfect sizing for any context</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <InputField
                            label="Small"
                            placeholder="Compact design"
                            size="sm"
                            startIcon={<User className="h-3 w-3" />}
                          />
                          <InputField
                            label="Medium (Default)"
                            placeholder="Balanced proportions"
                            size="md"
                            startIcon={<Mail className="h-4 w-4" />}
                          />
                          <InputField
                            label="Large"
                            placeholder="Prominent and accessible"
                            size="lg"
                            startIcon={<Settings className="h-5 w-5" />}
                          />
                        </CardContent>
                      </Card>

                      {/* Real-world Example */}
                      <Card className="glass-card animate-slide-up border-0" style={{ animationDelay: '300ms' }}>
                        <CardHeader>
                          <CardTitle>Real-World Example</CardTitle>
                          <CardDescription>Complete login form with validation</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <InputField
                            label="Email Address"
                            placeholder="your@company.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            startIcon={<Mail className="h-4 w-4" />}
                            helperText="We'll never share your email"
                          />
                          <InputField
                            label="Password"
                            placeholder="Create a strong password"
                            password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            invalid={password.length > 0 && password.length < 8}
                            errorMessage={password.length > 0 && password.length < 8 ? 'Password must be at least 8 characters' : undefined}
                          />
                          <button className="w-full bg-gradient-brand text-white py-3 px-4 rounded-xl font-semibold hover:shadow-glow transition-all duration-300">
                            Sign In
                          </button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* DataTable Tab */}
                  <TabsContent value="table" className="space-y-12" id="table">
                    <div className="text-center animate-slide-up">
                      <h2 className="text-4xl font-bold mb-6 gradient-text">DataTable Component</h2>
                      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        A powerful data table with sorting, selection, and comprehensive state management for complex data workflows.
                      </p>
                    </div>

                    <div className="space-y-8">
                      {/* Interactive Demo */}
                      <Card className="glass-card animate-slide-up border-0">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                                <Database className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-2xl">Interactive Demo</CardTitle>
                                <CardDescription className="text-base">
                                  Try sorting, selecting rows, and loading states
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">Selected Rows</p>
                                <p className="text-2xl font-bold gradient-text">{selectedUsers.length}</p>
                              </div>
                              <button
                                onClick={handleLoadingDemo}
                                disabled={isLoading}
                                className="glass-card px-6 py-3 font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50"
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
                            emptyMessage="No users found. Add some team members to get started."
                          />
                        </CardContent>
                      </Card>

                      {/* Features Showcase */}
                      <div className="grid gap-6 md:grid-cols-3">
                        {[
                          {
                            icon: Code,
                            title: 'Smart Sorting',
                            description: 'Multi-directional sorting with visual indicators and smooth transitions.',
                            gradient: 'from-brand-500 to-accent-cyan'
                          },
                          {
                            icon: Database,
                            title: 'Row Selection',
                            description: 'Flexible selection with individual and bulk operations support.',
                            gradient: 'from-accent-pink to-accent-orange'
                          },
                          {
                            icon: Sparkles,
                            title: 'State Management',
                            description: 'Loading, empty, and error states with customizable messaging.',
                            gradient: 'from-accent-green to-brand-600'
                          }
                        ].map((feature, index) => (
                          <Card key={feature.title} className="glass-card animate-slide-up border-0" style={{ animationDelay: `${index * 100}ms` }}>
                            <CardHeader>
                              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                                <feature.icon className="h-6 w-6 text-white" />
                              </div>
                              <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-brand">
              <div className="mx-auto max-w-4xl text-center">
                <div className="animate-fade-in">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Ready to Build Something Amazing?
                  </h3>
                  <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                    Get started with our comprehensive component library and detailed Storybook documentation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="glass-card px-8 py-4 text-lg font-semibold text-white hover:scale-105 transition-all duration-300">
                      <BookOpen className="h-5 w-5 mr-2 inline" />
                      Browse Storybook
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-2xl text-lg font-semibold text-white hover:bg-white/30 transition-all duration-300">
                      <Code className="h-5 w-5 mr-2 inline" />
                      View Source Code
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;