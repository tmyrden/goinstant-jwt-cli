# goinstant-jwt-cli

GoInstant Authentication in the Command Line

This is an implementation of the GoInstant [node-goinstant-auth](https://github.com/goinstant/node-goinstant-auth) module to allow for JWT generation in the command line.

# Installation

```sh
npm install
```

# Usage

Get your secret key for your app from [your goinstant dashboard](https://goinstant.com/dashboard).

:warning: **Remember, the Secret Key needs to be treated like a password!**

There are two ways to use the GoInstant JWT CLI. Without a config file, do the following and give your Secret Key when asked.

```sh
node app.js
```

Alternatively, you can create a config file at `config/config.js` that looks like this:

```js
module.exports = {
  APP_NAME: 'APP_SECRET_KEY',
  ANOTHER_APP_NAME: 'ANOTHER_APP_SECRET_KEY'
};
```

With this config file in place you will be able to use the CLI repeatedly for the same app, without having to retrieve your secret key each time:

```sh
node app.js APP_NAME
```
or
```sh
node app.js ANOTHER_APP_NAME
```

The returned JWT can then be used in order to test user authentication locally, without the need for any server.

# Technicals

The authoritative list of claims used in GoInstant can be found in the [Users and Authentication Guide](https://developers.goinstant.com/v1/guides/users_and_authentication.html#which-reserved-claims-are-required).

- `domain` -> `iss` (standard claim)
- `id` -> `sub` (standard claim)
- `displayName` -> `dn` (GoInstant private claim)
- `groups` -> `g` (GoInstant private claim)
  - `id` -> `id` (GoInstant private claim)
  - `displayName` -> `dn` (GoInstant private claim)
- `'goinstant.net'` -> `aud` (standard claim) _automatically added_

The `extraHeaders` parameter is NOT supported at this time.

## Dependencies

- [node.js](http://nodejs.org) >= 0.10
  - 0.11.7 and below cannot be used due to bugs in HMAC streams

## Set-Up

Download via GitHub and install npm dependencies:

```sh
git clone git@github.com:tmyrden/goinstant-jwt-cli.git
cd goinstant-jwt-cli

npm install
```
