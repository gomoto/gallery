var React = require('react');
var reqwest = require('reqwest');

var Gallery = React.createClass({
  getInitialState: function() {
    return {
      photos: []
    };
  },

  componentDidMount: function() {
    var component = this;

    reqwest({
      url: 'https://appsheettest1.azurewebsites.net/sample/posts',
      type: 'json',
      method: 'get'
    })
    .then(
      function (response) {
        component.setState({
          photos: response
        });
      }, function (error) {
        console.log(error.status, error.statusText);
      }
    );
  },

  render: function() {
    var photos = this.state.photos.map(function(photo) {
      return <img photoId={photo.id} src={photo.picture} alt={photo.text}/>;
    });

    return (
      <div>
        {photos}
      </div>
    );
  }
});

React.render(<Gallery/>, document.getElementById('app'));
