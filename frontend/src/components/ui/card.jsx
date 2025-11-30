// src/components/ui/card.jsx
export default function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-xl rounded-2xl border border-gray-100 p-10 ${className}`}>
      {children}
    </div>
  );
}
