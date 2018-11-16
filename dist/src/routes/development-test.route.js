"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refs_1 = require("../../src/refs");
// TODO: Test middleware
exports.devRouter = express_1.Router();
exports.devRouter.post('/middleware/must-be-user', refs_1.mustBeUser, (req, res) => {
    res.send({ success: true });
});
