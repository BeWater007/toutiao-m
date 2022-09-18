import axios from "../utils/request.js";
export const getSearchSuggestions = (q) => {
  return axios({
    url: "/v1_0/suggestion",
    method: "GET",
    params: {
      q,
    },
  });
};
export const getSearchResults = (params) => {
  return axios({
    url: "/v1_0/search",
    method: "GET",
    params
  });
};
