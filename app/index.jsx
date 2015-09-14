var React = require('react');

var Gallery = React.createClass({
  getInitialState: function() {
    return {
      photos: []
    };
  },
  render: function() {
    return (
      <div>Photos go here.</div>
    );
  }
});

React.render(<Gallery/>, document.getElementById('app'));
