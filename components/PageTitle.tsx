import Link from 'next/link';

async function getTitle() {
  try {
    const response = await fetch('https://backend-portfolio-app.onrender.com/api/texto1', {
      next: { revalidate: 150 } // Revalidar cada 2.5 minutos (150 segundos)
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener el título');
    }
    
    const data = await response.json();
    return data.data.texto1 || 'Portfolio de trabajos';
    
  } catch (error) {
    console.error('Error:', error);
    return 'Portfolio de trabajos'; // Título por defecto en caso de error
  }
}

export default async function PageTitle() {
  const title = await getTitle();
  
  return (
    <Link href="/" className="inline-block text-white hover:text-gray-300 transition-all duration-300 ease-in-out hover:scale-[1.02] transform">
      <h1>{title}</h1>
    </Link>
  );
}
