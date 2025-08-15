# React Component Development Playbook

A comprehensive showcase of professional-grade React components built with TypeScript, TailwindCSS, and modern design patterns.

## 🚀 Components

### InputField Component

A flexible input component with validation states, multiple variants, and built-in accessibility features.

**Features:**
- **Variants**: `filled`, `outlined`, `ghost`
- **Sizes**: `sm`, `md`, `lg`
- **States**: `disabled`, `invalid`, `loading`
- **Interactive**: Clear button, password toggle
- **Icons**: Start and end icon support
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

**Props:**
```typescript
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  password?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
```

### DataTable Component

A powerful data table with sorting, selection, and comprehensive state management.

**Features:**
- **Column sorting**: Click headers to sort ascending/descending
- **Row selection**: Single or multiple row selection with callbacks
- **Loading states**: Built-in loading spinner and skeleton states
- **Empty states**: Customizable empty state with helpful messaging
- **Responsive design**: Horizontal scroll on smaller screens
- **Accessibility**: Full keyboard navigation and screen reader support

**Props:**
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
  className?: string;
  getRowId?: (item: T, index: number) => string;
}

interface Column<T> {
  id: string;
  header: string;
  accessor: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}
```

## 🎨 Design System

The components use a comprehensive design system built with CSS custom properties and TailwindCSS:

- **Modern color palette**: Purple/blue gradient theme with semantic tokens
- **Typography**: System font stack with proper contrast ratios
- **Spacing**: Consistent spacing scale using Tailwind utilities
- **Border radius**: Consistent rounded corners throughout
- **Animations**: Smooth transitions and micro-interactions
- **Dark mode**: Full dark theme support

## 📚 Storybook Documentation

Comprehensive Storybook documentation is provided for both components, including:

- **Component overview** and feature descriptions
- **Props API** with TypeScript definitions
- **Interactive examples** showcasing all variants and states
- **Real-world use cases** and implementation examples
- **Accessibility notes** and keyboard navigation guides
- **Best practices** and do's/don'ts

To run Storybook:

```bash
# Install dependencies
npm install

# Start Storybook development server
npx storybook dev -p 6006
```

## 🛠 Development

### Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Tech Stack

- **React 18** with TypeScript
- **TailwindCSS** for styling
- **Vite** for build tooling
- **Storybook** for component documentation
- **Radix UI** for accessible primitives
- **Lucide React** for icons

### Project Structure

```
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx
│   │   ├── InputField.stories.tsx
│   │   └── index.ts
│   └── DataTable/
│       ├── DataTable.tsx
│       ├── DataTable.stories.tsx
│       └── index.ts
├── pages/
│   └── Index.tsx
└── index.css (Design system)
```

## ♿ Accessibility

Both components are built with accessibility as a first-class concern:

- **Semantic HTML**: Proper use of form elements and table markup
- **ARIA attributes**: Comprehensive labeling and state communication
- **Keyboard navigation**: Full keyboard support with proper focus management
- **Screen readers**: Compatible with all major screen reading software
- **Color contrast**: Meets WCAG AA standards for all color combinations
- **Focus indicators**: Clear visual focus states for all interactive elements

## 🎯 Best Practices

### InputField

**Do's:**
- Always provide a label for accessibility
- Use helper text to guide users
- Show error messages clearly and descriptively
- Use appropriate input types (email, password, etc.)
- Implement proper validation with clear feedback

**Don'ts:**
- Don't rely solely on placeholder text for instructions
- Avoid complex validation messages
- Don't disable form submission on invalid states
- Avoid using color alone to indicate validation states

### DataTable

**Do's:**
- Provide meaningful column headers
- Use appropriate data types for sorting
- Include loading states for async data
- Implement proper error handling
- Use selection callbacks for user actions

**Don'ts:**
- Don't put too many columns without horizontal scroll
- Avoid complex nested components in cells
- Don't forget empty states
- Avoid missing accessibility attributes

## 📦 Component Usage

### InputField Examples

```tsx
// Basic usage
<InputField
  label="Email"
  placeholder="Enter your email"
  variant="outlined"
/>

// With validation
<InputField
  label="Password"
  password
  invalid={hasError}
  errorMessage="Password is required"
/>

// With icons and clear button
<InputField
  label="Search"
  clearable
  startIcon={<Search />}
  placeholder="Search..."
/>
```

### DataTable Examples

```tsx
// Basic table
<DataTable
  data={users}
  columns={userColumns}
/>

// With selection
<DataTable
  data={users}
  columns={userColumns}
  selectable
  onRowSelect={(selected) => console.log(selected)}
/>

// With loading state
<DataTable
  data={[]}
  columns={userColumns}
  loading={true}
/>
```

## 🚀 Production Ready

These components are production-ready and include:

- **TypeScript support** for type safety
- **Comprehensive testing** through Storybook interactions
- **Performance optimizations** with proper React patterns
- **Bundle optimization** with tree-shaking support
- **Cross-browser compatibility** 
- **Mobile responsiveness**

---

Built with ❤️ using modern React development practices.