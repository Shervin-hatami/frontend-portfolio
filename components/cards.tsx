import Link from "next/link";

// Actualizamos la interfaz para incluir imagen en lugar de color
export interface TrabajoProps {
  id: string;
  imagen: string; // Cambiamos color por imagen
  titulo: string;
  descripcion?: string;
  contenido?: any; // Añadimos el campo contenido
}

// Componente para una tarjeta individual
export function TarjetaTrabajo({ id, imagen, titulo }: TrabajoProps) {
  return (
    <article>
      <Link href={`/trabajos/${id}`} className="block">
        <div className="bg-white p-4 rounded-lg shadow-lg transform transition hover:scale-105">
          <div className="bg-white p-3 shadow-lg rounded-lg">
            <div className="aspect-w-4 aspect-h-3 mb-4">
              <img 
                src={imagen} 
                alt={titulo}
                className="w-full h-[200px] object-cover rounded-lg"
              />
            </div>
            <div className="p-4 text-center bg-white">
              <h3 className="text-lg font-semibold text-gray-800">{titulo}</h3>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

// También actualizamos el componente TrabajoDetallado
export function TrabajoDetallado({ imagen, titulo, descripcion, contenido }: TrabajoProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="w-full h-[50vh] mb-8">
        <img 
          src={imagen} 
          alt={titulo}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          <div className="prose prose-lg">
            <h1 className="text-3xl font-bold mb-4">{titulo}</h1>
            <p className="text-gray-700 mb-8">{descripcion}</p>
            
            <div className="mt-8">
              {contenido && contenido.map((bloque: any, index: number) => {
                switch (bloque.type) {
                  case 'paragraph':
                    return <p key={index} className="mb-4">{bloque.children[0].text}</p>;
                  case 'heading':
                    return <h2 key={index} className="text-2xl font-bold mb-4">{bloque.children[0].text}</h2>;
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





