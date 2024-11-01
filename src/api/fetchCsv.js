import { axiosInstance } from "./axiosInstance";

export const apiData = () => {
	return new Promise((resolve, reject) => {
		axiosInstance
			.get(``)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => reject(err));
	});
};
