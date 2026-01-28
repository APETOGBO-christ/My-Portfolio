import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Certifications.scss';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const query = '*[_type == "certifications"] | order(date desc)';

    client.fetch(query).then((data) => {
      setCertifications(data);
    });
  }, []);

  const openModal = (cert) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  return (
    <div>
      <h2 className="head-text">
        <Trans i18nKey="certifications.title">
          My <span>Certifications</span> & Training
        </Trans>
      </h2>

      <div className="app__certifications-marquee">
        <div className="app__certifications-track">
          {[...certifications, ...certifications].map((cert, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__certification-item"
              key={index}
            >
              <div className="app__certification-content">
                {cert.logo && (
                  <div
                    className="app__certification-logo"
                    onClick={() => openModal(cert)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && openModal(cert)}
                  >
                    <img src={urlFor(cert.logo).url()} alt={cert.issuer} />
                    <div className="app__certification-overlay">
                      <span>{t('certifications.clickToView')}</span>
                    </div>
                  </div>
                )}
                <div className="app__certification-info">
                  <h3 className="bold-text">{cert.name}</h3>
                  <p className="p-text">{cert.issuer}</p>
                  {cert.date && (
                    <p className="p-text cert-date">
                      {new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p className="p-text cert-id">ID: {cert.credentialId}</p>
                  )}
                </div>
                {cert.credentialUrl && (
                  <div className="app__certification-link">
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer">
                      <button type="button" className="p-text">{t('certifications.viewCert')}</button>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for full-size certificate view */}
      {selectedCert && (
        <div className="app__certification-modal" onClick={closeModal}>
          <div className="app__certification-modal-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="app__certification-modal-close" onClick={closeModal}>×</button>
            <img src={urlFor(selectedCert.logo).url()} alt={selectedCert.name} />
            <div className="app__certification-modal-info">
              <h3>{selectedCert.name}</h3>
              <p>{selectedCert.issuer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppWrap(
  MotionWrap(Certifications, 'app__certifications'),
  'certifications',
  'app__primarybg',
);
