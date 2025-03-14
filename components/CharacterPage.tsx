import fetchCharacters, { Character } from './CharacterData'; // Importa la función y el tipo
import Link from 'next/link';
import Image from 'next/image';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ 
    subsets: ['latin'],
    display: 'swap',
});

const CharacterPage = async () => {
    const characters: Character[] = await fetchCharacters(); // Obtiene los personajes de manera asincrónica

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8'>
            <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-bold mb-12 text-center text-yellow-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}>
                Selecciona un Personaje
            </h1>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {characters.map(character => {
                    // Obtener la URL de la imagen con validación
                    const imageUrl = character.photo?.formats?.medium?.url || 
                                   character.photo?.formats?.small?.url || 
                                   '/placeholder-image.jpg';

                    return (
                        <article 
                            key={character.id} 
                            className="transform transition-all duration-300 hover:scale-105"
                            aria-labelledby={`character-name-${character.id}`}
                        >
                            <Link 
                                href={`/Characters/${character.slug}`}
                                className="block bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                <div className="relative">
                                    <div className="aspect-[4/5] relative">
                                        <Image 
                                            src={imageUrl.startsWith('http') ? imageUrl : '/placeholder-image.jpg'}
                                            alt={`Imagen de ${character.name}`}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover"
                                            priority={false}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h2 
                                            id={`character-name-${character.id}`}
                                            className={`${spaceGrotesk.className} text-2xl sm:text-3xl font-bold text-yellow-400 text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}
                                        >
                                            {character.name}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default CharacterPage;
