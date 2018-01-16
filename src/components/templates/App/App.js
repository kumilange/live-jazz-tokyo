import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../../../containers/organisms/Header';
import Event from '../../../containers/organisms/Event';
import User from '../../../containers/organisms/User';
import Pay from '../../../containers/organisms/Pay';
import Footer from '../../../components/organisms/Footer/Footer';
import Confirmation from '../../../containers/organisms/Confirmation';
import AddEvent from '../../../containers/organisms/AddEvent';
import Top from '../../../containers/organisms/Top';
import './App.css';

const App = () => (
  <BrowserRouter>
    <div id="app">
      <Header />
      <Route exact path="/" component={Top} />
      <Route exact path="/event/:id" component={Event} />
      <Route exact path="/user/:id" component={User} />
      <Route exact path="/pay" component={Pay} />
      <Route exact path="/confirmation" component={Confirmation} />
      <Route exact path="/addevent" component={AddEvent} />
      <Footer />
    </div>
  </BrowserRouter>);

export default App;

