// app/sitemap.ts (¡Nota: cambiamos la extensión!)
import { MetadataRoute } from 'next';
import { parseString } from 'xml2js';
import { promisify } from 'util';

// Configuración de revalidación
export const revalidate = 3600; // Revalidar cada hora

type SitemapUrl = {
    url: string;
    lastModified: string;
    priority: number;
    changeFrequency: "daily" | "monthly" | "always" | "hourly" | "weekly" | "yearly" | "never";
}


interface XMLResult {
    urlset: {
        url: Array<{
            loc: string[];
            lastmod: string[];
            priority: string[];
            changefreq: string[];
        }>;
    };
}

const parseXML = promisify(parseString);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Obtener sitemaps estáticos
    const staticUrls: SitemapUrl[] = [
        { 
            url: 'https://shervin-portfolio.vercel.app/',
            lastModified: new Date().toISOString(),
            priority: 1.0,
            changeFrequency: 'weekly'
        },
        { 
            url: 'https://shervin-portfolio.vercel.app/pagina_prueba',
            lastModified: new Date().toISOString(),
            priority: 0.8,
            changeFrequency: 'monthly'
        },
        { 
            url: 'https://shervin-portfolio.vercel.app/Characters',
            lastModified: new Date().toISOString(),
            priority: 0.8,
            changeFrequency: 'monthly'
        },
    ];

    try {
        // Obtener sitemaps dinámicos de Strapi con opciones de caché
        const response = await fetch(
            'https://backend-portfolio-app.onrender.com/api/strapi-5-sitemap-plugin/sitemap.xml',
            {
                next: {
                    revalidate: 3600 // Revalidar la caché cada hora
                }
            }
        );

        if (!response.ok) {
            throw new Error('Error al obtener el sitemap de Strapi');
        }

        const xmlText = await response.text();
        const result = await parseXML(xmlText) as XMLResult;
        const urls = result.urlset.url || [];

        // Transformar los datos de Strapi
        const dynamicUrls: SitemapUrl[] = urls.map(url => ({
            url: url.loc[0],
            lastModified: url.lastmod[0],
            priority: parseFloat(url.priority[0]),
            changeFrequency: url.changefreq[0] as SitemapUrl['changeFrequency']
        }));

        // Combinar ambos sitemaps
        return [...staticUrls, ...dynamicUrls];
    } catch (error) {
        console.error('Error al generar el sitemap:', error);
        // En caso de error, devolver al menos las URLs estáticas
        return staticUrls;
    }
}