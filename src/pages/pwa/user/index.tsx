import { Routes, Route } from "react-router";
import UserLandingPage from "./landing";
import QRGenerator from "./qr";
import ScanQRCode from "./scan";

export default function UserInformation() {
	return (
		<Routes>
			<Route element={<UserLandingPage />} path="/" />
			<Route element={<QRGenerator />} path="/qr" />
			<Route element={<ScanQRCode />} path="/scan" />
		</Routes>
	)
}
