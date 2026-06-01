import { QRCodeSVG } from "qrcode.react";

export default function QRGenerator() {
	return (
		<div className="flex flex-col items-center justify-center h-full w-full p-3">
			<div className="flex flex-col items-center bg-sky-100 rounded-lg p-10 w-[calc(75%-1rem)] gap-5">
				<span>
					<QRCodeSVG value="https://google.com" size={200} bgColor="#00000025" className="rounded-lg" marginSize={2} />
				</span>
				<div className="flex flex-col items-center">
					<span className="text-[1.5rem] font-bold">Name</span>
					<span>Student ID</span>
				</div>
			</div>
		</div>
	)
}
