/**
 * Main Home Route
 */

import express from 'express'



/**
 * Home Route
 *
 * Handles Main Requests and
 * requests that leads to errors
 */
export const route = express.Router()


// Routes
route.get("/", (req, res) => res.render("index", {title: "Home"})) // Main





// TEST
route.get("/game", (req, res) => res.render("game", {title: "Game"}))



// route.get("/license", (req, res) => res.render("license", { title: "License" }))


// Errors
// route.get("*", (req, res) => res.render("error/404", { title: "Error 404" }))
