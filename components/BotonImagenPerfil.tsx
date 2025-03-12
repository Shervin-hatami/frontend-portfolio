import Image from 'next/image'
import Link from 'next/link'

export default async function BotonImagenPerfil() {
  let imagenUrl = '/imagen-por-defecto.jpg';

  try {
    const response = await fetch('https://backend-portfolio-app.onrender.com/api/imagen-layout?populate=*', {
      next: { revalidate: 3600 } // Revalidar cada hora
    });
    const { data } = await response.json();

    if (data && data.imagenLayout?.url) {
      imagenUrl = data.imagenLayout.url.startsWith('http')
        ? data.imagenLayout.url
        : `https://backend-portfolio-app.onrender.com${data.imagenLayout.url}`;
    }
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
  }

  return (
    <Link href="/">
      <div className="cursor-pointer">
        <Image
          src={imagenUrl}
          alt="Imagen de perfil"
          width={50}
          height={50}
          className="rounded-full hover:opacity-80 transition-opacity"
          priority
        />
      </div>
    </Link>
  );
} 