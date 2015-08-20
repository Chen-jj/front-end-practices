var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="comments">
				<h2>{this.props.author}</h2>
				<p>{this.props.children}</p>
			</div>
		);
	}
});