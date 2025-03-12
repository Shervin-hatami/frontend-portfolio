// Página principal que muestra el listado de trabajos
// Incluye el buscador y los filtros principales
import JobList from '../components/JobList'
import BannerEvento from '../components/bannerEvento'
import PageTitle from '../components/PageTitle'

export default async function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-center items-center p-10">
      <PageTitle />
      </div>
      <JobList />
      <div className="mt-8">
        <BannerEvento />
      </div>
    </main>
  )
}
