import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getData = async (requestURL, requestParam) => {
    let fetchData = await axios.get(BASE_URL + requestURL + requestParam)
    return fetchData;
}