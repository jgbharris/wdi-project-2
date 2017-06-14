const facebook = {
  loginURL: 'https://www.facebook.com/v2.9/dialog/oauth',
  accessTokenURL: 'https://graph.facebook.com/v2.9/oauth/access_token',
  clientId: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  redirectURL: 'http://localhost:8000/oauth/facebook',
  scope: 'email',
  getLoginURL() {
    return `${this.loginURL}?client_id=${this.clientId}&redirect_uri=${this.redirectURL}&scope=${this.scope}`;
  }
};

module.exports = {
  facebook
};
