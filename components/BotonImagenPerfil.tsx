import Image from 'next/image'
import Link from 'next/link'

export default async function BotonImagenPerfil() {
  let imagenUrl = '/imagen-por-defecto.jpg';

  try {
    const response = await fetch('https://backend-portfolio-app.onrender.com/api/imagen-layout?populate=*', {
      next: { revalidate: 30 } // Revalidar cada 30 segundos
    });
    const { data } = await response.json();

    if (data.imagenLayout?.url) {
      imagenUrl = data.imagenLayout.url;
    }
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
  }

  return (
    <Link href="/">
      <div className="cursor-pointer rounded-full shadow-[0_5px_0_0] shadow-slate-400 active:transform active:translate-y-[5px] active:shadow-none transition-all">
        <div className="border-2 border-blue-900 rounded-full">
          <Image
            src={imagenUrl}
            alt="Imagen de perfil"
            width={50}
            height={50}
            className="rounded-full hover:opacity-80 transition-opacity"
            priority
            unoptimized={imagenUrl.includes('cloudinary')}
          />
        </div>
      </div>
    </Link>
  );
} 