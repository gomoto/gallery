var React = require('react');
var reqwest = require('reqwest');
var classNames = require('classnames');

var Gallery = React.createClass({
  getInitialState: function() {
    return {
      photos: [],
      activePhoto: null
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

  handlePhotoClick: function(photoId) {
    if (this.state.activePhoto === photoId) {
      this.setState({
        activePhoto: null
      });
    } else {
      this.setState({
        activePhoto: photoId
      });
    }
  },

  render: function() {
    var photos = this.state.photos.map(function(photo) {
      var photoClasses = classNames({
        'photo': true,
        'active': photo.id === this.state.activePhoto
      });
      return <img className={photoClasses}
                  photoId={photo.id}
                  src={photo.picture}
                  alt={photo.text}
                  onClick={this.handlePhotoClick.bind(null, photo.id)}
                  key={photo.id}/>;
    }.bind(this));

    return (
      <div className='gallery'>
        {photos}
      </div>
    );
  }
});

React.render(<Gallery/>, document.getElementById('app'));
