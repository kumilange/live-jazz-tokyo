import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Header from '../../../containers/organisms/Header';
import Event from '../../../containers/organisms/Event';
import User from '../../../containers/organisms/User';
import Pay from '../../../containers/organisms/Pay';
import Footer from '../../organisms/Footer';
import Confirmation from '../../../containers/organisms/Confirmation';
import AddEvent from '../../../containers/organisms/AddEvent';
import Top from '../../../containers/organisms/Top';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Route render={({ location }) =>
      (<TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames="fade"
        >
          <div id="app">
            <Header />
            <Route exact path="/" component={Top} />
            <Route path="/event/:id" component={Event} />
            <Route path="/user/:id" component={User} />
            <Route path="/pay" component={Pay} />
            <Route path="/confirmation" component={Confirmation} />
            <Route path="/addevent" component={AddEvent} />
            <Footer />
          </div>
        </CSSTransition>
      </TransitionGroup>)}
    />
  </BrowserRouter>
);

export default App;

