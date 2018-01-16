import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';

import Event from '../components/organisms/Event';

xit('should have a reserve button', () => {
  const wrapper = render(<Event
    event={{}}
    match={{ params: { id: 1 } }}
    receivedEventDetails={() => {}}
    onReserveClicked={() => {}}
  />);
  expect(wrapper.find('button.StripeCheckout')).to.have.length(1);
  expect(wrapper.find('button.StripeCheckout').text()).to.equal('Reserve');
});
