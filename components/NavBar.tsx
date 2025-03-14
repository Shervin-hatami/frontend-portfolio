import BotonImagenPerfil from './BotonImagenPerfil'
import Navigation from './Navigation'
import PageTitle from './PageTitle'

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-800 p-5 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="px-5">
          <BotonImagenPerfil />
        </div>
        <div className="text-3xl font-bold text-blue-300">
          <PageTitle />
        </div>
        <Navigation />
      </div>
    </nav>
  )
} 