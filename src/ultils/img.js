import axios from "axios";

const URL = "http://localhost/laravel8/laravel8/public/upload";
const imgApi = {
  getIMGblogs(img) {
    return axios.get(`${URL}/Blog/image/${img}`);
  },
  getImgUserAvatar(img) {
    return axios.get(`${URL}/user/avatar/${img}`);
  },
  getImgProduct(img, id) {
    return axios.get(`${URL}/product/${id}/${img}`);
  },
};

export default imgApi;
