import { TrabajoDetallado, TrabajoProps } from "@/components/cards";

// Página de detalle de trabajo individual
// Muestra información completa de un trabajo específico
interface JobDetailProps {
  params: Promise<{
    id: string
  }>
}

export default async function JobDetail({ params }: JobDetailProps) {
  const resolvedParams = await Promise.resolve(params)
  const id = resolvedParams.id

  try {
    const url = `http://localhost:1337/api/tarjetas?filters[id]=${id}&populate=*`;
    
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return <div>Error al cargar el trabajo: {response.status}</div>;
    }

    const { data } = await response.json();

    if (!data || data.length === 0) {
      return <div>Trabajo no encontrado</div>;
    }

    const trabajoData = data[0];

    const trabajo: TrabajoProps = {
      id: trabajoData.id,
      imagen: trabajoData.imagen?.url 
        ? `http://localhost:1337${trabajoData.imagen.url}` 
        : '/placeholder-image.jpg',
      titulo: trabajoData.titulo,
      descripcion: trabajoData.descripcion,
      contenido: trabajoData.contenido
    };

    return (
      <div className="min-h-screen">
        {/* Sección hero con imagen de fondo */}
        <div 
          className="relative h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${trabajo.imagen})` }}
        >
          {/* Overlay oscuro para mejorar legibilidad */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          {/* Contenido sobre la imagen */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-8 max-w-4xl">
              <h2 className="text-4xl font-bold mb-4">{trabajo.titulo}</h2>
              <h3 className="text-xl text-gray-200">{trabajo.descripcion}</h3>
            </div>
          </div>
        </div>

        {/* Solo mostramos el contenido */}
        <div className="container mx-auto py-12 px-4">
          <div className="prose max-w-none">
            {Array.isArray(trabajo.contenido) 
              ? trabajo.contenido.map((block, index) => (
                  <p key={index}>
                    {block.children?.map((child: { text: string }) => 
                      child.text || ''
                    ).join('')}
                  </p>
                ))
              : trabajo.contenido}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error al cargar el trabajo</div>;
  }
}