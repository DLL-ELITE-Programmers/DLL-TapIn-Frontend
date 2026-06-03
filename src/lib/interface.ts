export interface userinfo {
	id: string
	username: string
	first_name: string
	middle_name?: string
	last_name: string
	sex: number
	department: number
	year: number
	section: string
}

export interface usercredentials {
	error?: string
	user?: userinfo
	message?: string
	access?: string
	refresh?: string
}
