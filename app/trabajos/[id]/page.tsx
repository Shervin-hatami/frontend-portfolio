import { TrabajoDetallado, TrabajoProps } from "@/components/cards";

// Página de detalle de trabajo individual
// Muestra información completa de un trabajo específico
interface JobDetailProps {
  params: {
    id: string
  }
}

export default async function JobDetail({ params }: JobDetailProps) {
  // Actualizamos la petición para Strapi 5
  const url = `http://localhost:1337/api/tarjetas/${params.id}?populate=*`;
  const response = await fetch(url);
  const { data } = await response.json();

  if (!data) {
    return <div>Trabajo no encontrado</div>;
  }

  // Adaptamos el mapeo para Strapi 5
  const trabajo: TrabajoProps = {
    id: data.id,
    imagen: data.imagen?.url 
      ? `http://localhost:1337${data.imagen.url}` 
      : '/placeholder-image.jpg',
    titulo: data.titulo,
    descripcion: data.descripcion
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Detalles del Trabajo</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <TrabajoDetallado {...trabajo} />
      </div>
    </div>
  );
}