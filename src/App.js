import React from 'react';

import { About, Footer, Header, Skills, Testimonial, Work, Certifications, Team } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => (
  <div className="app">
    <Navbar />
    <Header />
    <About />
    <Work />
    <Skills />
    <Certifications />
    <Team />
    <Testimonial />
    <Footer />
  </div>
);

export default App;
