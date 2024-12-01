import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
