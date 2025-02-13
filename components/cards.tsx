import Link from "next/link";

// Actualizamos la interfaz para incluir imagen en lugar de color
export interface TrabajoProps {
  id: string;
  imagen: string; // Cambiamos color por imagen
  titulo: string;
  descripcion?: string;
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
export function TrabajoDetallado({ imagen, titulo, descripcion }: TrabajoProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="w-full h-[50vh] mb-8">
        {/* Reemplazamos el div con color por una imagen */}
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
            <p className="text-gray-700">{descripcion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente Card: Representa cada trabajo individual en forma de tarjeta
// Muestra la información principal del trabajo como título, empresa, ubicación, etc.
interface CardProps {
  title: string
  company: string
  location: string
  salary?: string
  description: string
}

export default function Card({ title, company, location, salary, description }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-gray-600 mb-2">
        <p>{company} • {location}</p>
        {salary && <p className="font-medium">{salary}</p>}
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}
