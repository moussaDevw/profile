import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { RouterProvider, useRouter } from './lib/router';
import { updatePageMetadata } from './lib/seoMetadata';
import { CommercialNavbar } from './components/home/CommercialNavbar';
import { HomeHero } from './components/home/HomeHero';
import { ProblemsSolved } from './components/home/ProblemsSolved';
import { ServicesSection } from './components/home/ServicesSection';
import { SolutionsSection } from './components/home/SolutionsSection';
import { FeaturedProjects } from './components/home/FeaturedProjects';
import { WorkMethod } from './components/home/WorkMethod';
import { AboutFounder } from './components/home/AboutFounder';
import { FaqSection } from './components/home/FaqSection';
import { FinalCta } from './components/home/FinalCta';
import { HomeFooter } from './components/home/HomeFooter';
import { ServicesIndexPage } from './pages/ServicesIndexPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { SolutionsIndexPage } from './pages/SolutionsIndexPage';
import { SolutionDetailPage } from './pages/SolutionDetailPage';
import { ProjectsIndexPage } from './pages/ProjectsIndexPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalNoticePage } from './pages/LegalNoticePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { QuotePage } from './pages/QuotePage';

function AppContent() {
  const { routeInfo, locale } = useRouter();

      // Métadonnées SEO par défaut pour la page d'accueil
      useEffect(() => {
        if (routeInfo.routeId === 'home') {
          updatePageMetadata({
            title:
              locale === 'en'
                ? 'MusaTech | Custom Web, Mobile & Software Engineering Dakar'
                : 'MusaTech | Développement Web, Mobile & Logiciel sur Mesure Dakar',
            description:
              locale === 'en'
                ? 'MusaTech designs high-performance websites, mobile applications, and custom business platforms to elevate your brand and streamline operations.'
                : 'MusaTech conçoit des sites web professionnels, des applications mobiles et des plateformes métier sur mesure à Dakar, au Sénégal et à l’international.',
            canonicalPath: locale === 'en' ? '/en' : '/fr',
            frPath: '/fr',
            enPath: '/en',
            locale,
          });
        }
      }, [routeInfo.routeId, locale]);

      const renderPage = () => {
        switch (routeInfo.routeId) {
          case 'services':
            return (
              <main>
                <ServicesIndexPage />
              </main>
            );

          case 'service-detail':
            return (
              <main>
                <ServiceDetailPage slug={routeInfo.slug || 'sites-web'} />
              </main>
            );

          case 'solutions':
            return (
              <main>
                <SolutionsIndexPage />
              </main>
            );

          case 'solution-detail':
            return (
              <main>
                <SolutionDetailPage slug={routeInfo.slug || 'immobilier'} />
              </main>
            );

          case 'projects':
            return (
              <main>
                <ProjectsIndexPage />
              </main>
            );

          case 'project-detail':
            return (
              <main>
                <ProjectDetailPage slug={routeInfo.slug || 'assure-express'} />
              </main>
            );

          case 'about':
            return (
              <main>
                <AboutPage />
              </main>
            );

          case 'contact':
            return (
              <main>
                <ContactPage />
              </main>
            );

          case 'legal':
            return (
              <main>
                <LegalNoticePage />
              </main>
            );

      case 'privacy':
            return (
              <main>
                <PrivacyPolicyPage />
              </main>
            );

          case 'quote':
            return (
              <main>
                <QuotePage />
              </main>
            );

          case 'home':
          default:
            return (
              <main>
                <HomeHero />
                <ProblemsSolved />
                <ServicesSection />
                <SolutionsSection />
                <FeaturedProjects />
                <WorkMethod />
                <AboutFounder />
                <FaqSection />
                <FinalCta />
              </main>
            );
        }
      };

      return (
        <>
          <Analytics />
          <CommercialNavbar />
          {renderPage()}
          <HomeFooter />
        </>
      );
    }

    function App() {
      return (
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      );
    }

    export default App;
