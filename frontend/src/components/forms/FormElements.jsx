// frontend/src/components/forms/FormElements.jsx
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const FormElements = {
  // Input básico
  Input: ({ 
    type = 'text', 
    value, 
    onChange, 
    placeholder, 
    label, 
    error, 
    required = false, 
    disabled = false,
    className = '',
    ...props 
  }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              error ? 'border-red-500' : ''
            } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },

  // Textarea
  Textarea: ({ 
    value, 
    onChange, 
    placeholder, 
    label, 
    error, 
    required = false, 
    disabled = false,
    rows = 3,
    className = '',
    ...props 
  }) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
            error ? 'border-red-500' : ''
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },

  // Select
  Select: ({ 
    value, 
    onChange, 
    options = [], 
    placeholder, 
    label, 
    error, 
    required = false, 
    disabled = false,
    className = '',
    ...props 
  }) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            error ? 'border-red-500' : ''
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },

  // Checkbox
  Checkbox: ({ 
    checked, 
    onChange, 
    label, 
    error, 
    disabled = false,
    className = '',
    ...props 
  }) => {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            {...props}
          />
          {label && (
            <label className={`ml-2 block text-sm text-gray-700 ${
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}>
              {label}
            </label>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },

  // Radio Group
  RadioGroup: ({ 
    value, 
    onChange, 
    options = [], 
    label, 
    error, 
    disabled = false,
    className = '',
    ...props 
  }) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ${
                  disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                {...props}
              />
              <label className={`ml-2 block text-sm text-gray-700 ${
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },

  // File Input
  FileInput: ({ 
    onChange, 
    accept, 
    label, 
    error, 
    disabled = false,
    multiple = false,
    className = '',
    ...props 
  }) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => onChange(multiple ? e.target.files : e.target.files[0])}
          disabled={disabled}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            error ? 'border-red-500' : ''
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },

  // Button
  Button: ({ 
    children, 
    type = 'button', 
    variant = 'primary', 
    size = 'md',
    loading = false,
    disabled = false,
    className = '',
    ...props 
  }) => {
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700',
      outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      success: 'bg-green-600 text-white hover:bg-green-700'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    };

    return (
      <button
        type={type}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          variants[variant]
        } ${sizes[size]} ${
          disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
};

export default FormElements;