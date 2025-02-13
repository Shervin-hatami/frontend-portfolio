'use client'

import { useRouter } from 'next/navigation';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  isHome?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, className, isHome }) => {
  const router = useRouter();
  
  const handleClick = () => {
    if (isHome) {
      router.push('/');
    } else {
      //alert("he sido pulsado");// esto esta comentado para que no se muestre el alert de momento
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`px-4 py-2 bg-red-600 text-amber-100 rounded hover:bg-red-700 transition shadow-red-400 shadow-[0_5px_0_0] active:transform active:translate-y-[5px] active:shadow-none ${className || ''}`}
    >
      {children}
    </button>
  );
};

export default Button;