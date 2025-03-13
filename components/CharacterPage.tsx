import fetchCharacters, { Character } from './CharacterData'; // Importa la función y el tipo
import Link from 'next/link';

const CharacterPage = async () => {
    const characters: Character[] = await fetchCharacters(); // Obtiene los personajes de manera asincrónica

    return (
        <div className='px-5 py-5'>
            <h1>Selecciona un Personaje</h1>
            <div>
                {characters.map(character => {
                    // Obtener la URL de la imagen con validación
                    const imageUrl = character.photo?.formats?.small?.url || 
                                   character.photo?.formats?.medium?.url || 
                                   '/placeholder-image.jpg';

                    return (
                        <div key={character.id} className="character-card">
                            <Link href={`/Characters/${character.slug}`}>
                                <div className="border-2 border-black rounded-lg overflow-hidden relative transition-transform duration-300 transform hover:scale-105 group">
                                    <img 
                                        src={imageUrl.startsWith('http') ? imageUrl : '/placeholder-image.jpg'}
                                        alt={character.name} 
                                        className="w-full h-auto transition-transform duration-300 transform hover:scale-110"
                                    />
                                    <h2 className="absolute top-2 left-1/2 transform -translate-x-1/2 text-5xl text-yellow-500 shadow-md transition-transform duration-500 transform group-hover:translate-y-[200px] group-hover:text-6xl group-hover:font-bold z-10">{character.name}</h2>
                                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-50"></div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CharacterPage;
