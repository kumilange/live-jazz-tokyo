import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Event from '../components/Event';

it('should have a reserve button', () => {
  const wrapper = shallow(<Event
    event={{}}
    match={{ params: { id: 1 } }}
    receivedEventDetails={() => {}}
  />);
  expect(wrapper.find('#reserve')).to.have.length(1);
  expect(wrapper.find('#reserve').text()).to.equal('Reserve');
});
