import axios from 'axios';

/**
 * 
 * @param {string} address String address to look up geocode for
 */
export function GetGeocodeFromAddress(address) {
  return axios.create({
    baseURL: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAXv_Ffe-izY9slVX5D8kpDt_YWIzC-vQU`
  }).get();
}