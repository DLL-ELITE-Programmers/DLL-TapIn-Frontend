import { useNavigate } from "react-router"
import UserDetails from "./user"
import { useState } from "react"

const actions = [
	{
		name: "User Information",
		description: "This is just to see your personal information like name, course, year and section",
		url: "userInfo",
		float: true
	},
	{
		name: "Scan QR",
		description: "Use this to scan the QR Code showed by the student.",
		url: "scan",
		authorize: true
	},
	{
		name: "Generate QR",
		description: "Use this to generate QR Code and let the organizers scan it for you to have attendance",
		url: "qr"
	}
]

const authorized = true

export default function UserLandingPage() {
	const navigate = useNavigate()
	const [visible, setVisible] = useState("")
	return (
		<div className="flex flex-col overflow-hidden overflow-y-auto gap-2 p-2 w-full">
			{
				actions.map((action) => {
					if ((action.authorize && authorized) || (!action.authorize)) {
						return (
							<div
								className="flex flex-col bg-sky-50 p-2 rounded"
								onClick={() => {
									if (!action.float) {
										navigate(`${action.url}`)
									} else {
										setVisible(action.url.toLowerCase())
									}
								}}>
								<span className="text-[1.25rem]">{action.name}</span>
								<span className="text-[0.75rem]">{action.description}</span>
							</div>
						)
					}
				})
			}
			<UserDetails visible={visible === "userinfo"} onClose={() => setVisible("")} />
		</div>
	)
}
