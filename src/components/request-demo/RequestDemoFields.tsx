"use client";

import { useId } from "react";
import {
  type Control,
  Controller,
  type FieldError,
  type UseFormRegister,
} from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import SearchablePhoneCountrySelect from "@/components/request-demo/SearchablePhoneCountrySelect";
import type { RequestDemoFormValues } from "@/types/requestDemo";
import { RiArrowDownSLine } from "@remixicon/react";
import "react-phone-number-input/style.css";

const labelClass = "mb-2 block font-heading text-sm font-medium text-[#2B409E]";
const inputClass =
  "w-full rounded border border-dashed border-[#8FA3C4] bg-white px-3 py-2.5 font-sans text-sm text-[#3D3D3D] outline-none transition-colors placeholder:text-[#9AA8BC] focus:border-[#2B409E]";
const selectClass = `${inputClass} appearance-none`;
const errorClass = "mt-1.5 font-sans text-xs text-[#D14343]";

type FieldProps = {
  label: string;
  required?: boolean;
  error?: FieldError;
  children: React.ReactNode;
};

export function FormField({ label, required, error, children }: FieldProps) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? <span className="text-[#D14343]"> *</span> : null}
      </label>
      <div id={id}>{children}</div>
      {error ? <p className={errorClass}>{error.message}</p> : null}
    </div>
  );
}

type TextInputProps = {
  register: UseFormRegister<RequestDemoFormValues>;
  name: keyof RequestDemoFormValues;
  placeholder?: string;
  type?: string;
  error?: FieldError;
  label: string;
  required?: boolean;
};

export function TextInputField({
  register,
  name,
  placeholder,
  type = "text",
  error,
  label,
  required,
}: TextInputProps) {
  return (
    <FormField label={label} required={required} error={error}>
      <input
        type={type}
        placeholder={placeholder}
        className={inputClass}
        {...register(name, {
          required: required ? "Please complete this required field." : false,
          ...(type === "email"
            ? {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              }
            : {}),
        })}
      />
    </FormField>
  );
}

type SelectFieldProps = {
  register: UseFormRegister<RequestDemoFormValues>;
  name: keyof RequestDemoFormValues;
  label: string;
  required?: boolean;
  error?: FieldError;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
};

export function SelectField({
  register,
  name,
  label,
  required,
  error,
  options,
  placeholder = "Select an option",
}: SelectFieldProps) {
  return (
    <FormField label={label} required={required} error={error}>
      <div className="relative">
        <select
          className={`${selectClass} cursor-pointer pr-10`}
          defaultValue=""
          {...register(name, {
            required: required ? "Please complete this required field." : false,
          })}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <RiArrowDownSLine
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#8FA3C4]"
        />
      </div>
    </FormField>
  );
}

type YesNoFieldProps = {
  register: UseFormRegister<RequestDemoFormValues>;
  name: "digitalBrokerageStartup" | "existingBook";
  label: string;
  error?: FieldError;
};

export function YesNoField({ register, name, label, error }: YesNoFieldProps) {
  return (
    <FormField label={label} required error={error}>
      <div className="flex flex-wrap gap-6">
        {(["yes", "no"] as const).map((value) => (
          <label key={value} className="inline-flex cursor-pointer items-center gap-2.5">
            <input
              type="radio"
              value={value}
              className="size-4 border border-dashed border-[#8FA3C4] accent-[#121C49]"
              {...register(name, { required: "Please complete this required field." })}
            />
            <span className="font-sans text-sm capitalize text-[#3D3D3D]">{value}</span>
          </label>
        ))}
      </div>
    </FormField>
  );
}

type LobCheckboxFieldProps = {
  register: UseFormRegister<RequestDemoFormValues>;
  error?: FieldError;
  options: readonly string[];
};

export function LobCheckboxField({ register, error, options }: LobCheckboxFieldProps) {
  return (
    <FormField
      label="What LOBs (Lines of Business) are you interested in?"
      required
      error={error}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="inline-flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              value={option}
              className="mt-0.5 size-4 border border-dashed border-[#8FA3C4] accent-[#121C49]"
              {...register("lobs", {
                validate: (value) =>
                  Array.isArray(value) && value.length > 0
                    ? true
                    : "Please select at least one line of business.",
              })}
            />
            <span className="font-sans text-sm leading-snug text-[#3D3D3D]">{option}</span>
          </label>
        ))}
      </div>
    </FormField>
  );
}

type PhoneFieldProps = {
  control: Control<RequestDemoFormValues>;
  phoneError?: FieldError;
};

export function PhoneField({ control, phoneError }: PhoneFieldProps) {
  return (
    <FormField label="Phone Number" required error={phoneError}>
      <Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: "Please complete this required field.",
          validate: (value) =>
            (value && isValidPhoneNumber(value)) || "Please enter a valid phone number.",
        }}
        render={({ field: { onChange, value, ref, onBlur } }) => (
          <PhoneInput
            ref={ref}
            international
            defaultCountry="US"
            countryCallingCodeEditable={false}
            countrySelectComponent={SearchablePhoneCountrySelect}
            value={value || undefined}
            onChange={(nextValue) => onChange(nextValue ?? "")}
            onBlur={onBlur}
            placeholder="Enter phone number"
            className="request-demo-phone"
          />
        )}
      />
    </FormField>
  );
}

export { inputClass };
