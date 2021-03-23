import Raven from "raven-js"
const init = () => {
	Raven.config(
		"https://3609b0f953154fe3bf04961dc847bca7@o557312.ingest.sentry.io/5689374",
		{
			release: "1-0-0",
			environment: "development-test",
		}
	).install()
}

const log = (error) => {
	Raven.captureException(error)
}

const allFunctionsInTheModule = {
	init,
	log,
}

export default allFunctionsInTheModule
