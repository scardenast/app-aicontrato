
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [top, setTop] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isBlog = location.pathname.startsWith('/blog');

  // detect whether user has scrolled the page down by 10px 
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileNavOpen]);
  
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (isHome) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    } else {
        navigate(`/#${id}`);
    }
  };
  
  const handleMobileLinkScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileNavOpen(false);
    // Use a timeout to allow the menu to start closing before navigation
    setTimeout(() => {
        handleScrollTo(e, id);
    }, 150);
  };

  // Determine styles based on scroll and page
  const isScrolledOrNotHome = !top || !isHome;
  
  const pillStyles = isScrolledOrNotHome
    ? 'bg-white/90 backdrop-blur-sm shadow-lg' 
    : 'bg-white/20 backdrop-blur-sm';
  const linkColor = isScrolledOrNotHome ? 'text-slate-800' : 'text-white';
  const ctaButtonStyles = isScrolledOrNotHome
    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
    : 'bg-white/20 text-white hover:bg-white/40';
  const mobileIconColor = isScrolledOrNotHome ? 'text-slate-800' : 'text-white';

  return (
    <>
        <header className="fixed w-full z-30 top-0 px-4 sm:px-6 py-4">
            {/* The pill itself */}
            <div className={`max-w-6xl mx-auto rounded-full transition-all duration-300 ease-in-out ${pillStyles}`}>
                <div className="flex items-center justify-between h-14 px-5">

                    {/* Site branding */}
                    <div className="flex-shrink-0 mr-4">
                        <Link to="/" className="flex items-center" aria-label="AIContrato" onClick={() => setMobileNavOpen(false)}>
                            <svg width="28" height="28" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" className="mr-3 transition-colors duration-300 ease-in-out">
                                <circle cx="32" cy="32" r="30" fill={isScrolledOrNotHome ? '#020617' : 'white'} stroke={isScrolledOrNotHome ? '#6366F1' : '#818CF8'} strokeWidth="2"/>
                                <text x="32" y="45" textAnchor="middle" fill={isScrolledOrNotHome ? 'white' : '#020617'} fontFamily="sans-serif" fontSize="32" fontWeight="bold">
                                AI
                                </text>
                            </svg>
                            <span className={`text-lg font-bold transition duration-300 ease-in-out ${linkColor}`}>
                                AIContrato
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex flex-grow items-center justify-center">
                        <ul className="flex items-center space-x-8">
                            <li><Link to="/" className={`font-medium hover:text-indigo-500 transition duration-150 ease-in-out ${linkColor}`}>Inicio</Link></li>
                            {isHome && (
                                <>
                                    <li><a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')} className={`font-medium hover:text-indigo-500 transition duration-150 ease-in-out ${linkColor}`}>Cómo Funciona</a></li>
                                    <li><a href="#faq" onClick={(e) => handleScrollTo(e, 'faq')} className={`font-medium hover:text-indigo-500 transition duration-150 ease-in-out ${linkColor}`}>FAQ</a></li>
                                </>
                            )}
                            <li>
                                <Link to="/blog" className={`font-medium transition duration-150 ease-in-out ${linkColor} ${isBlog ? '!text-indigo-400' : 'hover:text-indigo-500'}`}>
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex flex-shrink-0 items-center justify-end ml-4">
                        <a href="#form-section" onClick={(e) => handleScrollTo(e, 'form-section')} className={`font-semibold rounded-full px-5 py-2 flex items-center justify-center transition-all duration-300 ease-in-out text-sm ${ctaButtonStyles}`}>
                        Crear Contrato
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setMobileNavOpen(true)}
                            aria-label="Abrir menú"
                            className={`p-2 rounded-full transition-colors duration-300 ${isScrolledOrNotHome ? 'hover:bg-slate-200' : 'hover:bg-white/20'}`}
                        >
                            <svg className={`w-6 h-6 ${mobileIconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </header>

        {/* Mobile menu */}
        <div className={`md:hidden`}>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${mobileNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileNavOpen(false)}
                aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <aside
                id="mobile-menu"
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${mobileNavOpen ? 'translate-x-0' : 'translate-x-full'}`}
                aria-hidden={!mobileNavOpen}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex justify-between items-center p-5 border-b border-slate-700/50">
                        <Link to="/" className="flex items-center" aria-label="AIContrato" onClick={() => setMobileNavOpen(false)}>
                            <svg width="24" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" className="mr-2">
                                <circle cx="32" cy="32" r="30" fill="white" stroke="#818CF8" strokeWidth="2"/>
                                <text x="32" y="45" textAnchor="middle" fill="#020617" fontFamily="sans-serif" fontSize="32" fontWeight="bold">
                                AI
                                </text>
                            </svg>
                            <span className="text-lg font-bold text-white">AIContrato</span>
                        </Link>
                        <button
                            onClick={() => setMobileNavOpen(false)}
                            aria-label="Cerrar menú"
                            className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors"
                        >
                           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                           </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-grow p-5">
                        <ul className="flex flex-col space-y-2">
                            <li><Link to="/" onClick={() => setMobileNavOpen(false)} className="block text-lg py-3 px-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">Inicio</Link></li>
                            <li><a href="#how-it-works" onClick={(e) => handleMobileLinkScroll(e, 'how-it-works')} className="block text-lg py-3 px-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">Cómo Funciona</a></li>
                            <li><a href="#faq" onClick={(e) => handleMobileLinkScroll(e, 'faq')} className="block text-lg py-3 px-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">FAQ</a></li>
                            <li><Link to="/blog" onClick={() => setMobileNavOpen(false)} className="block text-lg py-3 px-3 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </nav>

                    {/* Sidebar Footer (CTA) */}
                    <div className="p-5 border-t border-slate-700/50">
                        <a
                            href="#form-section"
                            onClick={(e) => handleMobileLinkScroll(e, 'form-section')}
                            className="font-semibold rounded-full px-5 py-3 w-full flex items-center justify-center transition-all duration-300 ease-in-out text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
                        >
                            Crear Contrato Ahora
                        </a>
                    </div>
                </div>
            </aside>
        </div>
    </>
  );
};

export default Header;
