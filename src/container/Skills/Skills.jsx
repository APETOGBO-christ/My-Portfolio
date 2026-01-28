import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Skills.scss';

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      // Helper to parse French dates like "Novembre 2025"
      const parseDate = (dateStr) => {
        if (!dateStr) return 0;
        const months = {
          janvier: 0,
          février: 1,
          mars: 2,
          avril: 3,
          mai: 4,
          juin: 5,
          juillet: 6,
          août: 7,
          septembre: 8,
          octobre: 9,
          novembre: 10,
          décembre: 11,
        };
        const parts = dateStr.trim().split(' ');
        if (parts.length < 2) return 0;

        const monthName = parts[0].toLowerCase();
        const year = parseInt(parts[1], 10);
        const month = months[monthName] !== undefined ? months[monthName] : 0;

        return new Date(year, month).getTime();
      };

      // Sort descending (newest first)
      const sortedData = data.sort((a, b) => parseDate(b.year) - parseDate(a.year));
      setExperiences(sortedData);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">{t('skills.title')}</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="app__skills-category"
              key={skill.name}
            >
              <div className="app__skills-category-header">
                <h3 className="bold-text">{skill.name}</h3>
                {skill.description && (
                  <p className="p-text skills-desc">{skill.description}</p>
                )}
              </div>
              {skill.icon && (
                <div className="app__skills-category-icon">
                  <img src={urlFor(skill.icon).url()} alt={skill.name} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div
              className="app__skills-exp-item"
              key={experience.year}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <React.Fragment key={work.name}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tooltip-id={work.name}
                      data-tooltip-content={work.desc}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <Tooltip
                      id={work.name}
                      className="skills-tooltip"
                    />
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);
