const hello = window.hello;
const FB_APP_ID = '1053212748114006';
const FB_AUTH_REDIRECT_URI = '/';

hello.init({
  facebook: FB_APP_ID,
}, {
  redirect_uri: FB_AUTH_REDIRECT_URI,
});

export default hello;
