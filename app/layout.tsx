// Importamos los tipos y componentes necesarios
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Button from "@/components/button1";

// Configuración de la fuente Inter de Google Fonts
// Cargamos solo el subconjunto "latin" para optimizar el rendimiento
const inter = Inter({ subsets: ["latin"] });

// Layout principal de la aplicación
// Define la estructura básica y los metadatos de la app
export const metadata = {
  title: 'Job Search App',
  description: 'Aplicación de búsqueda de empleos',
}

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
        {/* Barra de navegación fija en la parte superior */}
        <nav className="fixed top-0 w-full bg-gray-800 p-4 z-50">
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo o imagen de perfil */}
            <div className="w-12 h-12 bg-red-500 rounded-full">
              {/* Placeholder para la imagen de perfil */}
            </div>
            
            {/* Menú de navegación */}
            <div className="flex gap-4">
              {/* Reemplazamos los botones existentes con Button */}
              <Button isHome={true}>
                Home
              </Button>
              <Button>
                Options
              </Button>
              <Button>
                About me
              </Button>
            </div>
          </div>
        </nav>

        {/* Contenido principal */}
        {/* pt-20 añade padding superior para compensar la altura de la nav fija */}
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