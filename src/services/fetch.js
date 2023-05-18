import axios from 'axios';

const API_KEY = '34970535-de5786fce74da62105e4e2a92';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImg = async (searchQuery, page) => {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                key: API_KEY,
                q: searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                page: page,
                per_page: 12,
                safesearch: true,
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};