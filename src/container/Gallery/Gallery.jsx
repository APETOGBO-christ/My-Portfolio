import React, { useState, useEffect } from 'react';
import { Trans } from 'react-i18next';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Gallery.scss';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const query = '*[_type == "gallery"]';

    client.fetch(query).then((data) => {
      setGallery(data);
    });
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <h2 className="head-text" style={{ whiteSpace: 'nowrap' }}>
        <Trans i18nKey="gallery.title">
          My <span>Gallery</span>
        </Trans>
      </h2>

      <div className="app__gallery-container">
        {gallery.map((item, index) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="app__gallery-item"
            key={index}
          >
            <div className="app__gallery-img">
              {item.imgUrl && (
                <img src={urlFor(item.imgUrl).url()} alt={item.title} />
              )}
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__gallery-hover"
              >
                <div className="app__gallery-content">
                  <h4 className="bold-text">{item.title}</h4>
                  <p className="p-text" style={{ marginTop: 10, color: '#fff' }}>
                    {item.description}
                  </p>
                  {item.tags && (
                    <div className="app__gallery-tag">
                      <p className="p-text">{item.tags[0]}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Gallery, 'app__gallery'),
  'gallery',
  'app__primarybg',
);
