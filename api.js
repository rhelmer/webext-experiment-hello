"use strict";
/* global ExtensionAPI */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "API" }] */
class API extends ExtensionAPI {
  getAPI() {
    return {
      hello: {
        hello() {
          return "Hello, world!";
        }
      }
    };
  }
}
