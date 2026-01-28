import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-unresolved
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        {t('about.line1')} <span>{t('about.secure')}</span> <br />
        {t('about.line2')} <span>{t('about.innovative')}</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            {about.imgUrl && <img src={urlFor(about.imgUrl).url()} alt={about.title} />}
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <div className="p-text" style={{ marginTop: 10 }}>
              <PortableText value={about.description} />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
