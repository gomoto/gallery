var React = require('react');
var reqwest = require('reqwest');

var Photo = require('./Photo/Photo.jsx');
var Loader = require('./Loader/Loader.jsx');

var Gallery = React.createClass({
  getInitialState: function() {
    return {
      photos: [],
      photosLoaded: [],
      activePhoto: null,
      loaded: false
    };
  },

  componentDidMount: function() {
    this.freezeGallery(true);
    this.loadPhotos();
  },

  loadPhotos: function() {
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
      }, function() {
        this.freezeGallery(false);
      });
    } else {
      this.setState({
        activePhoto: photoId
      }, function() {
        this.freezeGallery(true);
      });
    }
  },

  /**
   * Track the photos that have finished loading. When all photos have loaded,
   * hide Loading component and unfreeze gallery.
   */
  handlePhotoLoad: function(photoId) {
    this.setState({
      photosLoaded: this.state.photosLoaded.concat([photoId])
    }, function() {
      if (this.state.photosLoaded.length === this.state.photos.length) {
        this.setState({
          loaded: true
        }, function() {
          this.freezeGallery(false);
        });
      }
    });
  },

  /**
   * Prevent gallery scrolling by setting overflow: hidden on body.
   */
  freezeGallery: function(freeze) {
    if (freeze) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  },

  render: function() {
    var photos = this.state.photos.map(function(photo) {
      return <Photo photo={photo}
                    isActive={photo.id === this.state.activePhoto}
                    onClick={this.handlePhotoClick.bind(null, photo.id)}
                    onLoad={this.handlePhotoLoad.bind(null, photo.id)}
                    key={photo.id}/>;
    }.bind(this));

    return (
      <div className='gallery'>
        {photos}
        {this.state.loaded ? null : <Loader/>}
      </div>
    );
  }
});

React.render(<Gallery/>, document.getElementById('app'));
