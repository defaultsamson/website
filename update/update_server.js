const WebSocket = require("ws")
const express = require("express")
const https = require("https")
const fs = require("fs")
const { spawn } = require("child_process")

var port = 2398

var wss

function send(ws, json) {
	ws.send(JSON.stringify(json))
}

function update(ws) {
	send(ws, { update: 1 })

	const script = spawn("bash", [ "/home/samson/website/update/update.sh" ])

	// Logs all the script output
	script.stdout.on("data", (d) => {
		let m = d.toString("utf8")
		console.log(m)
		send(ws, { update: 3, message: m })
	})

	script.stderr.on("data", (d) => {
		let m = d.toString("utf8")
		console.error(m)
		send(ws, { update: 4, error: m })
	})

	script.on("error", (e) => {
		send(ws, { update: 2 })
		console.log("error: " + e)
	})

	script.on("close", (code) => {
		console.log("Job finished")
		send(ws, { update: 0 })
	})
}

function connect() {
	let options = {
		key: fs.readFileSync("/ssl/private.key"),
		cert: fs.readFileSync("/ssl/public.crt")
	}

	let app = express()

	let httpsServer = https.createServer(options, app).listen(port)

	wss = new WebSocket.Server({ server: httpsServer })

	wss.on("connection", (ws) => {
		ws.on("open", () => {})
		ws.on("close", () => {})
		ws.on("error", (e) => {})
		ws.on("message", (msg) => {
			update(ws)
			/*
			try {
				let pack = JSON.parse(msg)
			} catch (err) {

			}
			*/
		})
	})
}

connect()
