var React = require('react');
var CommentList = require('./commentList.js');
var CommentForm = require('./commentForm.js')

var data = [
	{author: "cjj", text: "Arsenal is better!"},
	{author: "yqb", text: "Man Utd is stronger!"}
]

module.exports = 
	React.createClass({
		getInitialState: function() {
			return {
				data: data
			}
		},
		handlePost: function(author, text) {
			var obj = {
				author: author,
				text: text
			}
			data.push(obj);

			this.setState({data: data});
		},
		render: function() {
			return (
				<div className="commentBox">
					<h1>Comments!</h1>
					<CommentList data={this.state.data}/>
					<CommentForm onPost={this.handlePost}/>
				</div>
			);
		}
	})