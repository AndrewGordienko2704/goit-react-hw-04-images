import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34180758-d54538fca96eb6e377fea260b';

export const fetchGallery = async (searchQuery, page) => {
    const { data } = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );

    return data;
};