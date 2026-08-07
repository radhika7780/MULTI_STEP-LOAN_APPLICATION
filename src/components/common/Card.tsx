import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      {children}
    </div>
  );
};
