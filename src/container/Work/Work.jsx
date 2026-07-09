import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { ProjectModal } from '../../components';
import { urlFor, client } from '../../client';
import './Work.scss';

const WORKS_QUERY = `*[_type == "works"]{
  _id, title, description, projectLink, codeLink, imgUrl, tags, gallery,
  documents[]{ _key, title, description, "fileUrl": file.asset->url, "fileName": file.asset->originalFilename }
}`;

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [selectedProject, setSelectedProject] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    client.fetch(WORKS_QUERY).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags && work.tags.includes(item)));
      }
    }, 500);
  };

  const filterLabels = {
    Cybersecurity: t('work.filters.cybersecurity'),
    'Web App': t('work.filters.webApp'),
    'Mobile App': t('work.filters.mobileApp'),
    Innovation: t('work.filters.innovation'),
    All: t('work.filters.all'),
  };

  return (
    <>
      <h2 className="head-text">
        <Trans i18nKey="work.title">
          My <span>Projects</span> & Achievements
        </Trans>
      </h2>

      <div className="app__work-filter">
        {['Cybersecurity', 'Web App', 'Mobile App', 'Innovation', 'All'].map((item) => (
          <div
            key={item}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {filterLabels[item]}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work) => (
          <div className="app__work-item app__flex" key={work._id}>
            <div className="app__work-img app__flex">
              {work.imgUrl && <img src={urlFor(work.imgUrl).url()} alt={work.name} />}

              <motion.div
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                <motion.div
                  role="button"
                  tabIndex={0}
                  aria-label={t('work.viewDetails')}
                  onClick={() => setSelectedProject(work)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedProject(work);
                  }}
                  whileInView={{ scale: [0, 1] }}
                  whileHover={{ scale: [1, 0.9] }}
                  transition={{ duration: 0.25 }}
                  className="app__flex"
                >
                  <AiFillEye />
                </motion.div>

                <a href={work.codeLink} target="_blank" rel="noreferrer" aria-label={t('work.viewCode')}>
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags && work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);
