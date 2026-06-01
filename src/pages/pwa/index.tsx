import { Route, Routes } from "react-router";
import LandingPage from "./landing";
import UserInformation from "./user";

export default function PWA() {
	return (
		<Routes>
			<Route element={<LandingPage />} path="/" />
			<Route element={<UserInformation />} path="/user/*" />
		</Routes>
	)
}
