import axios from "../../httpClient";

function processImage(image: string) {
    console.log('I am in process image api, ', image)
    return axios.post(`/process-image`, image);
}


const exports = {
    processImage,
};
export default exports;
