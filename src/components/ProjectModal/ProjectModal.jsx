import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AiFillGithub } from 'react-icons/ai';
import { FiX, FiDownload, FiExternalLink } from 'react-icons/fi';

import { urlFor } from '../../client';
import './ProjectModal.scss';

const EASE = [0.16, 1, 0.3, 1];

const ProjectModal = ({ project, onClose }) => {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!project) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const hasLinks = project && (project.projectLink || project.codeLink);
  const hasGallery = project && project.gallery && project.gallery.length > 0;
  const hasDocuments = project && project.documents && project.documents.length > 0;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal__overlay"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            className="project-modal__panel"
            initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal__close"
              onClick={onClose}
              aria-label={t('work.close')}
            >
              <FiX />
            </button>

            {project.imgUrl && (
              <div className="project-modal__hero">
                <img src={urlFor(project.imgUrl).url()} alt={project.title} />
              </div>
            )}

            <div className="project-modal__body">
              <div className="project-modal__head">
                <h3 className="project-modal__title">{project.title}</h3>
                {project.tags && project.tags.length > 0 && (
                  <div className="project-modal__tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              {project.description && (
                <p className="project-modal__lead">{project.description}</p>
              )}

              {hasLinks && (
                <div className="project-modal__links">
                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="pm-btn pm-btn--primary"
                    >
                      <FiExternalLink aria-hidden="true" />
                      {t('work.liveDemo')}
                    </a>
                  )}
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noreferrer"
                      className="pm-btn pm-btn--ghost"
                    >
                      <AiFillGithub aria-hidden="true" />
                      {t('work.viewCode')}
                    </a>
                  )}
                </div>
              )}

              {hasGallery && (
                <section className="project-modal__section">
                  <h4 className="project-modal__section-title">{t('work.gallery')}</h4>
                  <div className="project-modal__gallery">
                    {project.gallery.map((img, i) => (
                      <a
                        key={img._key || i}
                        href={urlFor(img).url()}
                        target="_blank"
                        rel="noreferrer"
                        className="project-modal__gallery-item"
                      >
                        <img
                          src={urlFor(img).width(600).url()}
                          alt={`${project.title} ${i + 1}`}
                          loading="lazy"
                        />
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {hasDocuments && (
                <section className="project-modal__section">
                  <h4 className="project-modal__section-title">{t('work.documents')}</h4>
                  <ul className="project-modal__docs">
                    {project.documents.map((doc, i) => (
                      <li key={doc._key || i} className="project-modal__doc">
                        <div className="project-modal__doc-info">
                          <span className="project-modal__doc-title">{doc.title}</span>
                          {doc.description && (
                            <span className="project-modal__doc-desc">{doc.description}</span>
                          )}
                        </div>
                        {doc.fileUrl && (
                          <a
                            href={`${doc.fileUrl}?dl=${encodeURIComponent(doc.fileName || doc.title)}`}
                            className="pm-btn pm-btn--primary pm-btn--sm"
                          >
                            <FiDownload aria-hidden="true" />
                            {t('work.download')}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
