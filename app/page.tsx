// Página principal que muestra el listado de trabajos
// Incluye el buscador y los filtros principales
import JobList from '../components/JobList'
import BannerEvento from '../components/bannerEvento'

export default async function Home() {
  return (
    <main className="min-h-screen p-8 pt-20">
      <JobList />
      <div className="m-10">
        <BannerEvento />
      </div>
    </main>
  )
}
