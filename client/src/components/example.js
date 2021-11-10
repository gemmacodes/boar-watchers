/** @jsx React.DOM */

/// So secure
var key = "98c355d73f22c6eb33c4bc0bd22031fe";

/// Google Map Vars
var map;
var marker;
var mapZoomLevel;

/// Config for the app setup
config = {
  initialLat: 51.75,
  initialLon: -3.38,
  mapZoomLevel: 10
}

/// App
var WeatherApp = React.createClass({
 
  /** 
   * Set an initial state
   */
  getInitialState: function () {
      
    /**
     * Thinking in React
     *
     * 1. Is it passed in from a parent via props? If so, it probably isn't state.
     * 2. Does it change over time? If not, it probably isn't state.
     * 3. Can you compute it based on any other state or props in your component? If so, it's not state.
     */
  
    return {
      /// Passed as props on render
      lat: this.props.initialLat,
      lon: this.props.initialLon,
      
      /// These will be updated with data from the API, so are subject to change (point 2)
      location: '', 
      weather:  '',
      icon:     ''
    };
  },
  
  /**
   * Capitalize the first letter of a string
   */
  capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  
  /**
   * Request data from the API
   * No fail checks! >.<
   */
  getData: function (location, lat, lon) {
    
    /// Variable to return
    var data;
    
    /// If it's a search
    if (location !== null)
    {
      data = $.get('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=' + key)
    }
    else /// It's a pin drop
    {
      data = $.get('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + key)
    }
    
    return data;
  },
  
  /**
   * Update state
   */
  updateState: function (locationName, lat, lon) {
    
    /// Get data from the API, then set state with it
    this.getData(locationName, lat, lon)
      .then(function(data) {
        /// Update the state, pass updateMap as a callback
        this.setState({
          lat:      data.coord.lat,
          lon:      data.coord.lon,
          weather:  this.capitalizeFirstLetter( data.weather[0].description ),
          location: data.name,
          icon:     'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png' /// Messy
        }, this.updateMap ) /// Pass updateMap as a callback
      }.bind(this));
  },
  
  /**
   * Run when 'search' button is pressed
   */
  locationSearch: function () {
    
    /// Get the value from the search field
    var location = this.refs.newLocation.getDOMNode().value;
    
    if ( location !== '' )
    {
      /// Update state with new API Data based on location name
      this.updateState(location, null, null);
    }
  },
  
  /**
   * Run when 'location' button is used
   */
  geolocationSearch: function () {
    
    /// Successful geolocation
    var success = function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      
      /// Update state with new API Data based on lat lon
      this.updateState(null, lat, lon);
    }.bind(this);
  
    /// Error'd geolocation
    var error = function (error) {
      if (error.message == 'User denied Geolocation')
      {
        alert('Please enable location services');
      }
    };
    
    /// Get the position
    navigator.geolocation.getCurrentPosition(success, error);
  },
  
  /**
   * Run when the form is submitted
   */
  formSubmit: function (e) {
    e.preventDefault();
    
    /// Clear the input
    this.refs.newLocation.getDOMNode().value = '';
  },
  
  /**
   * Render the map on the page
   */
  renderMap: function(lat, lng) {

    /**
     * Map coordinates and pin coordinates are added in updateMap(),
     * which is run by updateStateWithData()
     */
    
    /// Create a new map
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: config.mapZoomLevel,
      disableDefaultUI: true,
      zoomControl: true
    });
  
    /// Create a new marker
    marker = new google.maps.Marker({
      map: map,
      draggable: true
    });
    
    /// Set the initial pin drop animation
    marker.setAnimation(google.maps.Animation.DROP);
  
    /// Add an event listener for click
    google.maps.event.addListener(map, 'click', function(event) {
      var latLng = event.latLng;
      var lat = latLng.lat();
      var lng = latLng.lng();
      
      /// Update state based on lat lon
      this.updateState(null, lat, lng)
    }.bind(this));
    
    /// Add an event listener for drag end
    google.maps.event.addListener(marker, 'dragend', function(event) {
      
      var latLng = event.latLng;
      var lat = latLng.lat();
      var lng = latLng.lng();
      /// Update state based on lat lon
      this.updateState(null, lat, lng)
    }.bind(this));
    
    /// Update variable on map change
    map.addListener('zoom_changed', function() {
      mapZoomLevel = map.getZoom();
    });
  },
  
  /**
   * Set map marker position and pan settings
   */
  updateMap: function (lat, lon) {

    var latLng = new google.maps.LatLng(this.state.lat, this.state.lon);
    
    /// Set a timeout before doing map stuff
    window.setTimeout( function() {
      
      /// Set the marker position
      marker.setPosition(latLng);
      
      /// Pan map to that position
      map.panTo(latLng);
    }.bind(this), 300);
  },
  
  /**
   * After initial render
   */
  componentDidMount: function () {
    
    /// Render a new map
    this.renderMap();
    
    /// Run update state, passing in the setup
    this.updateState(null, this.state.lat, this.state.lon);
  },
  
  /**
   * Render the app
   */
  render: function() {
    return (
      <div id="app">
        <div id="app__interface">
          <div className="panel panel-default">
            <div className="panel-heading text-center"><span className="text-muted">Enter a place name below, drag the marker <em>or</em> click directly on the map</span></div>
              <div className="panel-body">
                { /* Search Form - Ideally this should be moved out */ }
                <form onSubmit={this.formSubmit}>
                    <div className="input-group pull-left">
                      <input type="text" className="form-control" placeholder="Enter a town/city name" ref="newLocation"/>
                      <span className="input-group-btn">
                        <button type="submit" className="btn btn-default" onClick={this.locationSearch}>Search</button>
                      </span>
                    </div>
                    
                </form>
              </div>
            <WeatherDetails location={this.state.location} weather={this.state.weather} icon={this.state.icon} />
          </div>
        </div>
        <div id="map"></div>
      </div>
    );
  }
  
});

var WeatherDetails = React.createClass({
  
  render: function() {
    return (
      <div className="panel-heading weather">
        <p className="text-muted"><strong>{this.props.location}</strong></p>
        <span className="text-muted">{this.props.weather}</span>
        <div className="weather__icon">
          <img src={this.props.icon} />
        </div>
      </div>
    )
  }
  
});

/**
 * Slap it on the page
 */
React.renderComponent(
  <WeatherApp initialLat={config.initialLat} initialLon={config.initialLon}/>,
  document.getElementById('mount-point')
);

/**
<button className="btn btn-default pull-right" onClick={this.geolocationSearch}><span className="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Use my location</button>
**/