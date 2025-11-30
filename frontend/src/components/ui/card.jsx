// src/components/ui/card.jsx
export default function Card({ children, className = "", ...props }) {
  return (
    <div
      {...props}
      className={`bg-white shadow-xl rounded-2xl border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}




