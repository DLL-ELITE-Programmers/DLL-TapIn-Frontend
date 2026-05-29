import { Route, Routes } from "react-router";
import LandingPage from "./landing";

export default function PWA() {
	return (
		<div className="h-full w-full ">
			<Routes>
				<Route element={<LandingPage />} path="/" />
			</Routes>
		</div>
	)
}
