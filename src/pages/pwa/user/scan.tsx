import { useEffect, useRef, useState } from "react";
import {
	Html5QrcodeScanner,
	Html5QrcodeScanType,
} from "html5-qrcode";

export default function ScanQRCode() {
	const [code, setCode] = useState("");
	const scannerRef = useRef<Html5QrcodeScanner | null>(null);

	useEffect(() => {
		const scanner = new Html5QrcodeScanner(
			"reader",
			{
				fps: 10,
				qrbox: 200,
				aspectRatio: 1,
				supportedScanTypes: [
					Html5QrcodeScanType.SCAN_TYPE_CAMERA,
				],
			},
			false
		);

		scannerRef.current = scanner;

		const onScanSuccess = async (decodedText: string) => {
			console.log("Scanned:", decodedText);
			setCode(decodedText);

			// STOP + CLEAR SCANNER after success
			await scanner.clear().catch(() => { });
			scannerRef.current = null;
		};

		scanner.render(onScanSuccess, () => { });

		return () => {
			scanner.clear().catch(() => { });
		};
	}, []);

	const restartScanner = () => {
		if (scannerRef.current) return;

		const scanner = new Html5QrcodeScanner(
			"reader",
			{
				fps: 10,
				qrbox: 200,
			},
			false
		);

		scannerRef.current = scanner;

		scanner.render(
			(text) => setCode(text),
			() => { }
		);
	};

	return (
		<div className="flex flex-col items-center">
			<div id="reader" />
			<p>{code}</p>

			<button onClick={restartScanner}>
				Scan Again
			</button>
		</div>
	);
}
