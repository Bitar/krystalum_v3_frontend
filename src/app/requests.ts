import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const deleteObject = async (link: string): Promise<void> => {
    return axios.delete(`${API_URL}/${link}`);
}

export {deleteObject}
