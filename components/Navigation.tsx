'use client'

import Button from './button1'

export default function Navigation() {
  return (
    <div className="flex gap-4">
      <Button isHome={true}>
        Prueba
      </Button>
      <Button isCharacter={true}>
        Character
      </Button>
      <Button>
        About me
      </Button>
    </div>
  )
} 