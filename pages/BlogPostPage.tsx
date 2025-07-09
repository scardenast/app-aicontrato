import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import NotFoundPage from './NotFoundPage';

const monthMap: { [key: string]: string } = {
  'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04', 'mayo': '05', 'junio': '06',
  'julio': '07', 'agosto': '08', 'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
};

const toISOString = (dateString: string): string => {
    if (!dateString) return new Date().toISOString().split('T')[0];
    const parts = dateString.toLowerCase().replace(' de ', ' ').replace(',', '').split(' ');
    if (parts.length < 3) return new Date().toISOString().split('T')[0];

    const day = parts[0].padStart(2, '0');
    const month = monthMap[parts[1]];
    const year = parts[2];

    if (!day || !month || !year) return new Date().toISOString().split('T')[0];
    return `${year}-${month}-${day}`;
};

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);

    const blogPostSchema = useMemo(() => {
        if (!post) return null;
        return {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.imageUrl,
            "author": {
                "@type": "Person",
                "name": post.author.name
            },
            "publisher": {
                "@type": "Organization",
                "name": "AIContrato",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://your-domain.com/logo.png"
                }
            },
            "datePublished": toISOString(post.date),
            "dateModified": toISOString(post.date),
            "description": post.excerpt,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://your-domain.com/#/blog/${post.slug}`
            }
        };
    }, [post]);

    if (!post) {
        return <NotFoundPage />;
    }
    
    // Simple content renderer
    const renderContent = (content: string) => {
        return content.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null;
            return (
                <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                </p>
            );
        });
    };

    return (
        <>
            {blogPostSchema && (
                 <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
                />
            )}
            <div className="bg-slate-900 text-slate-300 pt-24 md:pt-28 pb-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="mb-8">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Volver al Blog
                        </Link>
                    </div>

                    <article>
                        <header className="mb-8 border-b border-slate-800 pb-8">
                            <p className="text-base font-semibold text-indigo-400 tracking-wide uppercase">{post.category}</p>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-4">{post.title}</h1>
                            <div className="flex items-center gap-4 text-slate-400 mt-4">
                                <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold text-slate-200">{post.author.name}</p>
                                    <p className="text-sm">{post.date}</p>
                                </div>
                            </div>
                        </header>

                        <img src={post.imageUrl} alt={`Imagen para el artículo "${post.title}"`} className="rounded-xl my-8 aspect-[16/9] object-cover w-full" />
                        
                        <div className="prose-styles text-lg text-slate-300">
                            {renderContent(post.content)}
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
};

export default BlogPostPage;