import axios from "axios"
import logger from "./logService"
import { toast } from "react-toastify"

// axios interceptors for error handling
// 2nd parameter function will be executed every time we have a response and error
axios.interceptors.response.use(null, (error) => {
	// For expected error
	const expectedError =
		error.response && error.reponse.status >= 400 && error.response.status < 500
	if (!expectedError) {
		// Unexpected Error
		// Unexpected (Network down, Server Down, Database Down, Bug in application)
		// - Log them
		// - Display a generic and friendly error message to the user
		logger.log(error)
		toast.error("An unexpected error occurred!")
	}

	// To pass control to catch block, we return a rejected promise. It just receives error in our promise object
	return Promise.reject(error)
})

const allEssentialMethods = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
}

export default allEssentialMethods
