import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Event from '../components/Event';

it('should have a reserve button', () => {
  const wrapper = shallow(<Event
    event={{}}
    match={{ params: { id: 1 } }}
    receivedEventDetails={() => {}}
    onReserveClicked={() => {}}
  />);
  expect(wrapper.find('#reserve')).to.have.length(1);
  expect(wrapper.find('#reserve').text()).to.equal('Reserve');
});

describe('reserve button', () => {
  it('should dispatch when clicked', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<Event
      event={{}}
      match={{ params: { id: 1 } }}
      receivedEventDetails={() => {}}
      onReserveClicked={spy}
    />);
    wrapper.find('#reserve').simulate('click');
    expect(spy.calledOnce);
  });
});
