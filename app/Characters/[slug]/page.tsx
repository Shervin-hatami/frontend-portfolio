import React from 'react';
import fetchCharacters from '../../../components/CharacterData';

export default async function Page({ params }: { params: { slug: string } }) {
    const characters = await fetchCharacters(); // Obtener personajes directamente
    const { slug } = await params; // No es necesario usar await aquí
    const character = characters.find(char => char.slug === slug); // Filtrar el personaje por slug

    if (!character) {
        return <div className='py-5'>No se encontró el personaje.</div>; // Manejo de error si no se encuentra el personaje
    }

    // Construir la URL de la imagen de manera similar a CharacterPage
    const imageUrl = `http://localhost:1337${character.photo.formats.medium?.url || character.photo.formats.small?.url}`;

    return (
        <>
            <div className="flex flex-col items-center py-5">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">{character.name}</h1>
                    <div className="mt-4">
                        {imageUrl ? (
                            <img className="rounded-lg" src={imageUrl} alt={character.name} />
                        ) : (
                            <div>No hay imagen disponible.</div> // Mensaje si no hay imagen
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}