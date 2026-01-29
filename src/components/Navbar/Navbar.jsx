import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { images } from '../../constants';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Navbar.scss';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { t } = useTranslation();

  const menuItems = ['home', 'about', 'work', 'skills', 'contact'];

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {menuItems.map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{t(`nav.${item}`)}</a>
          </li>
        ))}
      </ul>

      {/* <LanguageSwitcher /> */}

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {menuItems.map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {t(`nav.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
