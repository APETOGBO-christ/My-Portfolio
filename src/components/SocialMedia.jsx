import React from 'react';
import { BsLinkedin, BsGithub, BsFacebook } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://www.linkedin.com/in/christapetogbo/" target="_blank" rel="noreferrer">
        <BsLinkedin />
      </a>
    </div>
    <div>
      <a href="https://github.com/APETOGBO-christ" target="_blank" rel="noreferrer">
        <BsGithub />
      </a>
    </div>
    <div>
      <a href="https://web.facebook.com/profile.php?id=100094152437857" target="_blank" rel="noreferrer">
        <BsFacebook />
      </a>
    </div>
  </div>
);

export default SocialMedia;
