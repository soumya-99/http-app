import { Component } from "react"
import axios from "axios"
import "./App.css"

const API_ENDPOINT = "https://jsonplaceholder.typicode.com/posts"

export default class App extends Component {
	state = {
		posts: [],
	}

	async componentDidMount() {
		// when we send a http-request, there's a little delay of 5-10ms or 1s or longer until we get the result
		// the promise object promises to hold the result of an asynchronus operation.
		// when we create a promise, initially it's in "pending" state. It'll change in "resolved/fulfilled (in case of success)" or "rejected (in case of faliure)"
		const { data: posts } = await axios.get(API_ENDPOINT)
		this.setState({ posts })
	}

	handleAdd = async () => {
		const obj = { title: "a", body: "b" }

		// Because we're creating data, we need to include this data in the body of the request. So, we need to set this object (obj) to the server. So, we'll pass obj as a 2nd argument in post() method.

		// In this case, when we send a http-request, to create a new post the server or the backend will respond with the newly created post (Not the entire list of posts)
		// Add the data to the server
		const { data: post } = await axios.post(API_ENDPOINT, obj)

		// Add the data to the table view
		// Create the state
		const posts = [post, ...this.state.posts]

		// Update the state
		this.setState({ posts })
	}

	handleUpdate = async (post) => {
		post.title = "UPDATED"

		// Because we are updating a particular data, we've to mention the post's id along with the API_ENDPOINT/post.id

		// As a 2nd argument we need to pass the data to be send to the server.
		// Update in the server
		await axios.put(`${API_ENDPOINT}/${post.id}`, post)

		// Update the table in browser view
		// Clone the state posts
		const posts = [...this.state.posts]
		// Find the index of the post from the posts array
		const index = posts.indexOf(post)
		// Clone the new post in position of the array of posts[index]
		posts[index] = { ...post }
		// Update the state of the posts
		this.setState({ posts })

		// If we use the patch method, we don't have to send to entire post object. We can send only 1 or more properties, and these are the properties we want to update.
		// axios.patch(`${API_ENDPOINT}/${post.id}`, { title: post.title })
	}

	handleDelete = async (post) => {
		// Delete from the server
		await axios.delete(`${API_ENDPOINT}/${post.id}`)

		// Delete from the table (Update the view)
		// We want all posts, except the post we've deleted.
		const posts = this.state.posts.filter((p) => p.id !== post.id)
		this.setState({ posts })
	}

	render() {
		return (
			<>
				<button className="btn btn-primary my-2" onClick={this.handleAdd}>
					Add
				</button>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Update</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{this.state.posts.map((post) => (
							<tr key={post.id}>
								<td>{post.title}</td>
								<td>
									<button
										className="btn btn-info btn-sm"
										onClick={() => this.handleUpdate(post)}
									>
										Update
									</button>
								</td>
								<td>
									<button
										className="btn btn-danger btn-sm"
										onClick={() => this.handleDelete(post)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		)
	}
}
