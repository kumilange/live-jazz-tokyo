import { connect } from 'react-redux';

import Pay from '../../components/organisms/Pay';

const mapStateToProps = state => ({
  event: state.event.eventDetails,
  userProfile: state.user.userProfile,
  jwt: state.user.jwt,
});

export default connect(mapStateToProps, null)(Pay);
