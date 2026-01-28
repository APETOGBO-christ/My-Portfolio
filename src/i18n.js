import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      nav: {
        home: 'accueil',
        about: 'à propos',
        work: 'projets',
        skills: 'compétences',
        certifications: 'certifications',
        team: 'équipe',
        contact: 'contact',
      },
      header: {
        hello: 'Bonjour, je suis',
        title1: 'Leader & Entrepreneur',
        title2: 'Informatique et Cybersécurité',
        downloadCV: 'Télécharger CV',
      },
      about: {
        line1: 'Construire des',
        secure: 'Solutions Sécurisées',
        line2: 'et des',
        innovative: 'Projets Innovants',
      },
      work: {
        title: 'Mes <1>Projets</1> & Réalisations',
        filters: {
          cybersecurity: 'Cybersécurité',
          webApp: 'Application Web',
          mobileApp: 'Application Mobile',
          innovation: 'Innovation',
          all: 'Tout',
        },
      },
      skills: {
        title: 'Compétences & Expériences',
      },
      certifications: {
        title: 'Mes <1>Certifications</1> & Formations',
        viewCert: 'Voir le Certificat',
        clickToView: '🔍 Cliquer pour voir en taille réelle',
      },
      team: {
        title: 'Mon <1>Équipe</1> & Mentors',
        description: 'Les personnes formidables qui me soutiennent, me guident et collaborent avec moi',
      },
      gallery: {
        title: 'Ma <1>Galerie</1>',
      },
      footer: {
        title: 'Prenez un café & discutons ensemble',
        yourName: 'Votre Nom',
        yourEmail: 'Votre Email',
        yourMessage: 'Votre Message',
        send: 'Envoyer le Message',
        sending: 'Envoi en cours...',
        thankYou: 'Merci de m\'avoir contacté !',
        copyright: '@2025 Christ APETOGBO Tous droits réservés',
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'home',
        about: 'about',
        work: 'work',
        skills: 'skills',
        certifications: 'certifications',
        team: 'team',
        contact: 'contact',
      },
      header: {
        hello: 'Hello, I am',
        title1: 'Leader & Entrepreneur',
        title2: 'Cybersecurity Expert',
        downloadCV: 'Download CV',
      },
      about: {
        line1: 'Building',
        secure: 'Secure Solutions',
        line2: 'and',
        innovative: 'Innovative Projects',
      },
      work: {
        title: 'My <1>Projects</1> & Achievements',
        filters: {
          cybersecurity: 'Cybersecurity',
          webApp: 'Web App',
          mobileApp: 'Mobile App',
          innovation: 'Innovation',
          all: 'All',
        },
      },
      skills: {
        title: 'Skills & Experiences',
      },
      certifications: {
        title: 'My <1>Certifications</1> & Training',
        viewCert: 'View Certificate',
        clickToView: '🔍 Click to view full size',
      },
      team: {
        title: 'My <1>Team</1> & Mentors',
        description: 'The amazing people who support, guide, and collaborate with me',
      },
      footer: {
        title: 'Take a coffee & chat with me',
        yourName: 'Your Name',
        yourEmail: 'Your Email',
        yourMessage: 'Your Message',
        send: 'Send Message',
        sending: 'Sending...',
        thankYou: 'Thank you for getting in touch!',
        copyright: '@2025 Christ APETOGBO All rights reserved',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    lng: 'fr',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
