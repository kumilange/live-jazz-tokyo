import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewEvent } from '../../actions';
import AddEvent from '../../components/organisms/AddEvent';

class AddEventContainer extends Component {
  constructor() {
    super();
    this.state = {
      addEventFields: {
        eventName: '',
        artistName: '',
        venueName: '',
        address: '',
        price: '',
        date: '',
        start: '',
        end: '',
      },
    };
    this.setFormState = this.setFormState.bind(this);
    this.validatePrice = this.validatePrice.bind(this);
  }

  setFormState(value, field) {
    const newState = {
      addEventFields: {
        ...this.state.addEventFields,
        [field]: value,
      },
    };

    this.setState({ ...newState });
  }

  validatePrice(value, oldval) {
    if ((value !== '' && ((isNaN(parseInt(value, 10)) ||
      isNaN(Number(value))) ||
      parseInt(value, 10) !== Number(value) ||
      parseInt(value, 10) < 0 ||
      parseInt(value, 10) === parseInt(oldval, 10)))) {
      return oldval;
    }
    return value;
  }

  render() {
    return (
      <AddEvent
        {...this.props}
        addEventFields={this.state.addEventFields}
        setFormState={this.setFormState}
        validatePrice={this.validatePrice}
      />
    );
  }
}

const mapStateToProps = state => ({
  jwt: state.user.jwt,
  userProfile: state.user.userProfile,
  addEventResponse: state.event.addEventResponse,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addNewEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddEventContainer);
