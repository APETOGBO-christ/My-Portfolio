import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 className="head-text">{t('footer.title')}</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:christapetogbo9@gmail.com" className="p-text">christapetogbo9@gmail.com</a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+22879795414" className="p-text">+228 79 79 54 14</a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" placeholder={t('footer.yourName')} name="username" value={username} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder={t('footer.yourEmail')} name="email" value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder={t('footer.yourMessage')}
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? t('footer.send') : t('footer.sending')}</button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            {t('footer.thankYou')}
          </h3>
        </div>
      )}

      {/* Vision Statement */}
      <div className="app__footer-vision">
        <div className="vision-quote">
          <span className="quote-mark">&ldquo;</span>
          <p className="p-text vision-text">
            Bâtir des startups qui comptent, portées par l’excellence, créées pour l’impact, et orientées vers la liberté.
            <br />
            Pour l’Afrique. Pour le monde.
          </p>
          <span className="quote-mark closing">&rdquo;</span>
        </div>
        <p className="vision-signature">— Christ APETOGBO</p>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__primarybg',
);
