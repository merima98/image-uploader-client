import axios from "../../httpClient";

function processImage(image: any) {
    const imageContent = image.split('base64,');
    const imageData = {
        image: imageContent[1]
    };
    return axios.post(`/process-image`, imageData);
}


const exports = {
    processImage,
};
export default exports;
