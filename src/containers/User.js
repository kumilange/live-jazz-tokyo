import { connect } from 'react-redux';
import User from '../components/User';

const mapStateToProps = state => ({
  selectedTab: state.selectedTab,
});

const mapDispatchToProps = dispatch => ({
  setSelectedTab: (selectedTab) => {
    dispatch({
      type: 'SET_SELECTED_TAB',
      selectedTab,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
