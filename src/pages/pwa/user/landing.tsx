import { useNavigate } from "react-router"

const actions = [
	{
		name: "User Information",
		description: "This is just to see your personal information like name, course, year and section",
		url: "info"
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

	return (
		<div className="flex flex-col overflow-hidden overflow-y-auto gap-2 p-2">
			{
				actions.map((action) => {
					if ((action.authorize && authorized) || (!action.authorize)) {
						return (
							<div
								className="flex flex-col bg-sky-50 p-2 rounded"
								onClick={() => {
									navigate(`${action.url}`)
								}}>
								<span className="text-[1.25rem]">{action.name}</span>
								<span className="text-[0.75rem]">{action.description}</span>
							</div>
						)
					}
				})
			}
		</div>
	)
}
