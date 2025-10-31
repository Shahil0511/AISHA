"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "select" | "tel" | "password";
  placeholder?: string;
  required?: boolean;
  icon?: React.ComponentType<any>;
  options?: { value: string; label: string }[];
  validation?: any;
}

interface AddEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEntity: (data: any) => void;
  title: string;
  description: string;
  formFields: FormField[];
  submitButtonText?: string;
  isLoading?: boolean;
}

export function AddEntityModal({
  isOpen,
  onClose,
  onAddEntity,
  title,
  description,
  formFields,
  submitButtonText = "Add",
  isLoading = false,
}: AddEntityModalProps) {
  const getDefaultValues = () => {
    const defaults: any = {};
    formFields.forEach((field) => {
      if (field.type === "select") {
        defaults[field.name] = field.options?.[0]?.value || "";
      } else if (field.type === "number") {
        defaults[field.name] = 0;
      } else {
        defaults[field.name] = "";
      }
    });
    return defaults;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues(),
  });

  const onSubmit = (data: any) => {
    onAddEntity(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const renderField = (field: FormField) => {
    const IconComponent = field.icon;

    if (field.type === "select") {
      return (
        <div className="relative">
          {IconComponent && (
            <IconComponent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          )}
          <select
            {...register(field.name, {
              required: field.required ? `${field.label} is required` : false,
              ...field.validation,
            })}
            className={`w-full border border-gray-300 rounded-lg px-4 py-3
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
            text-gray-900 text-[1.25rem] bg-white ${
              IconComponent ? "pl-11" : ""
            }`}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    // ✅ Clean fixed input field
    return (
      <div className="relative flex items-center">
        {IconComponent && (
          <IconComponent className="absolute left-3 text-gray-400 text-lg pointer-events-none" />
        )}

        <Input
          type={field.type}
          placeholder={field.placeholder}
          className={`w-full bg-white border border-gray-300 text-gray-900 
  text-[1.5rem] font-semibold py-6 px-5 rounded-lg 
  focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400 
  ${IconComponent ? "pl-12" : ""}`}
          {...register(field.name, {
            required: field.required ? `${field.label} is required` : false,
            ...field.validation,
          })}
        />
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="bg-white border shadow-2xl border-gray-100
 text-gray-900 
     w-[85vw] max-w-3xl h-[85vh] overflow-y-auto 
     rounded-xl px-10 py-8 flex flex-col 
     sm:w-[70vw] sm:max-w-4xl transition-all duration-300 ease-in-out 
"
      >
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 -mx-10 -mt-8 px-10 py-8">
          <DialogTitle className="text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="text-xl text-gray-600 mt-2 font-medium">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-y-8 mt-3 text-[1.25rem]"
        >
          {formFields.map((field) => (
            <div key={field.name} className="flex flex-col space-y-2">
              <Label
                htmlFor={field.name}
                className="text-gray-800 text-[1.1rem] font-medium"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderField(field)}
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}

          {/* Modal Footer */}
          <div className="col-span-full flex gap-4 pt-3 border-t border-gray-200 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 bg-gradient-to-r text-white from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-[1.25rem]"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-[1.25rem]"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : submitButtonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
