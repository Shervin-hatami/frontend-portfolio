import Image from 'next/image'
import Link from 'next/link'

// Definimos la interfaz para los datos del banner
interface BannerEventoProps {
  id: number
  descripcion: string
  fecha: string
  hora: string
  imagen: string
}

export interface EventoProps {
  id: number
  descripcion: string
  fecha: string
  hora: string
  imagen: string
  contenido?: any
}

export default async function BannerEvento() {
  const response = await fetch('https://backend-portfolio-app.onrender.com/api/banner-eventos?populate=*', {
    cache: 'no-store'
  });
  const { data } = await response.json();

  if (!data || data.length === 0) {
    return <div>No hay eventos disponibles en este momento.</div>;
  }

  const eventos: BannerEventoProps[] = data.map((item: any) => {
    const fechaEvento = new Date(item.fecha);
    
    return {
      id: item.id,
      descripcion: item.descripcion,
      fecha: fechaEvento.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      hora: fechaEvento.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      imagen: item.imagenes?.formats?.medium?.url
        ? item.imagenes.formats.medium.url
        : '/placeholder-image.jpg',
    };
  });

  console.log('URL de la imagen:', eventos[0]?.imagen);

  return (
    <div className="w-full space-y-4">
      {eventos.map((evento) => (
        <Link 
          key={evento.id}
          href={`/eventos/${evento.id}`}
          className="block transform transition hover:scale-105"
        >
          <div className="relative w-full h-[200px] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={evento.imagen}
              alt="Imagen del evento"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 p-6">
              <div className="flex flex-col h-full text-white">
                <p className="text-2xl font-semibold mb-2">{evento.descripcion}</p>
                <div className="mt-auto">
                  <p className="text-lg font-medium">Fecha: {evento.fecha}</p>
                  <p className="text-lg font-medium">Hora: {evento.hora}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
