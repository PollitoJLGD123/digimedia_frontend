
import axios from 'axios'
import url from "../../../api/url"

const API_URL = `${url}/api`;

const Cloud = {

    deleteImage: async function deleteImage(public_id) {
        try {
            const response = await axios.post(`${API_URL}/delete_image`, 
            {
                "public_id": public_id
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                return response.json();
            }
            else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default Cloud;