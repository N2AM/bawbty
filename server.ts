/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import "zone.js/dist/zone-node";

import * as express from "express";
import { join } from "path";
// -----------------------------------------------------------------------------------
import { readFileSync } from "fs"; // import readFileSync            (1)
const domino = require("domino"); // import the library `domino`    (2)
// -----------------------------------------------------------------------------------
// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), "dist/browser");

// -----------------------------------------------------------------------------------
const template = readFileSync(join(DIST_FOLDER, "index.html")).toString(); // use `index.html` as template (3)
const win = domino.createWindow(template); // create object Window                     (4)
global["Event"] = win.Event; // assign the `win.Event` to prop `Event`   (5)
global["document"] = win.document;
global["branch"] = null;
global["object"] = win.object;
global["HTMLElement"] = win.HTMLElement;
global["navigator"] = win.navigator;
global["localStorage"] = win.localStorage;
global["localStorage"] = win.localStorage;
// -----------------------------------------------------------------------------------

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
  ngExpressEngine,
  provideModuleMap
} = require("./dist/server/main");

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  "html",
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set("view engine", "html");
app.set("views", DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get(
  "*.*",
  express.static(DIST_FOLDER, {
    maxAge: "1y"
  })
);

// All regular routes use the Universal engine
app.get("*", (req, res) => {
  res.render("index", { req });
});

// Start up the Node server
app.listen(PORT, () => {
  // console.log(`Node Express server listening on http://localhost:${PORT}`);
});
