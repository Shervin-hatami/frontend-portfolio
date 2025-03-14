import React from 'react';
import fetchCharacters from '../../../components/CharacterData';
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ 
    subsets: ['latin'],
    display: 'swap',
});

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
        return (
            <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4'>
                <h1 className={`${spaceGrotesk.className} text-3xl font-bold text-yellow-500`}>
                    Personaje no encontrado
                </h1>
            </div>
        );
    }

    const imageUrl = character.photo?.formats?.medium?.url || 
                    character.photo?.formats?.small?.url || 
                    '/placeholder-image.jpg';

    return (
        <article className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="relative aspect-[16/9]">
                        <Image 
                            src={imageUrl.startsWith('http') ? imageUrl : '/placeholder-image.jpg'} 
                            alt={`Imagen de ${character.name}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-bold text-center text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
                                {character.name}
                            </h1>
                        </div>
                    </div>
                    {character.build && character.build.length > 0 && (
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {character.build.map((buildItem, index) => (
                                    <div key={index} className="bg-gray-700 rounded-xl p-6">
                                        <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-4 text-yellow-400`}>
                                            Build {index + 1}
                                        </h2>
                                        {buildItem.stats && (
                                            <div className="mb-6">
                                                <h3 className={`${spaceGrotesk.className} text-xl font-semibold mb-3 text-yellow-300`}>
                                                    Estadísticas
                                                </h3>
                                                <div className="space-y-2">
                                                    {buildItem.stats.map(stat => (
                                                        <div key={stat.id} className="flex justify-between items-center text-gray-100">
                                                            <span>{stat.statName}</span>
                                                            <span className="font-mono">{stat.statValue}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {buildItem.habilities && (
                                            <div>
                                                <h3 className={`${spaceGrotesk.className} text-xl font-semibold mb-3 text-yellow-300`}>
                                                    Habilidades
                                                </h3>
                                                <div className="space-y-2 text-gray-100">
                                                    <div>
                                                        <span className="font-semibold">Estilo de Combate:</span>
                                                        <p>{buildItem.habilities.CombatStyle}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold">Habilidad Pasiva:</span>
                                                        <p>{buildItem.habilities.PasiveSkill}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}