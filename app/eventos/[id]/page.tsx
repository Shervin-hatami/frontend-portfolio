import { EventoProps } from "@/components/bannerEvento";
import { Space_Grotesk, Chakra_Petch } from 'next/font/google'

interface EventoDetailProps {
  params: {
    id: string
  }
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

export default async function EventoDetail({ params }: EventoDetailProps) {
  try {
    const url = `https://backend-portfolio-app.onrender.com/api/banner-eventos?filters[id]=${params.id}&populate=*`;
    
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return <div>Error al cargar el evento: {response.status}</div>;
    }

    const { data } = await response.json();

    if (!data || data.length === 0) {
      return <div>Evento no encontrado</div>;
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
        ? `https://backend-portfolio-app.onrender.com${eventoData.imagenes.formats.medium.url}`
        : '/placeholder-image.jpg',
      contenido: eventoData.contenido
    };

    return (
      <div className="min-h-screen">
        {/* Sección hero con imagen de fondo */}
        <div 
          className="relative h-screen bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${evento.imagen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay oscuro con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
          
          {/* Contenido sobre la imagen */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8 max-w-4xl backdrop-blur-sm bg-black/20 rounded-xl">
              <h2 className={`${chakraPetch.className} text-6xl font-bold mb-8 text-emerald-200 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-wide`}>
                {evento.descripcion}
              </h2>
              <div className={`${spaceGrotesk.className} text-3xl text-emerald-50 drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]`}>
                <p className="mb-3">Fecha: {evento.fecha}</p>
                <p>Hora: {evento.hora}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del evento */}
        <div className="container mx-auto py-16 px-4 bg-gray-50">
          <div className="prose prose-lg max-w-none">
            {evento.contenido && Array.isArray(evento.contenido) 
              ? evento.contenido.map((block, index) => (
                  <p key={index} className="text-gray-800 leading-relaxed">
                    {block.children?.map((child: { text: string }) => 
                      child.text || ''
                    ).join('')}
                  </p>
                ))
              : evento.contenido}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error al cargar el evento:', error);
    return <div>Error al cargar el evento</div>;
  }
}
