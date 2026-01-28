import React from 'react';

import { About, Footer, Header, Skills, Testimonial, Work, Certifications, Team } from './container';
import Gallery from './container/Gallery/Gallery';
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
    <Gallery />
    <Testimonial />
    <Footer />
  </div>
);

export default App;
