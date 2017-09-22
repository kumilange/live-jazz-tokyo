import { connect } from 'react-redux';
import Header from '../components/Header';

import { _hello } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
});

// -------- hello

const mapDispatchToProps = dispatch => {
  console.log('Register callback!')

  window.hello.init({
    facebook: '120884018612158'
  }, {
    redirect_uri: 'redirect.html'
  });

  window.hello.on('auth.login', async (auth) => {
    console.log('logged in', auth);
    // await post token to server
    // get token from server
    // dispatch action with server token
    // store in state
    dispatch(_hello(auth));
  });
  return {
    onLoginButtonClick: () => {
      window.hello('facebook').login();
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
