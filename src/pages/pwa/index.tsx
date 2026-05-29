import { Route, Routes } from "react-router";
import LandingPage from "./landing";
import UserInformation from "./user";

export default function PWA() {
	return (
		<div className="h-full w-full ">
			<Routes>
				<Route element={<LandingPage />} path="/" />
				<Route element={<UserInformation />} path="user/" />
			</Routes>
		</div>
	)
}
