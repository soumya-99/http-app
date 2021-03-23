import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import Raven from "raven-js"
import "bootstrap/dist/css/bootstrap.css"

Raven.config(
	"https://3609b0f953154fe3bf04961dc847bca7@o557312.ingest.sentry.io/5689374",
	{
		release: "1-0-0",
		environment: "development-test",
	}
).install()

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
