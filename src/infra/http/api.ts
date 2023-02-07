import axios from "axios";

const GIPHY_API = "https://api.giphy.com/v1/gifs";
const GIPHY_API_KEY = "jTAuqirruj85Vtd9DISWXopoSqNOHRUG";

export default axios.create({
  baseURL: GIPHY_API,
  params: { api_key: GIPHY_API_KEY },
});
