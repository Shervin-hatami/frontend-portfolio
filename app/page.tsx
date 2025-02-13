// Página principal que muestra el listado de trabajos
// Incluye el buscador y los filtros principales
import JobList from '../components/JobList'

export default async function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Búsqueda de Empleos</h1>
      <JobList />
    </main>
  )
}
