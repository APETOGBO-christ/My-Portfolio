import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">{t('header.hello')}</p>
              <h1 className="head-text">Christ APETOGBO</h1>
            </div>
          </div>

          <div className="tag-cmp app__flex">
            <p className="p-text">{t('header.title1')}</p>
            <p className="p-text">{t('header.title2')}</p>
          </div>
          <div className="cv-download">
            <a href="/Christ_APETOGBO_CV.pdf" download>
              <button type="button" className="p-text">{t('header.downloadCV')}</button>
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img src={images.profile} alt="profile_bg" />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt="profile_circle"
          className="overlay_circle"
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {['Excellence', 'Responsabilité', 'Discipline', 'Intégrité'].map((item, index) => (
          <div className={`circle-cmp app__flex ${index === 3 ? 'circle-small' : ''}`} key={`circle-${index}`}>
            <p className="p-text stylized-word">{item}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, 'home');
