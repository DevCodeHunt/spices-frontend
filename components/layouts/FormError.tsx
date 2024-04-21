"use client";

import { TriangleAlert } from "lucide-react";
import React from "react";

interface Props {
  message: string;
}

const FormError: React.FC<Props> = ({ message }) => {
  return (
    <div className="border-2 border-red-400 p-4 rounded-lg flex items-start gap-2 mb-4">
      <TriangleAlert className="text-red-400" size={32} />
      <div className="flex-1">
        <h3 className="text-lg font-medium text-red-600">
          There was a problem
        </h3>
        <p className="text-sm text-gray-900 font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export default FormError;
