import { connect } from 'react-redux';

import hello from '../config/hello';
import { addAuthListener, logout } from '../actions';
import Header from '../components/Header';

const mapStateToProps = state => ({
  userProfile: state.user.userProfile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentDidMount: () => {
      dispatch(addAuthListener());
    },
    onLoginButtonClick: async () => {
      hello('facebook')
        .login({ scope: 'email' });
    },
    onLogoutButtonClick: () => {
      hello.logout('facebook');
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
