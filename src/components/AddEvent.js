import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddEvent extends Component {
  render() {
    const failed = !this.props.addEventResponse.addSuccess
      && this.props.addEventResponse.addSuccess !== undefined;
    return (
      <div>
        <form onSubmit={(event) => {
          this.props.onFormSubmit(event, this.props.addEventFields, this.props.history);
        }
        }
        >
          <div>
            <label htmlFor="eventName">Name:</label>
            <input
              type="text"
              id="eventName"
              name="event_name"
              onChange={this.props.onEventNameInput}
            />
          </div>
          <div>
            <label htmlFor="artist">ArtistID</label>
            <input
              type="text"
              id="artist"
              name="artist_name"
              onChange={this.props.onArtistInput}
            />
          </div>
          <div>
            <label htmlFor="venue">VenueID</label>
            <input
              type="text"
              id="venue"
              name="venue_name"
              onChange={this.props.onVenueInput}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={this.props.onAddressInput}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              onChange={this.props.onPriceInput}
            />
          </div>
          <div>
            <label htmlFor="start">Opening Time:</label>
            <input
              type="text"
              id="start"
              name="opening_time"
              onChange={this.props.onStartTimeInput}
            />
          </div>
          <div>
            <label htmlFor="end">Closing Time</label>
            <input
              type="text"
              id="end"
              name="closing_time"
              onChange={this.props.onEndTimeInput}
            />
          </div>
          <div className="button">
            <button type="submit" >Create</button>
          </div>
          { failed ? <p>Submit failed!  Check data and try again.</p> : <div /> }
        </form>
      </div>
    );
  }
}

AddEvent.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onEventNameInput: PropTypes.func.isRequired,
  onArtistInput: PropTypes.func.isRequired,
  onVenueInput: PropTypes.func.isRequired,
  onAddressInput: PropTypes.func.isRequired,
  onPriceInput: PropTypes.func.isRequired,
  onStartTimeInput: PropTypes.func.isRequired,
  onEndTimeInput: PropTypes.func.isRequired,
  addEventResponse: PropTypes.shape(),
  addEventFields: PropTypes.shape().isRequired,
  history: PropTypes.shape(),
};

AddEvent.defaultProps = {
  history: undefined,
  addEventResponse: {},
};

export default AddEvent;
