import BotonImagenPerfil from './BotonImagenPerfil'
import Navigation from './Navigation'
import PageTitle from './PageTitle'

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-800 p-3 md:p-5 z-50" role="navigation" aria-label="Navegación principal">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="px-2">
            <BotonImagenPerfil />
          </div>
        </div>
        <div className="text-xl md:text-2xl font-bold text-blue-300 flex-grow text-center">
          <PageTitle />
        </div>
        <div className="w-full md:w-auto">
          <Navigation />
        </div>
      </div>
    </nav>
  )
} 