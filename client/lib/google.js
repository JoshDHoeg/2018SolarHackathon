const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDQhl8wQfSmfVEHBr2phdYQETnvjkEOTec',
  Promise: Promise
});

/**
 * @param {string} address A string formatted address. ex: '1600 Amphitheatre Parkway, Mountain View, CA'
 */
export async function GetGeocodeFromAddress(address) {
  console.log('GETTING GEO CODE... Address: ', address)
  // Geocode an address.
  try {
    const res = await googleMapsClient.geocode({address: address}).asPromise()
    console.log('result: ', res)
    return res;
  } catch (err) {
    console.log(err)
    return null;
  }
  
}