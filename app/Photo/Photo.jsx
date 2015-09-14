var React = require('react');
var classNames = require('classnames');

var Photo = React.createClass({
  stopClick: function(event) {
    event.stopPropagation();
  },
  render: function() {
    var photoClasses = classNames({
      'photo': true,
      'active': this.props.isActive
    });
    var fillerClasses = classNames({
      'picture': true,
      'filler': true,
      'active': this.props.isActive
    });
    return (
      <div>
        <img className={fillerClasses}
             src={this.props.photo.picture}/>
        <div className={photoClasses}
             onClick={this.props.onClick}>
          <div className='photo-content'
               onClick={this.stopClick}>
            <img className='picture'
                 src={this.props.photo.picture}
                 alt={this.props.photo.text}
                 onClick={this.props.onClick}
                 onLoad={this.props.onLoad}/>
            <p className='caption'>{this.props.photo.text}</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Photo;
