import axios from "axios";
import process from "process";

import storage from "./storage"

type Params = Record<string, unknown>

const api = axios.create({
	baseURL: process.env.URL!
})

const response = (data: Params, status: number) => {
	if (data.error || (status < 300 && status >= 200)) {
		return {
			error: data.error
		}
	}
	else {
		return { data }
	}
}

export async function get(endpoint: string, params?: Params) {
	const { data, status } = await api.get(endpoint, {
		params
	})
	return response(data, status)
}

export async function post(endpoint: string, _data: Params, params?: Params) {
	const { data, status } = await api.post(endpoint, _data, {
		params
	})
	return response(data, status)
}

export async function auth_get(endpoint: string, params?: Params) {
	const key = storage("key")
	if (key.error) {
		return key
	}
	const { data, status } = await api.get(endpoint, {
		params,
		headers: {
			Authorization: `Bearer ${key}`,
			"Content-Type": "application/json"
		}
	})
	return response(data, status)
}

export async function auth_post(endpoint: string, _data: Params, params?: Params) {
	const key = storage("key")
	if (key.error) {
		return key
	}
	const { data, status } = await api.post(endpoint, _data, {
		params,
		headers: {
			Authorization: `Bearer ${key}`,
			"Content-Type": "application/json"
		}
	})
	return response(data, status)
}
