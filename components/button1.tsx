'use client'

import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  isHome?: boolean;
  isCharacter?: boolean;
}

export default function Button({ children, className, isHome, isCharacter }: ButtonProps) {
  const buttonClass = `px-4 py-2 bg-red-600 text-amber-100 rounded hover:bg-red-700 transition shadow-red-400 shadow-[0_5px_0_0] active:transform active:translate-y-[5px] active:shadow-none ${className || ''}`

  // Si es el botón de home, usamos un enlace directo
  if (isHome) {
    return (
      <Link href="/pagina_prueba" className={buttonClass}>
        {children}
      </Link>
    )
  }
  if (isCharacter) {
    return (
      <Link href="/Characters" className={buttonClass}>
        {children}
      </Link>
    )
  }
  // Para otros botones, solo mostramos el botón sin funcionalidad por ahora
  return (
    <button 
      className={buttonClass}
    >
      {children}
    </button>
  )
}