## Sample webextension experiment

This project contains a trivial example of a webextension experiment.

Experiments provide a way to add new or extend existing
[webextension APIs](https://developer.mozilla.org/en-US/Add-ons/webextensions/API/)

NOTE: Experiments only work on pre-release Firefox channels such as Nightly and Aurora.

## Using an experimental API in 3 simple steps

1. Run a Firefox 51+ build and navigate to [about:debugging](about:debugging)
2. Choose "Load Temporary Add-on" and select `manifest.json`
3. Click the "Debug" button next to "hello test" (you may need to
   enable debugging first).

When the console appears, you should see the string `hello sez: "Hello, world!"`.

That's it!  Read on for a more detailed explanation.

## Details

### The webextension

The webextension consists of two files: `manifest.json` and `background.js`.

The first thing to note is that [`manifest.json`](manifest.json)
includes the permission `"experiments.simple"`.

Second, a new section to the `manifest.json` and specify where to load
the two needed files for this experiment:

```
  "applications": {
    "gecko": {
      "id": "simple@experiments.addons.mozilla.org",
        "experiment": { "script": "api.js", "schema": "schema.json" }
    }
  },
```

The background script calls the `hello()` function from the API extension and
logs the result to the console.

### The API extension

An API extension must contain two files: `schema.json` and `api.js`.

The file [`schema.json`](schema.json) is a standard JSON schema for the new
webextension API implemented in the extension.

When the API extension is loaded, the schema is loaded and processed
just like
[the schema files built into the base browser](https://dxr.mozilla.org/mozilla-central/source/toolkit/components/extensions/schemas).

In this case, we have a simple schema that creates
a new namespace called `hello`, which contains a single function `hello()`.

To use this API, a webextension will need to declare that it requires
the `"experiments.simple"` permission -- more on that below.

The file [`api.js`](api.js)
contains the actual implementation of this API.
This file is evaluated with Chrome privileges, and after it is evaluated,
it should create a new class called `API`.  A new instance of this
class will be created every time an extension that uses this API
(by declaring the permission described above).  This class should
include a method `getAPI()` that returns an object suitable for
being cloned into the `chrome` / `browser` objects visible to the
extension.

Like the built-in webextensions API implementations, functions
available to a webextensions are wrapped with code generated from
the schema that validates permissions, function arguments, etc.
In this simple example, we have a single function `hello()` that just
returns a fixed string.
