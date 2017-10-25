import React from 'react'
import ReactDOM from 'react-dom'

class Form extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			info: {
				name: '',
				essay: 'Please write an essay about your fav DOM elem.',
				isGoing: true
			}
		}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event) {
		alert('A form was submitted by: ' + 
			this.state.info.name + 
			'\nEssay:' + 
			this.state.info.essay)
		event.preventDefault()
	}

	handleChange(propertyName, event){
		const info = this.state.info
		info[propertyName] = event.target.value
		this.setState({info: info})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<input 
						type="text" 
						value={this.state.info.name} 
						onChange={this.handleChange.bind(this, 'name')} />
				</label>

				<label>
					Essay:
					<textarea 
						value={this.state.info.essay} 
						onChange={this.handleChange.bind(this, 'essay')} />
				</label>
				<label>
					Is going:
					<input
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChange={this.handleChange.bind(this, 'isGoing')} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		)
	}
}

ReactDOM.render(
	<Form />,
	document.getElementById('root')
)