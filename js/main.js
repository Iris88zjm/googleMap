(function($){
  $(function(){

    var stores = [
      { name: 'Shenzhen Mall', address: '231 18th St. NW<br/>30339 GA Shenzhen', phone: '+1-855-466-7467', city: 'Guangdong', country: 'China', lat:'22.55', lng: '114.06', },
      { name: 'huizhou Mall', address: '231 18th St. NW<br/>30339 GA huizhou', phone: '+1-855-466-7467', city: 'Guangdong', country: 'China', lat:'23.09', lng: '114.42', },
      { name: 'Shanghai Mall', address: '231 18th St. NW<br/>30339 GA Shanghai', phone: '+1-855-466-7467', city: 'Shanghai', country: 'China', lat:'31.18', lng: '121.47', },
      { name: 'Nanjing Mall', address: '231 18th St. NW<br/>30339 GA Nanjing', phone: '+1-855-466-7467', city: 'Nanjing', country: 'China', lat:'32.02', lng: '118.81', },
      { name: 'Hefei Mall', address: '231 18th St. NW<br/>30339 GA Hefei', phone: '+1-855-466-7467', city: 'Hefei', country: 'China', lat:'31.77', lng: '117.25', },
      { name: 'Shamen Mall', address: '231 18th St. NW<br/>30339 GA Shamen', phone: '+1-855-466-7467', city: 'Shamen', country: 'China', lat:'24.43', lng: '118.09', },
      { name: 'Wenzhou Mall', address: '231 18th St. NW<br/>30339 GA Wenzhou', phone: '+1-855-466-7467', city: 'Wenzhou', country: 'China', lat:'27.94', lng: '120.70', },
      { name: 'Beijing Mall', address: '231 18th St. NW<br/>30339 GA Beijing', phone: '+1-855-466-7467', city: 'Beijing', country: 'China', lat:'39.55', lng: '116.24', },
      { name: 'Guangzhou Mall', address: '231 18th St. NW<br/>30339 GA Guangzhou', phone: '+1-855-466-7467', city: 'Guangdong', country: 'China', lat:'23.11', lng: '113.26', },
      { name: 'Beijing Mall', address: '231 18th St. NW<br/>30339 GA Beijing', phone: '+1-855-466-7467', city: 'Beijing', country: 'China', lat:'39.50', lng: '116.20', },

      { name: 'London Mall', address: '231 18th St. NW<br/>30339 GA London', phone: '+1-855-466-7467', city: 'London', country: 'UK', lat:'51.44', lng: '-0.08', },
      { name: 'Cambridge Mall', address: '231 18th St. NW<br/>30339 GA Cambridge', phone: '+1-855-466-7467', city: 'Cambridge', country: 'UK', lat:'52.13', lng: '0.17', },
      { name: 'Sheffield Mall', address: '231 18th St. NW<br/>30339 GA Sheffield', phone: '+1-855-466-7467', city: 'Sheffield', country: 'UK', lat:'53.35', lng: '-1.46', },
      { name: 'Edinburgh Mall', address: '231 18th St. NW<br/>30339 GA Edinburgh', phone: '+1-855-466-7467', city: 'Edinburgh', country: 'UK', lat:'55.93', lng: '-3.17', },
      { name: 'Edinburgh Mall', address: '231 18th St. NW<br/>30339 GA Edinburgh', phone: '+1-855-466-7467', city: 'Edinburgh', country: 'UK', lat:'56.93', lng: '-2.17', },

      { name: 'Lasvages Mall', address: '231 18th St. NW<br/>30339 GA Edinburgh', phone: '+1-855-466-7467', city: 'Lasvages', country: 'US', lat:'36.00', lng: '-115.00', },
      { name: 'Lasvages Mall', address: '231 18th St. NW<br/>30339 GA Edinburgh', phone: '+1-855-466-7467', city: 'Lasvages', country: 'US', lat:'35.00', lng: '-115.00', },
      { name: 'Houston Mall', address: '231 18th St. NW<br/>30339 GA Edinburgh', phone: '+1-855-466-7467', city: 'Houston', country: 'US', lat:'29.73', lng: '-95.36', },
    ];
    var addressCenter = [
      { country: 'UK', lat: 54, lng: -4 },
      { country: 'China', lat: 36, lng: 105 },
      { country: 'US', lat: 40, lng: -95 },
    ];

    var map;
    var markers = [];
    function initMap(countryVal) {
      var centerLatlng = { lat: 36, lng: 105 };
      _.find(addressCenter, function(address){
        if(countryVal == address.country){
        centerLatlng = { lat: address.lat, lng: address.lng };
        }
      
      });
      map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 4,
        center: centerLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    }
    function addMarker(result) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(result.lat, result.lng),
        map: map
      });
      markers.push(marker);
      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          var infowindow = new google.maps.InfoWindow({
              content: result.name + '<br/>' + result.address + '<br/>' + result.phone,
          });
          infowindow.open(map, marker);
        }
      })(marker));
    }
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }
    function deleteMarkers() {
      setMapOnAll(null);
      markers = [];
    }
    initMap();

    var countries = [];
    _.each(stores, function(store) {
      var country = store.country;
      if (_.indexOf(countries, country) == -1) {
        countries.push(country);
      }
    });
    _.each(countries, function(country){
      $('#country').append('<option value="' + country + '">' + country + '</option>');
    });

    $('#country').on('change', function(){
      var countryVal = $('#country option:selected').val();
      initMap(countryVal);
      var results = [];
      searchCountry = $('#country').val();
      _.each(stores, function(store) {
        var country = store.country;
        if (country == searchCountry) {
          results.push(store);
        }
      });
      $('.result ul li').remove();
      var i = 1;
      _.each(results, function(result){
        $('.result ul').append('<li>' + i + ' ' + result.name + '<br/>' + result.address + '<br/>'+ result.phone + '</li>');
        addMarker(result);
        i++;
      });
      $('.prompt span').html(i - 1);

      var cities = [];
      _.each(stores, function(store) {
        var country = store.country;
        var city = store.city;
        if ((_.indexOf(cities, city) == -1) && (country == countryVal)) {
            cities.push(city);
        }
      });
      $('#city option').remove();
      _.each(cities, function(city){
        $('#city').append('<option value="' + city + '">' + city + '</option>');
      });
    });

    $('.btn-search').on('click', function(){
      deleteMarkers();
      var results = [];
      searchCountry = $('#country').val();
      searchCity = $('#city').val();
      _.each(stores, function(store) {
        var country = store.country;
        var city = store.city;
        if ((city == searchCity) && (country == searchCountry)) {
          results.push(store);
        }
      });
      $('.result ul li').remove();
      var i = 1;
      _.each(results, function(result){
        $('.result ul').append('<li>' + i + ' ' + result.name + '<br/>' + result.address + '<br/>'+ result.phone + '</li>');
        addMarker(result);
        i++;
      });
      $('.prompt span').html(i - 1);

    });
  });
})(jQuery);