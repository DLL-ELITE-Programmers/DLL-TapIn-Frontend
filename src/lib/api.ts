import axios from "axios";

import storage from "./storage"

type Params = Record<string, unknown>

const api = axios.create({
	baseURL: import.meta.env.VITE_URL
})

const response = (data: Params) => {
	if (data.error) {
		return {
			error: data.error
		}
	}
	else {
		return data
	}
}

export async function get(endpoint: string, params?: Params) {
	if (!endpoint.endsWith("/")) {
		endpoint += "/"
	}
	const { data } = await api.get(endpoint, {
		params
	})
	return response(data)
}

export async function post(endpoint: string, _data: Params, params?: Params) {
	if (!endpoint.endsWith("/")) {
		endpoint += "/"
	}
	const { data } = await api.post(endpoint, _data, {
		params
	})
	return response(data)
}

export async function auth_get(endpoint: string, params?: Params) {
	if (!endpoint.endsWith("/")) {
		endpoint += "/"
	}
	const key = storage("key")
	if (key.error) {
		return key
	}
	const { data } = await api.get(endpoint, {
		params,
		headers: {
			Authorization: `Bearer ${key}`,
			"Content-Type": "application/json"
		}
	})
	return response(data)
}

export async function auth_post(endpoint: string, _data: Params, params?: Params) {
	const key = storage("key")
	if (key.error) {
		return key
	}
	if (!endpoint.endsWith("/")) {
		endpoint += "/"
	}
	const { data } = await api.post(endpoint, _data, {
		params,
		headers: {
			Authorization: `Bearer ${key}`,
			"Content-Type": "application/json"
		}
	})
	return response(data)
}
