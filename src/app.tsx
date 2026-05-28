import { HashRouter } from "react-router";
import Pages from "./pages";

export default function App() {
	return (
		<HashRouter>
			<div className="h-dvh w-dvw">
				<Pages />
			</div>
		</HashRouter>
	)
}
