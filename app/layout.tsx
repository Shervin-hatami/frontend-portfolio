// Importamos los tipos y componentes necesarios
import type { Metadata } from "next";
import { Inter, Space_Grotesk, Chakra_Petch } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/NavBar'

// Configuración de las fuentes de Google Fonts
const inter = Inter({ subsets: ["latin"] });

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
});

const chakraPetch = Chakra_Petch({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Metadatos de la aplicación
export const metadata: Metadata = {
  title: 'portfolio shervin hatami massoumpour',
  description: 'portfolio shervin hatami massoumpour',
};

// Componente principal de Layout que envuelve toda la aplicación
// children: Contenido de las páginas que se renderizarán dentro del layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Establecemos el idioma del documento como español
    <html lang="es">
      {/* Aplicamos la fuente Inter a todo el body */}
      <body className={inter.className}>
        <NavBar />
        <main className="pt-20">
          {children} {/* Aquí se renderiza el contenido de cada página */}
        </main>

        {/* Pie de página */}
        <footer className="bg-gray-800 text-white p-8 mt-12">
          <div className="container mx-auto">
            <p>Página de portfolio para ir tocando cosillas en Next.js y Tailwind CSS usando el Cursor AI.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}