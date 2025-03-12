import BotonImagenPerfil from './BotonImagenPerfil'
import Navigation from './Navigation'

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-800 p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <BotonImagenPerfil />
        <Navigation />
      </div>
    </nav>
  )
} 