import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../components/App';

it('renders without crashing', () => {
  const wrapper = shallow(<App initializeEvents={() => {}} />);
  expect(wrapper.find('.App')).to.have.length(1); // 0
});
