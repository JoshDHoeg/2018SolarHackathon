const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDQhl8wQfSmfVEHBr2phdYQETnvjkEOTec',
  Promise: Promise
});

console.log('Sending request...')
// Geocode an address.
googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  }
});