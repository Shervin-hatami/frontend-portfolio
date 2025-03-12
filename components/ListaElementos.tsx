import React from 'react';

// Define y exporta la interfaz para los elementos
export interface SegundoObjeto {
    id: string;
    nombre: string;
    slug: string;
    foto?: string; // Agregar la propiedad foto si existe
}

export interface Elemento {
    id: string;
    nombre: string;
    descripcion: string;
    foto: string | null; // URL de la foto, puede ser null
    segundoObjetos: SegundoObjeto[]; // Relación con otros objetos
}

// Componente que obtiene y muestra los elementos
const ListaElementos = async () => {
    const response = await fetch('https://backend-portfolio-app.onrender.com/api/primer-objetos?populate[foto]=true&populate[segundo_objetos][populate][foto]=true', {
        next: { revalidate: 3600 } // Revalidar cada hora
    });

    // Verificar si la respuesta es correcta
    if (!response.ok) {
        console.error("Error en la solicitud:", response.statusText);
        console.log(await response.text()); // Imprimir el cuerpo de la respuesta para más detalles
        return <div>Error al cargar los datos.</div>;
    }

    const data = await response.json();
    console.log(data); // Verificar la respuesta

    // Verificar si data y data.data existen
    if (!data || !data.data) {
        console.error("No se recibieron datos de la API");
        return <div>Error al cargar los datos.</div>;
    }

    const elementosData: Elemento[] = data.data.map((item: any) => ({
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        foto: item.foto?.url ? (item.foto.url.startsWith('http') ? item.foto.url : `https://backend-portfolio-app.onrender.com${item.foto.url}`) : null,
        segundoObjetos: item.segundo_objetos.map((obj: any) => {
            return {
                id: obj.id,
                nombre: obj.nombre,
                slug: obj.slug,
                foto: obj.foto?.url ? (obj.foto.url.startsWith('http') ? obj.foto.url : `https://backend-portfolio-app.onrender.com${obj.foto.url}`) : null
            };
        }) || []
    }));

    return (
        <div className="flex flex-col p-10">
            {elementosData.map((elemento) => (
                <div key={elemento.id} className="flex flex-row w-full mb-8">
                    <div className="relative w-1/2 h-64 bg-cover bg-center rounded-lg overflow-hidden shadow-lg border border-gray-300" style={{ backgroundImage: `url(${elemento.foto})` }}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
                            <h2 className="text-lg font-semibold text-white">{elemento.nombre}</h2>
                            <p className="text-gray-300 text-sm">{elemento.descripcion}</p>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 items-stretch">
                        <div className="flex flex-wrap justify-start items-stretch">
                            {elemento.segundoObjetos.map((obj) => (
                                <div key={obj.id} className="m-2 p-4 rounded-lg bg-gray-200 text-gray-800 w-60 h-full text-center shadow-md transition-transform transform hover:scale-105">
                                    {obj.foto && (
                                        <div className="bg-cover bg-center h-20 rounded-lg mb-2" style={{ backgroundImage: `url(${obj.foto})` }} />
                                    )}
                                    <h4 className="text-md font-semibold">{obj.nombre}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaElementos;