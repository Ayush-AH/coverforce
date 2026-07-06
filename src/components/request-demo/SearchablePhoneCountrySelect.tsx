"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import flags from "react-phone-number-input/flags";
import type { Country } from "react-phone-number-input";
import { getCountryCallingCode, type CountryCode } from "libphonenumber-js";
import { RiArrowDownSLine, RiGlobalLine } from "@remixicon/react";
import clsx from "clsx";

type CountryOption = {
  value?: string;
  label: string;
  divider?: boolean;
};

type SearchablePhoneCountrySelectProps = {
  value?: string;
  onChange: (value?: string) => void;
  options: CountryOption[];
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
};

function getCallingCode(country?: string) {
  if (!country) return "";
  try {
    return `+${getCountryCallingCode(country as CountryCode)}`;
  } catch {
    return "";
  }
}

function CountryFlagIcon({
  country,
  className,
  title,
}: {
  country?: string;
  className?: string;
  title?: string;
}) {
  if (!country) {
    return <RiGlobalLine aria-hidden className={clsx("request-demo-phone-country-globe", className)} />;
  }

  const Flag = flags[country as Country];
  if (!Flag) {
    return null;
  }

  return (
    <span className={clsx("request-demo-phone-country-flag", className)}>
      <Flag title={title ?? country} />
    </span>
  );
}

export default function SearchablePhoneCountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  className,
}: SearchablePhoneCountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const isDisabled = disabled || readOnly;

  const selectableOptions = useMemo(
    () => options.filter((option) => !option.divider && option.value !== "|"),
    [options],
  );

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return selectableOptions;

    return selectableOptions.filter((option) => {
      const code = option.value ? getCallingCode(option.value) : "";
      return (
        option.label.toLowerCase().includes(normalized) ||
        code.replace("+", "").includes(normalized.replace("+", ""))
      );
    });
  }, [query, selectableOptions]);

  const selectedLabel = useMemo(
    () => selectableOptions.find((option) => option.value === value)?.label ?? "",
    [selectableOptions, value],
  );

  useEffect(() => {
    if (!open) return;

    const frame = window.requestAnimationFrame(() => {
      searchRef.current?.focus();
    });

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleSelect = (country?: string) => {
    onChange(country);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={rootRef} className={clsx("request-demo-phone-country-root", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={isDisabled}
        className="request-demo-phone-country-trigger"
        onClick={() => {
          if (isDisabled) return;
          setOpen((current) => !current);
        }}
      >
        <CountryFlagIcon country={value} title={selectedLabel || "Select country"} />
        <RiArrowDownSLine
          aria-hidden
          className={clsx(
            "request-demo-phone-country-arrow",
            open && "request-demo-phone-country-arrow-open",
          )}
        />
        <span className="sr-only">{selectedLabel || "Select country"}</span>
      </button>

      {open ? (
        <div className="request-demo-phone-country-menu" data-lenis-prevent>
          <div className="request-demo-phone-country-search-wrap">
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search country"
              className="request-demo-phone-country-search"
              aria-label="Search countries"
            />
          </div>

          <ul id={listId} role="listbox" className="request-demo-phone-country-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option.value ?? option.label} role="none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={option.value === value}
                    className={clsx(
                      "request-demo-phone-country-option",
                      option.value === value && "request-demo-phone-country-option-active",
                    )}
                    onClick={() => handleSelect(option.value)}
                  >
                    <CountryFlagIcon
                      country={option.value}
                      title={option.label}
                      className="request-demo-phone-country-option-flag"
                    />
                    <span className="request-demo-phone-country-option-label">{option.label}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="request-demo-phone-country-empty">No countries found</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
