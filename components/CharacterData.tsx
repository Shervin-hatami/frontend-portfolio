

// Define the type for stats
export type Stat = {
    id: number;
    statName: string;
    statValue: number;
};

// Define the type for habilities
export type Hability = {
    id: number;
    CombatStyle: string;
    PasiveSkill: string;
};

// Define the type for build
export type Build = {
    id: number;
    stats: Stat[]; // Array of stats
    habilities: Hability; // Assuming habilities is a single object, adjust if it's an array
};

// Define the type for a character
export type Character = {
    id: number;
    name: string;
    slug: string;
    build: Build[]; // Change to an array of Build
    photo: {
        formats: {
            medium?: {
                url: string;
            };
            small?: {
                url: string;
            };
        };
    };
};

// Componente que obtiene los datos de los personajes
const fetchCharacters = async (): Promise<Character[]> => {
    const response = await fetch('https://backend-portfolio-app.onrender.com/api/characters?populate=build.stats,build.habilities,photo');
    if (!response.ok) {
        throw new Error('Error fetching characters');
    }
    const data = await response.json();
    return data.data; // Accede al array de personajes
};

export default fetchCharacters;
