import Image from 'next/image'
import Link from 'next/link'

export default async function BotonImagenPerfil() {
  let imagenUrl = '/imagen-por-defecto.jpg';
  let altText = 'Imagen de perfil del portfolio';

  try {
    const response = await fetch('https://backend-portfolio-app.onrender.com/api/imagen-layout?populate=*', {
      next: { revalidate: 30 } // Revalidar cada 30 segundos
    });
    const { data } = await response.json();

    if (data.imagenLayout?.url) {
      imagenUrl = data.imagenLayout.url;
      altText = data.imagenLayout.alternativeText || altText;
    }
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
  }

  return (
    <Link 
      href="/" 
      aria-label="Ir a la página principal"
      className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
    >
      <div className="cursor-pointer rounded-full shadow-[0_5px_0_0] shadow-slate-400 active:transform active:translate-y-[5px] active:shadow-none transition-all">
        <div className="border-2 border-blue-900 rounded-full w-[50px] h-[70px] md:w-[60px] md:h-[80px] overflow-hidden">
          <Image
            src={imagenUrl}
            alt={altText}
            width={60}
            height={80}
            className="rounded-full hover:opacity-80 transition-opacity w-full h-full object-cover"
            priority
            unoptimized={imagenUrl.includes('cloudinary')}
            loading="eager"
          />
        </div>
      </div>
    </Link>
  );
} 