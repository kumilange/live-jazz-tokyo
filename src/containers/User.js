import { connect } from 'react-redux';
import User from '../components/User';
import { getOrderHistory, setSelectedTab } from '../actions';

const mapStateToProps = state => ({
  jwt: state.jwt,
  orders: state.orders,
  selectedTab: state.selectedTab,
  userProfile: state.userProfile,
});

const mapDispatchToProps = dispatch => ({
  onComponentDidMount: (jwt) => {
    dispatch(getOrderHistory(jwt));
  },
  onTabClick: (selectedTab) => {
    dispatch(setSelectedTab(selectedTab));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
