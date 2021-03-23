import { Component } from "react"
import axios from "axios"
import "./App.css"

export default class App extends Component {
	state = {
		posts: [],
	}

	async componentDidMount() {
		// when we send a http-request, there's a little delay of 5-10ms or 1s or longer until we get the result
		// the promise object promises to hold the result of an asynchronus operation.
		// when we create a promise, initially it's in "pending" state. It'll change in "resolved/fulfilled (in case of success)" or "rejected (in case of faliure)"
		const { data: posts } = await axios.get(
			"https://jsonplaceholder.typicode.com/posts"
		)
		this.setState({ posts })
	}

	handleAdd = () => {
		console.log("Add")
	}

	handleUpdate = (post) => {
		console.log("Update", post)
	}

	handleDelete = (post) => {
		console.log("Delete", post)
	}

	render() {
		return (
			<>
				<button className="btn btn-primary my-2">Add</button>
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
