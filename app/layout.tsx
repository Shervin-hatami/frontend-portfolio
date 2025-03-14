// Importamos los tipos y componentes necesarios
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Chakra_Petch } from "next/font/google";
import "./globals.css";
import NavBar from '@/components/NavBar'

// Configuración de las fuentes de Google Fonts con display swap para mejor rendimiento
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const chakraPetch = Chakra_Petch({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

// Configuración del viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
  themeColor: '#1f2937',
}

// Metadatos mejorados de la aplicación
export const metadata: Metadata = {
  title: 'Shervin portfolio - Diseñador y desarrollador.',
  description: 'portfolio de shervin hatami massoumpour, diseñador y desarrollador de aplicaciones y contenido interactivo. descripcion de trabajos y proyectos personales, eventos relacionados y colaboraciones para proyectos futuros.',
  other: {
    'google-site-verification': 'WB3uixur644G5IABYK9rYMmRt7S7ozY38NNki4Q5_n0',
  },
};

// Componente principal de Layout que envuelve toda la aplicación
// children: Contenido de las páginas que se renderizarán dentro del layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://backend-portfolio-app.onrender.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black">
          Saltar al contenido principal
        </a>
        <NavBar />
        <main id="main-content" className="pt-20 min-h-screen">
          {children} {/* Aquí se renderiza el contenido de cada página */}
        </main>

        {/* Pie de página */}
        <footer className="bg-gray-800 text-white p-8 mt-12" role="contentinfo">
          <div className="container mx-auto text-center">
            <p>Página de portfolio.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}