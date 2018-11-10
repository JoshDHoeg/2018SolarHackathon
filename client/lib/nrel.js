import axios from 'axios';

const apikey = 'i9p7npVWHIhIV1vlQTMBGIUlrdHpf2bxVajXyeiH';
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://developer.nrel.gov'
/**
 * 
 * @param {object} params {city, state_abbr, zip}
 */
export function GetExpendituresGHGBySector(params) {
  return axios.create({
    baseURL: `${baseUrl}/api/cleap/v1/energy_expenditures_and_ghg_by_sector`,
    headers: {'X-Api-Key': apikey},
    params
  }).get();
}

/**
 * 
 * @param {Object} params {system_capacity, module_type, losses, array_type, tilt, azimuth, address, lat, lon, file_id, dataset, radius, timeframe, ... etc}
 */
export function GetPVWatts(params) {
  return axios.create({
    method: 'get',
    baseURL: `https://developer.nrel.gov/api/pvwatts/v6.json/`,
    params: {
      api_key: apikey,
      ...params
    }
  }).get();
}

/**
 * 
 * @param {Object} params {address, lat, lon, radius, limit}
 */
export function GetUtilityRates(params) {
  return axios.create({
    method: 'get',
    baseURL: `https://developer.nrel.gov/api/utility_rates/v3.json`,
    params: {
      api_key: apikey,
      ...params
    }
  }).get();
}