import { FB_APP_ID, FB_AUTH_REDIRECT_URI } from './const';

const hello = window.hello;

hello.init({
  facebook: FB_APP_ID,
}, {
  redirect_uri: FB_AUTH_REDIRECT_URI,
});

export default hello;
