"use client";

import React, { useCallback, useState } from "react";
import { GoGift, GoCheck } from "react-icons/go";
import { BsTruck } from "react-icons/bs";
import { RiEBike2Fill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { IconType } from "react-icons";
import "./OrderSrepper.css";

interface Step {
  icon: IconType;
  name: string;
}

const steps: Step[] = [
  {
    name: "Order Confirmed",
    icon: GoCheck,
  },
  {
    name: "Order Packed",
    icon: GoGift,
  },
  {
    name: "Order Shipped",
    icon: TbTruckDelivery,
  },
  {
    name: "Out for Delivery",
    icon: BsTruck,
  },
  {
    name: "Delivered",
    icon: RiEBike2Fill,
  },
];

const OrderStepper = () => {
  const [currentStep, setCurrentStep] = useState(5);
  const [complete, setComplete] = useState(false);

  const handleStep = () => {
    currentStep === steps.length
      ? setComplete(true)
      : setCurrentStep((prev) => prev + 1);
  };

  const prevStep = useCallback(() => {
    currentStep === 1 ? setComplete(false) : setCurrentStep((prev) => prev - 1);
  }, [currentStep]);

  return (
    <div className="bg-white rounded-lg p-4 h-40 w-full shadow">
      <div className="flex justify-between items-center my-auto h-full">
        {steps.map((step, i) => {
          return (
            <div
              key={i}
              className={`step-item ${currentStep === i + 1 && "active"} ${
                (i + 1 < currentStep || complete) && "complete"
              }`}
            >
              <div
                className={`z-10 shadow bg-white w-8 h-8 flex items-center border border-gray-600 justify-center rounded-full ${
                  currentStep === i + 1 && "active-icon border-none"
                } ${(i + 1 < currentStep || complete) && "complete-icon border-noe"}`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className="mt-1">{step.name}</span>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStepper;
