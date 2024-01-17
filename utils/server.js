const path = require("path");
const express = require("express");
const morganMiddleware = require('../middlewares/morgan.middleware');
const { routesMap } = require('../routes');

function createServer() {
    const app = express();
    const cors = require('cors');

    app.use(cors({origin: true, credentials: true}));
    app.use(express.json());
    app.use(morganMiddleware);

    const reactBuildPath = path.join(__dirname, "..", "client", "build");
    app.use(express.static(reactBuildPath));
    app.get("/", async(req, res) => {
        res.sendFile(path.join(reactBuildPath, "index.html"));
    })

    Object.keys(routesMap).forEach((key) => app.use(key, routesMap[key]))

    return app;
}

module.exports = { createServer }