import { connect } from 'react-redux';
import User from '../components/User';
import { getTransactionHistory, setSelectedTab } from '../actions';

const mapStateToProps = state => ({
  selectedTab: state.selectedTab,
  userProfile: state.userProfile,
  transactionHistory: state.transactionHistory,
});

const mapDispatchToProps = dispatch => ({
  onUserPageLoad: (jwt) => {
    dispatch(getTransactionHistory(jwt));
  },
  onTabClick: (selectedTab) => {
    dispatch(setSelectedTab(selectedTab));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
