import axios from 'axios'


const http = axios.create({
	baseURL: 'http://gank.io/api',
	timeout: 10000
})

http.interceptors.request.use(function (config) {
	console.log('config',config)
	return config;
}, function (error) {
	return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
	console.log('response',response)
	return response.data;
}, function (error) {
	console.log('出错了')
	return Promise.reject(error);
});

export default http