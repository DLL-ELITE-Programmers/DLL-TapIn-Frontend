import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect } from "react"

export default function ScanQRCode() {
	useEffect(() => {
		const scanner = new Html5QrcodeScanner(
			"reader",
			{
				fps: 10,
				qrbox: 200
			},
			false
		)
		scanner.render((decode: string) => {
			console.log(decode)
		}, (error: string) => {
			console.error(error)
		})

		return () => {
			scanner.clear().catch(() => { })
		}
	}, [])
	return (
		<div>
			<span>Scan</span>
			<span id="reader"></span>
		</div>
	)
}
