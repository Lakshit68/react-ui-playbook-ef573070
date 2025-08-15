import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Search, Mail, Lock, User } from 'lucide-react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# InputField Component

A flexible and accessible input component with multiple variants, states, and built-in validation support.

## Features
- **Multiple variants**: filled, outlined, ghost
- **Size options**: small, medium, large  
- **Built-in states**: disabled, invalid, loading
- **Interactive elements**: clear button, password toggle
- **Icons support**: start and end icons
- **Full accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Theming**: Supports light/dark themes automatically

## Accessibility
- Uses proper ARIA attributes for validation states
- Supports keyboard navigation
- Screen reader compatible with proper labeling
- Focus management with clear visual indicators

## Best Practices
- Always provide a label for accessibility
- Use helper text to guide users
- Show error messages clearly and descriptively
- Use appropriate input types (email, password, etc.)
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual style variant of the input',
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the input is in an invalid state',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show clear button when input has value',
    },
    password: {
      control: 'boolean',
      description: 'Whether this is a password field with toggle visibility',
    },
  },
  args: {
    onChange: action('onChange'),
    variant: 'outlined',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

// Basic variants
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email address',
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
  },
};

export const Ghost: Story = {
  args: {
    ...Default.args,
    variant: 'ghost',
  },
};

// Sizes
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

// States
export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: 'disabled@example.com',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
    value: 'checking availability...',
  },
};

// Interactive features
export const WithClearButton: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
    clearable: true,
    value: 'Sample search query',
    startIcon: <Search className="h-4 w-4" />,
  },
};

export const PasswordField: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    password: true,
    value: 'supersecretpassword',
  },
};

// With icons
export const WithStartIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'your@email.com',
    startIcon: <Mail className="h-4 w-4" />,
  },
};

export const WithEndIcon: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    endIcon: <User className="h-4 w-4" />,
  },
};

// Real-world examples
export const LoginForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A typical login form layout with email and password fields',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-4">
      <InputField
        label="Email"
        placeholder="your@email.com"
        startIcon={<Mail className="h-4 w-4" />}
        variant="outlined"
      />
      <InputField
        label="Password"
        placeholder="Enter your password"
        password
        startIcon={<Lock className="h-4 w-4" />}
        variant="outlined"
      />
    </div>
  ),
};

export const SearchWithSuggestions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A search input with clear functionality and loading state',
      },
    },
  },
  render: () => (
    <div className="w-96">
      <InputField
        label="Search Products"
        placeholder="Search for products..."
        clearable
        startIcon={<Search className="h-4 w-4" />}
        helperText="Start typing to see suggestions"
        variant="filled"
        size="lg"
      />
    </div>
  ),
};

export const FormValidation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Examples of validation states and error handling',
      },
    },
  },
  render: () => (
    <div className="w-80 space-y-6">
      <InputField
        label="Valid Email"
        value="user@example.com"
        startIcon={<Mail className="h-4 w-4" />}
        helperText="Email format is correct"
        variant="outlined"
      />
      <InputField
        label="Invalid Email" 
        value="invalid-email"
        invalid
        errorMessage="Please enter a valid email address"
        startIcon={<Mail className="h-4 w-4" />}
        variant="outlined"
      />
      <InputField
        label="Processing..."
        value="checking@example.com"
        loading
        helperText="Verifying email availability"
        startIcon={<Mail className="h-4 w-4" />}
        variant="outlined"
      />
    </div>
  ),
};