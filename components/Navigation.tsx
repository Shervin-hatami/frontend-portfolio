'use client'

import Button from './button1'

export default function Navigation() {
  return (
    <nav aria-label="Menú principal" className="flex flex-wrap justify-center gap-2 md:gap-4">
      <Button isHome={true} aria-label="Ir a página de prueba">
        Prueba
      </Button>
      <Button isCharacter={true} aria-label="Ir a página de personajes">
        Character
      </Button>
    </nav>
  )
} 