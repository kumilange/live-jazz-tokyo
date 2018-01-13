import { connect } from 'react-redux';
import User from '../components/User';
import { getTransactionHistory, setSelectedTab } from '../actions';

const mapStateToProps = state => ({
  jwt: state.jwt,
  transactionHistory: state.transactionHistory,
  selectedTab: state.selectedTab,
  userProfile: state.userProfile,
});

const mapDispatchToProps = dispatch => ({
  onComponentDidMount: (jwt) => {
    dispatch(getTransactionHistory(jwt));
  },
  onTabClick: (selectedTab) => {
    dispatch(setSelectedTab(selectedTab));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
