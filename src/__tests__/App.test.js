import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../components/templates/App';

it('renders without crashing', () => {
  const wrapper = shallow(<App initializeEvents={() => {}} />);
  expect(wrapper.find('#top')).to.have.length(1); // 0
});
