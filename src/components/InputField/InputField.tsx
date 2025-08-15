import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Current input value */
  value?: string;
  /** Change handler for controlled input */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Label text displayed above the input */
  label?: string;
  /** Placeholder text shown when input is empty */
  placeholder?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Error message displayed when validation fails */
  errorMessage?: string;
  /** Whether the input is in an invalid state */
  invalid?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether to show loading state */
  loading?: boolean;
  /** Visual style variant of the input */
  variant?: 'filled' | 'outlined' | 'ghost';
  /** Size of the input field */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show clear button when input has value */
  clearable?: boolean;
  /** Whether this is a password field with toggle visibility */
  password?: boolean;
  /** Optional icon to display at the start of the input */
  startIcon?: React.ReactNode;
  /** Optional icon to display at the end of the input */
  endIcon?: React.ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    invalid = false,
    disabled = false,
    loading = false,
    variant = 'outlined',
    size = 'md',
    clearable = false,
    password = false,
    startIcon,
    endIcon,
    className,
    type = 'text',
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');
    
    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : internalValue;
    const hasError = invalid || !!errorMessage;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };
    
    const handleClear = () => {
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      
      if (!isControlled) {
        setInternalValue('');
      }
      onChange?.(syntheticEvent);
    };
    
    const inputType = password ? (showPassword ? 'text' : 'password') : type;
    
    const sizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base',
    };
    
    const variantClasses = {
      filled: 'input-field-filled',
      outlined: 'input-field-outlined', 
      ghost: 'input-field-ghost',
    };
    
    const inputClasses = cn(
      'w-full rounded-lg transition-colors',
      'placeholder:text-muted-foreground',
      'focus:outline-none focus:ring-2',
      sizeClasses[size],
      variantClasses[variant],
      {
        'border-error focus:border-error focus:ring-error/20': hasError,
        'pl-10': startIcon,
        'pr-10': endIcon || clearable || password || loading,
      },
      className
    );
    
    return (
      <div className="space-y-2">
        {label && (
          <label className={cn(
            'block text-sm font-medium',
            hasError ? 'text-error' : 'text-foreground',
            disabled && 'opacity-50'
          )}>
            {label}
          </label>
        )}
        
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {startIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            className={inputClasses}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${props.id || 'input'}-error` : 
              helperText ? `${props.id || 'input'}-help` : undefined
            }
            {...props}
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            
            {!loading && clearable && inputValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {!loading && password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
            
            {!loading && !clearable && !password && endIcon && (
              <div className="text-muted-foreground">
                {endIcon}
              </div>
            )}
          </div>
        </div>
        
        {(hasError || helperText) && (
          <div
            className={cn(
              'text-sm',
              hasError ? 'text-error' : 'text-muted-foreground'
            )}
            id={hasError ? `${props.id || 'input'}-error` : `${props.id || 'input'}-help`}
            role={hasError ? 'alert' : undefined}
          >
            {errorMessage || helperText}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export { InputField };