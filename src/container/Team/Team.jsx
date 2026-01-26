import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Team.scss';

const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const query = '*[_type == "team"]';

    client.fetch(query).then((data) => {
      setTeam(data);
    });
  }, []);

  return (
    <div>
      <h2 className="head-text">My <span>Team</span> & Mentors</h2>
      <p className="p-text" style={{ marginTop: '1rem', textAlign: 'center', maxWidth: '600px', margin: '1rem auto' }}>
        The amazing people who support, guide, and collaborate with me
      </p>

      <div className="app__team">
        {team.map((member, index) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__team-item"
            key={member.name + index}
          >
            {member.photo && (
              <div className="app__team-img">
                <img src={urlFor(member.photo).url()} alt={member.name} />
              </div>
            )}
            <div className="app__team-content">
              <h4 className="bold-text">{member.name}</h4>
              <p className="p-text team-role">{member.role}</p>
              {member.organization && (
                <p className="p-text team-org">{member.organization}</p>
              )}
              {member.description && (
                <p className="p-text team-desc">{member.description}</p>
              )}
              {member.linkedIn && (
                <div className="team-social">
                  <a href={member.linkedIn} target="_blank" rel="noreferrer" aria-label={`${member.name} LinkedIn Profile`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Team, 'app__team'),
  'team',
  'app__whitebg',
);
