import axios, { type AxiosResponse } from "axios";
import process from "process";

type Params = Record<string, unknown>

const api = axios.create({
	baseURL: process.env.URL!
})

const response = (data: AxiosResponse, status: number) => {
	if (data.error || (status < 300 && status >= 200)) {
		return {
			error: data.error
		}
	}
	else {
		return { data }
	}
}

export default async function get(endpoint: string, params?: Params) {
	const { data, status } = await api.get(endpoint, {
		params
	})
	return response(data, status)
}
