import React from 'react';

interface TopProgressProps {
  current: number;
  total: number;
}

export const TopProgress: React.FC<TopProgressProps> = ({ current, total }) => {
  const percentage = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="top-progress" aria-hidden="true">
      <span id="topProgress" style={{ width: `${percentage}%` }}></span>
    </div>
  );
};
