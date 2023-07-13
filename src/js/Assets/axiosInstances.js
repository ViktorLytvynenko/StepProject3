import axios from "axios";

const instance = axios.create({
    baseURL: "https://ajax.test-danit.com/api/v2/cards"
})

export default instance