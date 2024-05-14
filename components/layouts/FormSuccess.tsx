"use client";

import { FaRegCircleCheck } from "react-icons/fa6";
import React from "react";

interface Props {
  message: string;
  actionLabel?: string;
  actionClick?: () => void;
}

const FormSuccess: React.FC<Props> = ({
  message,
  actionLabel,
  actionClick,
}) => {
  return (
    <div className="border-2 border-green-400 p-4 rounded-lg flex items-center gap-2 mb-4">
      <FaRegCircleCheck className="text-green-400" size={32} />
      <div className="flex-1">
        <p className="text-sm text-gray-900 font-medium">{message}</p>
        {actionLabel && (
          <div className="flex justify-end">
            <button
              onClick={actionClick}
              className="bg-primary text-white py-1.5 px-3 rounded  cursor-pointer text-sm"
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSuccess;
