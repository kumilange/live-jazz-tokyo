import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import User from '../components/User';
import { getOrderHistory, setSelectedTab } from '../actions';

const mapStateToProps = state => ({
  jwt: state.user.jwt,
  selectedTab: state.user.selectedTab,
  userProfile: state.user.userProfile,
  orders: state.user.orders,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOrderHistory, setSelectedTab,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
