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
    const imageUrl = character.photo?.formats?.medium?.url || 
                    character.photo?.formats?.small?.url || 
                    '/placeholder-image.jpg';

    return (
        <>
            <div className="flex flex-col items-center py-5">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">{character.name}</h1>
                    <div className="mt-4">
                        <img 
                            className="rounded-lg" 
                            src={imageUrl.startsWith('http') ? imageUrl : '/placeholder-image.jpg'} 
                            alt={character.name} 
                        />
                    </div>
                </div>
            </div>
        </>
    );
}