import { connect } from 'react-redux';
import Header from '../components/Header';

import { setUserProfile, logout } from '../actions';

const mapStateToProps = state => ({
  userProfile: state.userProfile,
});

// This is where hello.js is used.
// It is pulled in as a global attached to the window.

// Simplify JSON posting
const postJson = async (url, objToPost) => {
  const serializedJson = JSON.stringify(objToPost);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const options = {
    headers,
    method: 'POST',
    body: serializedJson,
  };
  const readableStream = await fetch(url, options);
  const parsedResponseObject = await (readableStream).json();
  return parsedResponseObject;
};

const mapDispatchToProps = (dispatch) => {
  // Initialize hello with facebook app_id

  window.hello.init({
    facebook: '120884018612158',
  }, {
    redirect_uri: 'redirect.html',
  });

  // Register hello callback once, before anything is dispatched
  // When hello attempts to log in after login button click, this callback is executed.
  window.hello.on('auth.login', async (auth) => {
    const socialToken = auth.authResponse.access_token;
    console.log('authResponse', auth.authResponse);
    const facebook = window.hello('facebook');
    facebook.login(
      {
        scope: 'email',
      },
    ).then(() => {
      return facebook.api('me');
    }).then((profile) => {
      console.log('profile', profile);
      dispatch(setUserProfile(profile));
    });

    // TODO: stop relying on the server to send user's name and email
    // should only receive JWT
    const userProfile = await postJson('/api/auth', {
      network: 'facebook',
      socialToken,
    });
    dispatch(setUserProfile(userProfile));
  });
  return {
    onLoginButtonClick: () => {
      const facebook = window.hello('facebook');
      facebook.login(
        {
          scope: 'email',
          force: true,
        },
      ).then(() => {
        return facebook.api('me');
      }).then((result) => {
        console.log(result);
      });
    },
    onLogoutButtonClick: () => {
      window.hello.logout('facebook');
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
