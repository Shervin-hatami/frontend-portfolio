import React from 'react';
import fetchCharacters from '../../../components/CharacterData';

type Props = {
    params: Promise<{
        slug: string
    }>
}

export default async function Page({ params }: Props) {
    const characters = await fetchCharacters();
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const character = characters.find(char => char.slug === slug);

    if (!character) {
        return <div className='py-5'>No se encontró el personaje.</div>;
    }

    // Construir la URL de la imagen de manera similar a CharacterPage
    const imageUrl = character.photo.formats.medium?.url || character.photo.formats.small?.url;

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