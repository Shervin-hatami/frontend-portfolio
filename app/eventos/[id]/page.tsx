import { EventoProps } from "@/components/bannerEvento";
import { Space_Grotesk, Chakra_Petch } from 'next/font/google'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface EventoDetailProps {
  params: Promise<{
    id: string
  }>
}

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
});

const chakraPetch = Chakra_Petch({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

async function getEvento(id: string) {
  const url = new URL('https://backend-portfolio-app.onrender.com/api/banner-eventos');
  url.searchParams.append('filters[id]', id);
  url.searchParams.append('populate', '*');
  
  const response = await fetch(url, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error al cargar el evento: ${response.status}`);
  }

  const { data } = await response.json();
  return data;
}

export async function generateMetadata({ params }: EventoDetailProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const data = await getEvento(resolvedParams.id);
    return {
      title: data[0]?.descripcion || `Evento ${resolvedParams.id}`,
      description: data[0]?.contenido?.[0]?.children?.[0]?.text || 'Detalles del evento',
    };
  } catch (error) {
    return {
      title: 'Evento',
      description: 'Detalles del evento',
    };
  }
}

export default async function EventoDetail({ params }: EventoDetailProps) {
  try {
    const resolvedParams = await params;
    const data = await getEvento(resolvedParams.id);

    if (!data || data.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Evento no encontrado</h1>
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              Volver a la página principal
            </Link>
          </div>
        </div>
      );
    }

    const eventoData = data[0];
    const fechaEvento = new Date(eventoData.fecha);

    const evento: EventoProps = {
      id: eventoData.id,
      descripcion: eventoData.descripcion,
      fecha: fechaEvento.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      hora: fechaEvento.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      imagen: eventoData.imagenes?.formats?.medium?.url
        ? eventoData.imagenes.formats.medium.url
        : '/placeholder-image.jpg',
      contenido: eventoData.contenido
    };

    return (
      <article className="min-h-screen">
        {/* Sección hero con imagen de fondo */}
        <div 
          className="relative h-[50vh] md:h-screen bg-cover bg-center"
          aria-label="Imagen principal del evento"
        >
          <Image
            src={evento.imagen}
            alt={`Imagen del evento: ${evento.descripcion}`}
            layout="fill"
            objectFit="cover"
            priority
            className="transition-opacity duration-300"
          />
          
          {/* Overlay oscuro con gradiente */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"
            aria-hidden="true"
          ></div>
          
          {/* Contenido sobre la imagen */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4 md:p-8 max-w-4xl backdrop-blur-sm bg-black/20 rounded-xl">
              <h1 
                className={`${chakraPetch.className} text-4xl md:text-6xl font-bold mb-6 md:mb-8 text-emerald-200 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-wide`}
              >
                {evento.descripcion}
              </h1>
              <div 
                className={`${spaceGrotesk.className} text-xl md:text-3xl text-emerald-50 drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]`}
              >
                <p className="mb-3">
                  <span className="sr-only">Fecha del evento:</span>
                  {evento.fecha}
                </p>
                <p>
                  <span className="sr-only">Hora del evento:</span>
                  {evento.hora}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del evento */}
        <div className="container mx-auto py-12 md:py-16 px-4">
          <div className="prose prose-lg max-w-none">
            {evento.contenido && Array.isArray(evento.contenido) 
              ? evento.contenido.map((block, index) => (
                  <p key={index} className="text-gray-800 leading-relaxed mb-6">
                    {block.children?.map((child: { text: string }, childIndex: number) => 
                      <span key={childIndex}>{child.text || ''}</span>
                    ).join('')}
                  </p>
                ))
              : evento.contenido}
          </div>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error al cargar el evento:', error);
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error al cargar el evento</h1>
          <p className="text-gray-600 mb-6">Por favor, intenta nuevamente más tarde.</p>
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            Volver a la página principal
          </Link>
        </div>
      </div>
    );
  }
}
