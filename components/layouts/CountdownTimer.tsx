import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ dateEnd }: { dateEnd: Date }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(dateEnd).getTime() - new Date().getTime();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor((difference / (1000 * 60 * 60 * 24))),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const renderTimerBox = (value: number, label: string) => {
    return <div className="w-12 h-12 flex items-center justify-center border border-primary rounded">{value}</div>;
  };

  return (
    <div className="flex items-center gap-2">
      {renderTimerBox(timeLeft.days, "D")}
      {renderTimerBox(timeLeft.hours, "H")}
      {renderTimerBox(timeLeft.minutes, "M")}
      {renderTimerBox(timeLeft.seconds, "Seconds")}
    </div>
  );
};

export default CountdownTimer;
