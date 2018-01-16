import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addAuthListener, logout } from '../../actions/index';
import Header from '../../components/organisms/Header/Header';

const mapStateToProps = state => ({
  userProfile: state.user.userProfile,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addAuthListener, logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
