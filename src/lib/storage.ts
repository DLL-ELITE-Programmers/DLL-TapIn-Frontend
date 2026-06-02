type Params = Record<string, any>

export default function storage(key: string, value?: Params | Params[] | string) {
	if (value) {
		if (typeof value === "string") {
			localStorage.setItem(key, value)
		} else {
			localStorage.setItem(key, JSON.stringify(value))
		}
		return {
			message: "Added"
		}
	} else {
		const get = localStorage.getItem(key)
		if (get) {
			try {
				return JSON.parse(get)
			} catch (e) {
				return get
			}
		} else {
			return {
				error: "No data found"
			}
		}
	}
}
