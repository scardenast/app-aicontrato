import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const BlogIndexPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    
    // Ensure 'All' is first, then unique categories from posts
    const categories = useMemo(() => ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))], []);

    const filteredPosts = useMemo(() => {
        if (activeCategory === 'All') return blogPosts;
        return blogPosts.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    const featuredPost = filteredPosts[0];
    const otherPosts = filteredPosts.slice(1);

    const PostCard = ({ post }: { post: typeof blogPosts[0] }) => (
       <article key={post.slug} className="flex flex-col group">
          <Link to={`/blog/${post.slug}`} className="block overflow-hidden rounded-lg mb-4">
            <img 
                src={post.imageUrl} 
                alt={`Imagen para el artículo "${post.title}"`} 
                className="w-full aspect-video object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
            />
          </Link>
          <div className="flex flex-col flex-grow">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
              <span className="font-semibold text-indigo-400">{post.category}</span>
              <span className="text-slate-600">&bull;</span>
              <span>{post.date}</span>
            </div>
            <h3 className="text-xl font-bold mb-3 flex-grow">
               <Link to={`/blog/${post.slug}`} className="hover:text-indigo-400 transition-colors duration-200">{post.title}</Link>
            </h3>
            <div className="flex items-center gap-3 mt-auto">
               <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover"/>
               <span className="text-slate-300 text-sm font-medium">{post.author.name}</span>
            </div>
          </div>
       </article>
    );

    return (
        <div className="bg-slate-900 text-white pt-24 md:pt-28 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <header className="py-12 md:py-16 border-b border-slate-800">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Nuestro Blog</h1>
                        <p className="mt-4 text-lg text-slate-300">
                            Consejos, guías y noticias para arrendadores y arrendatarios en Chile.
                        </p>
                    </div>
                </header>
                
                <div className="flex flex-wrap gap-2 my-8 md:my-10">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 ${
                                activeCategory === category
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="space-y-16">
                    {featuredPost && (
                        <div className="relative pl-6 md:pl-8 border-l-4 border-indigo-500 group">
                            <div className="flex items-center gap-4 mb-4">
                                <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-10 h-10 rounded-full object-cover"/>
                                <div>
                                    <p className="text-slate-200 font-semibold">{featuredPost.author.name}</p>
                                    <p className="text-sm text-slate-400">{featuredPost.date}</p>
                                </div>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                                <Link to={`/blog/${featuredPost.slug}`} className="hover:text-indigo-400 transition-colors duration-200">{featuredPost.title}</Link>
                            </h2>
                            <p className="text-slate-300 max-w-3xl mb-6 text-lg leading-relaxed">{featuredPost.excerpt}</p>
                            <Link to={`/blog/${featuredPost.slug}`} className="font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                                Leer más <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    )}
                    
                    {otherPosts.length > 0 && (
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pt-12 border-t border-slate-800">
                            {otherPosts.map(post => (
                               <PostCard key={post.slug} post={post} />
                            ))}
                         </div>
                    )}

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20 border-t border-slate-800">
                            <h3 className="text-xl font-semibold">No se encontraron artículos</h3>
                            <p className="text-slate-400 mt-2">No hay artículos en la categoría "{activeCategory}". Intenta con otra.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogIndexPage;
