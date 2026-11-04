import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import i18n from '../i18n';
import { Locale, RouteResolution, resolveRoute, getEquivalentRoute } from './i18nRoutes';

export interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  locale: Locale;
  routeInfo: RouteResolution;
  changeLanguage: (targetLocale: Locale) => void;
  getEquivalentUrl: (targetLocale: Locale) => string;
}

const defaultRouteInfo = resolveRoute('/');

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
  locale: 'fr',
  routeInfo: defaultRouteInfo,
  changeLanguage: () => {},
  getEquivalentUrl: () => '/',
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const routeInfo = resolveRoute(path);
  const locale = routeInfo.locale;

  // Synchronise la langue i18next avec l'URL
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to.startsWith('#')) {
      // Lien d'ancrage sur la page courante
      const el = document.querySelector(to);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (
      to.startsWith('http://') ||
      to.startsWith('https://') ||
      to.startsWith('mailto:') ||
      to.startsWith('tel:')
    ) {
      window.location.href = to;
      return;
    }

    const [targetPath, hash] = to.split('#');
    const cleanPath = targetPath || '/';

    if (window.location.pathname !== cleanPath) {
      window.history.pushState({}, '', to);
      setPath(cleanPath);
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  }, []);

  const changeLanguage = useCallback((targetLocale: Locale) => {
    const targetUrl = getEquivalentRoute(path, targetLocale);
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('i18nextLng', targetLocale);
      } catch {
        // Ignorer si localStorage restreint
      }
    }
    i18n.changeLanguage(targetLocale);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = targetLocale;
    }
    navigate(targetUrl);
  }, [path, navigate]);

  const getEquivalentUrl = useCallback((targetLocale: Locale) => {
    return getEquivalentRoute(path, targetLocale);
  }, [path]);

  return (
    <RouterContext.Provider
      value={{
        path,
        navigate,
        locale,
        routeInfo,
        changeLanguage,
        getEquivalentUrl,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  activeClassName?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = '',
  activeClassName = 'is-active',
  onClick,
  ...rest
}) => {
  const { path, navigate } = useRouter();
  const isActive = path === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      className={`${className} ${isActive ? activeClassName : ''}`.trim()}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
};
