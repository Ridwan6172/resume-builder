
import React from 'react';
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/lib/store";
import { CheckIcon } from 'lucide-react';

interface FormStepperProps {
  steps: {
    id: number;
    title: string;
    isRequired?: boolean;
  }[];
  currentStepIndex: number;
  onStepClick: (stepIndex: number) => void;
}

const FormStepper: React.FC<FormStepperProps> = ({ steps, currentStepIndex, onStepClick }) => {
  const handleStepClick = (stepIndex: number) => {
    onStepClick(stepIndex);
  };

  return (
    <nav className="mb-8">
      <ol className="flex flex-wrap items-center w-full text-sm font-medium text-center text-gray-500">
        {steps.map((step, index) => {
          const isActive = currentStepIndex === index;
          const isCompleted = currentStepIndex > index;
          const isClickable = index <= Math.max(currentStepIndex, 0);
          
          return (
            <li 
              key={step.id}
              className={`flex items-center ${
                index < steps.length - 1 
                ? "flex-1 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 after:my-auto xl:after:mx-10"
                : ""
              }`}
            >
              <button
                onClick={() => isClickable && handleStepClick(index)}
                disabled={!isClickable}
                className={`flex items-center justify-center w-8 h-8 ${
                  isActive
                    ? "text-blue-600 bg-blue-100"
                    : isCompleted
                    ? "text-white bg-blue-600"
                    : "bg-gray-200"
                } rounded-full lg:h-10 lg:w-10 shrink-0 ${
                  isClickable ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                {isCompleted ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <span>{step.id}</span>
                )}
              </button>
              <span className={`hidden sm:inline-block ml-2 text-sm ${
                isActive ? "text-blue-600 font-medium" : "text-gray-500"
              }`}>
                {step.title}
                {step.isRequired && <span className="text-red-500 ml-1">*</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default FormStepper;
