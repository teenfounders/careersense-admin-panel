import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./select.module.css";
import { twMerge } from "tailwind-merge";
import cross from "@/assets/corss2.svg";
import Image from "next/image";

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
  classname?: string;
  image?: string;
} & (SingleSelectProps | MultipleSelectProps);

export function Select({
  multiple,
  image,
  value,
  onChange,
  options,
  classname,
}: SelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  // function selectOption(option: SelectOption) {
  //   if (multiple) {
  //     const updatedValue = value.includes(option)
  //       ? value.filter((o) => o !== option)
  //       : [...value, option];
  //     onChange(updatedValue);
  //   } else {
  //     if (option !== value) onChange(option);
  //   }
  // }
  const selectOption = useCallback(
    (option: SelectOption) => {
      if (multiple) {
        const updatedValue = value.includes(option)
          ? value.filter((o) => o !== option)
          : [...value, option];
        onChange(updatedValue);
      } else {
        if (option !== value) onChange(option);
      }
    },
    [multiple, value, onChange]
  );
  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const container = containerRef.current;
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    container?.addEventListener("keydown", handler);

    return () => {
      container?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options, selectOption]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-3">
        <span className={styles.value}>
          {multiple
            ? value.map((v) => (
                <button
                  key={v.value}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    selectOption(v);
                  }}
                  className={
                    "border-2 text-sm font-semibold border-black bg-black rounded-full text-white py-1 flex gap-2 px-2"
                  }
                >
                  {image && value.length === 0 && (
                    <Image
                      src={image || ""}
                      width={18}
                      height={18}
                      alt="image"
                    />
                  )}
                  {v.label}
                  <span className={"mt-1"}>
                    <Image
                      src={cross}
                      className=""
                      width={10}
                      height={10}
                      alt="image"
                    />
                  </span>
                </button>
              ))
            : value?.label}
        </span>
        <input
          type="text"
          className={twMerge(
            "gap-3 border-2 border-black p-[0.5em] flex items-center outline-none rounded-full relative min-h-[38px]",
            classname
          )}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setIsOpen(true)}
        />

        <div
          ref={containerRef}
          onBlur={() => setIsOpen(false)}
          tabIndex={0}
          // className={twMerge(
          //   "gap-3 border-2 border-black p-[0.5em] flex items-center outline-none rounded-full relative min-h-[38px]",
          //   classname
          // )}
        >
          <div className={styles.divider}></div>
          <ul className={`z-10 ${styles.options} ${isOpen ? styles.show : ""}`}>
            {filteredOptions.map((option, index) => (
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(option);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                key={option.value}
                className={`z-10 ${styles.option} ${
                  isOptionSelected(option) ? styles.selected : ""
                } ${index === highlightedIndex ? styles.highlighted : ""}`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
