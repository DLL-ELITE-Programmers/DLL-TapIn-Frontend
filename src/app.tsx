import { HashRouter, Route, Routes } from "react-router";
import Pages from "./pages";
import InstallPWA from "./components/InstallPWA";

export default function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={
					<div className="h-dvh w-dvw">
						Test Mode
						<InstallPWA />
					</div>
				} />
			</Routes>
		</HashRouter>
	)
}
