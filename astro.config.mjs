// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog'
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';

import { BLOG_URL, GITHUB_URL, LOCAL_PORT } from './src/constants';

const getSite = () => {
    return import.meta.env.DEV ? `http://localhost:${LOCAL_PORT}/` : BLOG_URL
}

// https://astro.build/config
export default defineConfig({
    server: { port: LOCAL_PORT },
    site: getSite(),
    integrations: [starlight({
        credits: true,
        title: 'gleniosp',
        customCss: [
            './src/styles/global.css',
        ],
        locales: {
            root: { label: 'English', lang: 'en' },
            // temporarily disable extra languages as it'll require more work for the RSS part and the rest of theme
            // 'pt-br': { label: 'Português do Brasil', lang: 'pt-BR' }, 
        },
        social: [
            {
                icon: 'github',
                label: 'GitHub',
                href: 'https://github.com/gleniosp'
            },
            {
                icon: 'linkedin',
                label: 'LinkedIn',
                href: GITHUB_URL
            }
        ],
        sidebar: [],
        components: {
            Footer: '@components/ConditionalFooter.astro',
        },
        plugins: [
            starlightBlog({
                authors: {
                    gleniosp: {
                        name: 'Glênio Silva Pimentel',
                        title: 'Software Engineer',
                        picture: `${GITHUB_URL}.png`,
                        url: getSite(),
                    },
                },
                metrics: {
                    readingTime: true,
                },
            })
        ],
    }), alpinejs()],
    vite: {
        plugins: [tailwindcss()]
    }
});