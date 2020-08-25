var output = document.getElementById("output")
var error = document.getElementById("error")
var conText = document.getElementById("conText")
var button = document.getElementById("updateButton")
button.disabled = true

var ip = "samsonclo.se"
var port = 2398
var connected = false
var connectionAttempts = 0
var failed = false

var ws

button.onclick = () => {
	send({ update: 1 })
}

function receive(json) {
	if (json.update == 1) { // Update starts
		button.disabled = true
		output.innerHTML = ""
		error.innerHTML = ""
	} else if (json.update == 2) { // Update fails
		button.disabled = false
		failed = true
	} else if (json.update == 3) { // Message update
		output.innerHTML += "<li>" + json.message + "</li>"
	} else if (json.update == 4) { // Error update
		error.innerHTML += "<li>" + json.error + "</li>"
	} else { // Update finished
		if (!failed) {
			button.disabled = false
		} else {
			failed = false
		}
	}
}

function send(json) {
	if (connected) {
		ws.send(JSON.stringify(json))
	} else {
		console.error("Data being sent to unstarted WebSocket")
	}
}

function connect() {
	console.log("Attempting WebSocket connection... [" + connectionAttempts + "]")
	conText.style.visibility = "visible"
	conText.innerHTML = "Connecting to server... [" + connectionAttempts + "]"
	button.disabled = true

	ws = new WebSocket("wss:\/\/" + ip + ":" + port)

	ws.onerror = (e) => {
		console.log("The WebSocket experienced an error")
		console.log(e)
	}

	ws.onclose = (e) => {
		console.log("The WebSocket was closed [" + e.code + "] (" + e.reason + ")")
		connected = false
		connectionAttempts++
		connect()
	}

	ws.onopen = (e) => {
		console.log("The WebSocket was opened succesfully!")
		connected = true
		connectionAttempts = 0
		button.disabled = false
		conText.style.visibility = "hidden"
	}

	ws.onmessage = (e) => {
		try {
			let pack = JSON.parse(e.data)
			receive(pack)
		} catch (err) {
			console.error(err)
		}
	}
}

connect()
