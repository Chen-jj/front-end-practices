var React = require('react');

module.exports = 
	React.createClass({
		getInitialState: function() {
			return {
				author: "",
				text: ""
			}
		},
		handleSubmit: function(evt) {
			evt.preventDefault();
			this.props.onPost(this.state.author, this.state.text);
			this.state.author = "";
			this.state.text = "";
		},
		updateField: function(key, evt) {
			var obj = {};
			obj[key] = evt.target.value;
			this.setState(obj);
		},
		render: function() {
			return (
				<form className="commentForm" onSubmit={this.handleSubmit}>
					<input placeholder="name" value={this.state.author} onChange={this.updateField.bind(this, "author")} />
					<br/>
					<textarea placeholder="comment" value={this.state.text} onChange={this.updateField.bind(this, "text")} />
					<input type="submit" value="Post"/>
				</form>
			);
		}
	});