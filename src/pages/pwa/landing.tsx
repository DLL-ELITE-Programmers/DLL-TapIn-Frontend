import { useState } from "react";
import Logo from "@/assets/logo.png"
import Login from "./login";
import Registration from "./register";
import { ToastContainer } from "react-toastify";

export default function LandingPage() {
	const [login, setLogin] = useState(false)
	const [register, setRegister] = useState(false)

	return (
		<div className={`flex flex-col items-center h-full w-full p-6 relative`}>
			<div className={`flex flex-col items-center w-full justify-center ${login || register ? "h-[calc(50%-1rem)]" : "h-[calc(100%-120px)]"} transition-all duration-500 ease-in-out`}>
				<img className="w-[35%] md:w-[15%] drop-shadow-2xl rounded-full" src={Logo} />
				<div className="flex flex-col items-center justify-center text-center w-full gap-2">
					<span className="oswald text-sky-900 text-[2.5rem] md:text-[4rem] font-bold tracking-tight">DLL VeriScan</span>
					{
						login || register ? (
							<div className="flex flex-col items-center text-center gap-0.5 text-sky-900/60 mt-2 animate-in fade-in duration-700">
								<span className="font-bold text-[0.7rem]">Developed by BSIT Department</span>
								<span className="font-semibold text-[0.6rem]">In Collaboration with DLL ELITE and DLL IT Paradigm</span>
							</div>
						) :
							<>
								<div className="flex flex-col items-center w-full gap-2 mt-4">
									<button
										onClick={() => setLogin(true)}
										className="bg-sky-600 text-white font-bold py-3 px-12 rounded w-2/3 shadow-lg hover:bg-sky-700 transition-all text-lg"
									>
										Login
									</button>
									<button
										onClick={() => setRegister(true)}
										className="bg-sky-100 border-sky-600 border-2 text-sky-600 font-bold py-3 px-12 rounded w-2/3 shadow-lg hover:bg-sky-50 transition-all text-lg"
									>
										Register
									</button>
								</div>
							</>
					}
				</div>
			</div>

			<div className="absolute bottom-10 flex flex-col items-center text-center gap-1 text-sky-900/70">
				<span className="font-bold text-[0.8rem] md:text-[1.2rem]">Developed by BSIT Department</span>
				<span className="font-semibold text-[0.7rem] md:text-[1rem]">In Collaboration with DLL ELITE and DLL IT Paradigm</span>
			</div>

			<Login visible={login} onClose={() => setLogin(false)} />
			<Registration visible={register} onClose={() => setRegister(false)} />
			<ToastContainer />
		</div>
	)
}
