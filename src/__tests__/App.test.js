import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../components/templates/App/App';

it('renders without crashing', () => {
  const wrapper = shallow(<App initializeEvents={() => {}} />);
  expect(wrapper.find('#app')).to.have.length(1); // 0
});
