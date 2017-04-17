/* eslint-disable import/no-dynamic-require, global-require */
const fs = require('fs');
const express = require('express');

class Router extends express.Router {
  constructor(name='') {
    super();
    this.instance = (() => this)();
    this.endpoint = `/${name}`;
  }

  static factory(app) {
    fs.readdirSync(__dirname).forEach((file) => {
      if (file.match(/.js$/) !== null && !file.match('Router.js')) {
        const router = require(`./${file.replace('.js', '')}`);
        app.use(router.endpoint, router.instance);
      }
    });
  }
}

module.exports = Router;
