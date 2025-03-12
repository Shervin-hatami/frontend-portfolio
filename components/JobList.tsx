//'use client'
// Componente que maneja la lista de trabajos
// Realiza la petición a la API y muestra los resultados usando el componente Card
import { TarjetaTrabajo } from './cards'

// Define the TrabajoProps type
type TrabajoProps = {
  id: string;
  name: string;
  imagen: string;
  titulo: string;
  descripcion: string;
};

export default async function JobList() {
  // Hacemos la petición a Strapi 5
  const response = await fetch('https://backend-portfolio-app.onrender.com/api/tarjetas?populate=*', {
    next: { revalidate: 3600 }  // Revalidar cada hora
  });
  const { data } = await response.json();

  if (!data || data.length === 0) {
    return <div>No hay trabajos disponibles en este momento.</div>;
  }

  // Adaptamos el mapeo para Strapi 5
  const trabajos: TrabajoProps[] = data.map((item: any) => ({
    id: item.id.toString(),
    imagen: item.imagen?.url 
      ? (item.imagen.url.startsWith('http') ? item.imagen.url : `https://backend-portfolio-app.onrender.com${item.imagen.url}`)
      : '/placeholder-image.jpg',
    titulo: item.titulo,
    descripcion: item.descripcion
  }));

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trabajos.map((trabajo) => (
          <TarjetaTrabajo
            key={trabajo.id}
            {...trabajo}
          />
        ))}
      </div>
    </div>
  );
} 