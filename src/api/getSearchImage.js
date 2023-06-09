const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34860459-58caa0f812cc249544584c986';



export const getSearchImage = (text,page) => {
    return fetch(
        `${BASE_URL}?q=${text}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    ).then(response => response.json());
}
