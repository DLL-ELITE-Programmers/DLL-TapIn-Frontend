import { HashRouter, Navigate, Route, Routes } from "react-router";
import Pages from "./pages";
import InstallPWA from "./components/InstallPWA";
import { isMobile, isPWA } from "./lib/utils";
import DLLLogo from "./assets/dll_logo.png"

export default function App() {
	return (
		<div className="h-dvh w-dvw select-none bg-[url('bg.png')] bg-norepeat bg-cover bg-center overflow-hidden">
			<div className="bg-amber-50/50 h-full w-full backdrop-blur-xs">
				<HashRouter>
					<Routes>
						<Route path="/" element={
							(isPWA || isMobile) ? <Navigate to="/pwa" replace /> :
								<div className="flex flex-col gap-8 items-center justify-center h-full w-full p-4">
									<img className="w-[30%] md:w-[15%] drop-shadow-lg" src={DLLLogo} />
									<InstallPWA />
								</div>
						} />
						<Route path="pwa/*" element={(isPWA || isMobile) ? <Pages /> : <Navigate to="/" replace />} />
					</Routes>
				</HashRouter>
			</div>
		</div>
	)
}
