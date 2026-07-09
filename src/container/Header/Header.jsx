import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { FiDownload, FiArrowUpRight } from 'react-icons/fi';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';

const CV_LINK = 'https://drive.google.com/file/d/1gIS7wPJ53HDtu25DNUjmg79cpgQygRoF/view?usp=sharing';
const VALUES = ['Excellence', 'Responsabilité', 'Discipline', 'Intégrité'];

const EASE = [0.16, 1, 0.3, 1];

const Header = () => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  // Staggered "rise" entrance, disabled under prefers-reduced-motion.
  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <div className="app__header">
      <div className="app__header-grid">
        <div className="app__header-info">
          <motion.p className="hero-eyebrow" {...rise(0)}>
            {t('header.hello')}
          </motion.p>

          <motion.h1 className="hero-name" {...rise(0.08)}>
            Christ <span>APETOGBO</span>
          </motion.h1>

          <motion.div className="hero-roles" {...rise(0.16)}>
            <span>{t('header.title1')}</span>
            <span className="hero-roles-sep" aria-hidden="true" />
            <span>{t('header.title2')}</span>
          </motion.div>

          <motion.div className="hero-cta" {...rise(0.24)}>
            <a href={CV_LINK} className="btn-primary" target="_blank" rel="noreferrer">
              <FiDownload aria-hidden="true" />
              {t('header.downloadCV')}
            </a>
            <a href="#work" className="btn-ghost">
              {t('header.viewProjects')}
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="app__header-img"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          <div className="hero-photo">
            <span className="hero-photo-block" aria-hidden="true" />
            <img src={images.profile} alt="Christ APETOGBO" />
          </div>
        </motion.div>
      </div>

      <motion.ul className="app__header-values" {...rise(0.38)}>
        {VALUES.map((value, i) => (
          <li key={value}>
            <span className="value-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="value-label">{value}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default AppWrap(Header, 'home');
