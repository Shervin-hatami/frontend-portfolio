async function getTitle() {
  try {
    const response = await fetch('https://backend-portfolio-app.onrender.com/api/texto1', {
      next: { revalidate: 3600 } // Revalidar cada hora
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
    <h1 className="text-4xl font-bold mb-8">{title}</h1>
  );
}
