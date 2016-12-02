"use strict";
/* global browser */
browser.hello.hello().then(
  /* eslint-disable no-console */
  message => console.log(`hello sez: "${message}"`)
);
