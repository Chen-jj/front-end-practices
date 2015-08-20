var React = require('react');
var Comment = require('./comment.js')

module.exports = 
	React.createClass({
		render: function() {

			var nodes = this.props.data.map(function(comment) {
				return (
					<Comment author={comment.author}>
						{comment.text}
					</Comment>
				);
			})

			return (
				<div className="commentList">
					{nodes}
				</div>
			);

		}
	})