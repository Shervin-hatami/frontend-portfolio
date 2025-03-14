'use client'

import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  isHome?: boolean;
  isCharacter?: boolean;
  'aria-label'?: string;
}

export default function Button({ children, className, isHome, isCharacter, 'aria-label': ariaLabel }: ButtonProps) {
  const buttonClass = `
    px-3 md:px-4 py-2 
    bg-red-600 
    text-amber-100 
    rounded 
    hover:bg-red-700 
    focus:outline-none 
    focus:ring-2 
    focus:ring-red-500 
    focus:ring-offset-2 
    transition 
    shadow-red-400 
    shadow-[0_5px_0_0] 
    active:transform 
    active:translate-y-[5px] 
    active:shadow-none 
    text-sm md:text-base
    ${className || ''}
  `

  if (isHome) {
    return (
      <Link 
        href="/pagina_prueba" 
        className={buttonClass}
        aria-label={ariaLabel}
        role="button"
      >
        {children}
      </Link>
    )
  }
  if (isCharacter) {
    return (
      <Link 
        href="/Characters" 
        className={buttonClass}
        aria-label={ariaLabel}
        role="button"
      >
        {children}
      </Link>
    )
  }

  return (
    <button 
      className={buttonClass}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}