import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { RouterProvider } from '../lib/router';
import { ServicesIndexPage } from '../pages/ServicesIndexPage';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { SolutionsIndexPage } from '../pages/SolutionsIndexPage';
import { SolutionDetailPage } from '../pages/SolutionDetailPage';
import { ProjectsIndexPage } from '../pages/ProjectsIndexPage';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { LegalNoticePage } from '../pages/LegalNoticePage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';

describe('MusaTech Bilingual Sub-pages Integration Tests (/en/...)', () => {
  beforeEach(() => {
    window.scrollTo = () => {};
  });

  const renderWithRoute = (initialPath: string, component: React.ReactNode) => {
    window.history.pushState({}, '', initialPath);
    return render(
      <RouterProvider>
        {component}
      </RouterProvider>
    );
  };

  describe('1. Services Pages in English', () => {
    it('renders /en/services with translated English copy and localized cards', () => {
      renderWithRoute('/en/services', <ServicesIndexPage />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /High-impact digital engineering designed for tangible business ROI/i
      );
      expect(screen.getByText('Our 4 Core Offers')).toBeInTheDocument();
      expect(screen.getByText('Professional Websites')).toBeInTheDocument();
      expect(screen.getByText('Custom E-commerce')).toBeInTheDocument();
      expect(screen.getByText('Custom Business Software')).toBeInTheDocument();
      expect(screen.getByText('Mobile Applications')).toBeInTheDocument();
      expect(screen.getAllByText('Request a Proposal')[0]).toBeInTheDocument();
    });

    it('renders /en/services/websites with full English translations across all sections', () => {
      renderWithRoute('/en/services/websites', <ServiceDetailPage slug="websites" />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Professional Websites');
      expect(screen.getByText(/Who is this service designed for\?/i)).toBeInTheDocument();
      expect(screen.getByText(/Which operational bottlenecks do we eliminate\?/i)).toBeInTheDocument();
      expect(screen.getByText(/Included starter scope vs\. paid add-ons/i)).toBeInTheDocument();
      expect(screen.getByText(/Available Options & Upgrades/i)).toBeInTheDocument();
      expect(screen.getByText(/How we engineer your professional websites/i)).toBeInTheDocument();
      expect(screen.getByText(/Questions about Professional Websites/i)).toBeInTheDocument();
      
      const ctaLink = screen.getByRole('link', { name: /Request a Quote for this Service/i });
      expect(ctaLink).toBeInTheDocument();
      expect(ctaLink).toHaveAttribute('href', '/en/quote?service=sites-web');
    });

    it('renders /en/services/business-software with English content', () => {
      renderWithRoute('/en/services/business-software', <ServiceDetailPage slug="business-software" />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Custom Business Software & Platforms');
      expect(screen.getByText('Average estimated delivery:')).toBeInTheDocument();
      expect(screen.getByText('4 to 8 weeks')).toBeInTheDocument();
    });
  });

  describe('2. Solutions Pages in English', () => {
    it('renders /en/solutions with translated industry directory and guarantees', () => {
      renderWithRoute('/en/solutions', <SolutionsIndexPage />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /Software built for the operational realities of your industry/i
      );
      expect(screen.getByText('B2B Industry Expertise')).toBeInTheDocument();
      expect(screen.getByText('Real Estate')).toBeInTheDocument();
      expect(screen.getByText('Education')).toBeInTheDocument();
      expect(screen.getByText('Retail & Commerce')).toBeInTheDocument();
      expect(screen.getByText('Logistics')).toBeInTheDocument();
      expect(screen.getByText(/Why choose custom software over generic off-the-shelf tools\?/i)).toBeInTheDocument();
      expect(screen.getByText('Full Intellectual Property')).toBeInTheDocument();
      expect(screen.getByText('Seamless Local & Mobile Integration')).toBeInTheDocument();
      expect(screen.getByText('Direct Founder Collaboration')).toBeInTheDocument();
    });

    it('renders /en/solutions/real-estate with English sector-specific content', () => {
      renderWithRoute('/en/solutions/real-estate', <SolutionDetailPage slug="real-estate" />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /Digitize your real estate agency and streamline property management/i
      );
      expect(screen.getByText(/What operational roadblocks do we solve in your business\?/i)).toBeInTheDocument();
      expect(screen.getByText(/What MusaTech can engineer for your organization/i)).toBeInTheDocument();
      expect(screen.getByText(/Measurable operational impact for your organization/i)).toBeInTheDocument();
      expect(screen.getByText(/Our technical provenance in this domain/i)).toBeInTheDocument();
      expect(screen.getByText(/Proven Foundation & Client Data Protection/i)).toBeInTheDocument();
      expect(screen.getByText(/Frequently Asked Questions About Real Estate/i)).toBeInTheDocument();
      
      const ctaLinks = screen.getAllByRole('link', { name: /Request a quote for Real Estate/i });
      expect(ctaLinks.length).toBeGreaterThanOrEqual(1);
      expect(ctaLinks[0].getAttribute('href')).toMatch(/\/en\/quote\?sector=/);
    });

    it('renders /en/solutions/logistics with English sector-specific content and transparency card', () => {
      renderWithRoute('/en/solutions/logistics', <SolutionDetailPage slug="logistics" />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /Optimize your shipments, fleet tracking, and transport documentation/i
      );
      expect(screen.getByText('Transparency & Client Confidentiality')).toBeInTheDocument();
      expect(screen.getByText('Proven Foundation & Client Data Protection')).toBeInTheDocument();
    });
  });

  describe('3. Case Studies & Realisations Pages in English', () => {
    it('renders /en/case-studies with English filter pills and cards', () => {
      renderWithRoute('/en/case-studies', <ProjectsIndexPage />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /Production platforms engineered for real-world impact/i
      );
      expect(screen.getByText('All Case Studies')).toBeInTheDocument();
      expect(screen.getByText('InsurTech & Mobile')).toBeInTheDocument();
      expect(screen.getByText('HealthTech & WebRTC')).toBeInTheDocument();
      expect(screen.getByText('EdTech & AI')).toBeInTheDocument();
      expect(screen.getByText('Logistics & CRM')).toBeInTheDocument();
      expect(screen.getByText(/Authorship & Provenance Transparency:/i)).toBeInTheDocument();

      const caseStudyLinks = screen.getAllByRole('link', { name: /Read Technical Case Study/i });
      expect(caseStudyLinks.length).toBe(4);
    });

    it('renders /en/case-studies/assure-express with all 11 technical sections translated into English', () => {
      renderWithRoute('/en/case-studies/assure-express', <ProjectDetailPage slug="assure-express" />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Assure Express');
      expect(screen.getByText('Cross-Platform Mobile App & Modular Backend')).toBeInTheDocument();
      expect(screen.getByText('Project Scope & Authorship')).toBeInTheDocument();
      expect(screen.getByText('MusaTech Transparency Declaration:')).toBeInTheDocument();
      expect(screen.getByText('02 · Business Context')).toBeInTheDocument();
      expect(screen.getByText('03 · Core Problem')).toBeInTheDocument();
      expect(screen.getByText('04 · Engineered Solution')).toBeInTheDocument();
      expect(screen.getByText('05 · Key Capabilities')).toBeInTheDocument();
      expect(screen.getByText('06 · Exact Role of MusaTech Founder')).toBeInTheDocument();
      expect(screen.getByText('Personal Contribution of Moussa Diagne')).toBeInTheDocument();
      expect(screen.getByText('07 · Technologies Used')).toBeInTheDocument();
      expect(screen.getByText('08 · Technical Challenges')).toBeInTheDocument();
      expect(screen.getByText('09 · Verified Results')).toBeInTheDocument();
      expect(screen.getByText('10 · Screenshots & Demonstrations')).toBeInTheDocument();
      expect(screen.getByText('11 · Ready to Engineer Your Solution?')).toBeInTheDocument();

      expect(screen.getByRole('link', { name: /Discuss a Similar Project/i })).toBeInTheDocument();
    });
  });

  describe('4. About, Contact, Legal & Privacy Pages in English', () => {
    it('renders /en/about with English biography and professional background', () => {
      renderWithRoute('/en/about', <AboutPage />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /Direct technical guidance from initial kickoff to live launch/i
      );
      expect(screen.getByText('Full Stack Software Engineer & Founder')).toBeInTheDocument();
      expect(screen.getByText(/freelance engineering brand to support businesses/i)).toBeInTheDocument();
      expect(screen.getByText('Dakar, Senegal (GMT / UTC timezone)')).toBeInTheDocument();
      expect(screen.getByText('Senegal, West Africa & Global Remote')).toBeInTheDocument();
      expect(screen.getByText('How do we collaborate remotely?')).toBeInTheDocument();
      expect(screen.getByText('My Quality Commitments on Every Project')).toBeInTheDocument();
    });

    it('renders /en/contact with English channels and handles form error validation in English', () => {
      renderWithRoute('/en/contact', <ContactPage />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /Let’s talk about your project directly/i
      );
      expect(screen.getByText('Direct Contact & Inquiries')).toBeInTheDocument();
      expect(screen.getByText('Professional Email')).toBeInTheDocument();
      expect(screen.getByText('Direct WhatsApp & Phone')).toBeInTheDocument();
      expect(screen.getByText('Send a Direct Message')).toBeInTheDocument();

      // Form validation check
      const submitBtn = screen.getByRole('button', { name: /Send my message/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText('Please provide your full name.')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
      expect(screen.getByText('Please enter your message (at least 10 characters).')).toBeInTheDocument();
    });

    it('renders /en/legal-notice with English publisher details and terms', () => {
      renderWithRoute('/en/legal-notice', <LegalNoticePage />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Legal Notice');
      expect(screen.getByText('Regulatory Compliance Notice:')).toBeInTheDocument();
      expect(screen.getByText('1. Platform Publisher')).toBeInTheDocument();
      expect(screen.getByText('2. Publication Director')).toBeInTheDocument();
      expect(screen.getByText('3. Website Hosting')).toBeInTheDocument();
      expect(screen.getByText('4. Intellectual Property & Trademarks')).toBeInTheDocument();
      expect(screen.getByText('5. Limitation of Liability')).toBeInTheDocument();
      expect(screen.getByText('6. Applicable Law & Jurisdiction')).toBeInTheDocument();
    });

    it('renders /en/privacy-policy with English data protection commitments', () => {
      renderWithRoute('/en/privacy-policy', <PrivacyPolicyPage />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Privacy Policy');
      expect(screen.getByText('Data Protection Commitment:')).toBeInTheDocument();
      expect(screen.getByText('1. Data Controller')).toBeInTheDocument();
      expect(screen.getByText('2. Personal Data Collected')).toBeInTheDocument();
      expect(screen.getByText('3. Purposes of Processing & Legal Basis')).toBeInTheDocument();
      expect(screen.getByText('4. Data Retention Period')).toBeInTheDocument();
      expect(screen.getByText('5. Data Recipients & Non-Sale Guarantee')).toBeInTheDocument();
      expect(screen.getByText('6. Communication Security')).toBeInTheDocument();
      expect(screen.getByText('7. Your Rights Over Your Data')).toBeInTheDocument();
      expect(screen.getByText('8. Analytics & Cookie Policy')).toBeInTheDocument();
    });
  });
});
