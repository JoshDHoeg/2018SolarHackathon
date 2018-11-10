import axios from 'axios';

const apikey = 'i9p7npVWHIhIV1vlQTMBGIUlrdHpf2bxVajXyeiH';
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://developer.nrel.gov/'
/**
 * 
 * @param {string} city City name
 * @param {string} state_abbr Abbreviation for State
 * @param {number} zip Zip code
 */
export function GetExpendituresGHGBySector(city, state_abbr, zip) {
  let params = {}

  if (zip) {
    params = {
      zip
    };
  } else {
    params = {
      city,
      state_abbr
    }
  }
  return axios.create({
    baseURL: `${baseUrl}/api/cleap/v1/energy_expenditures_and_ghg_by_sector`,
    headers: {'X-Api-Key': apikey},
    params
  }).get();
}