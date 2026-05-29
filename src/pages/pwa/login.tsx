import { useState } from "react"

interface FormProps {
	visible: boolean
	onClose: () => void
}

export default function Login(props: FormProps) {
	const [studentId, setStudentId] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("Logging in with:", { studentId, password })
	}

	return (
		<div className={`fixed ${props.visible ? "bottom-0" : "-bottom-[100%]"} bg-sky-100 h-[calc(60%-0.5rem)] w-full transition-all duration-500 ease-in-out rounded-t-3xl p-6 shadow-2xl flex flex-col items-center`}>
			<button 
				onClick={props.onClose}
				className="absolute top-4 right-4 p-2 text-sky-900 hover:bg-sky-200 rounded-full transition-colors"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
			</button>
			
			<form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4 mt-4">
				<div className="flex flex-col gap-1 mb-2">
					<span className="oswald text-2xl text-sky-900">Welcome Back!</span>
					<span className="text-sm text-sky-700 font-medium">Please login to your account</span>
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<label className="text-xs font-bold text-sky-800 uppercase tracking-wider ml-1">Student ID</label>
						<input
							type="text"
							value={studentId}
							onChange={(e) => setStudentId(e.target.value)}
							placeholder="Enter your student ID"
							className="bg-white border-2 border-sky-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-colors shadow-sm"
							required
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label className="text-xs font-bold text-sky-800 uppercase tracking-wider ml-1">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							className="bg-white border-2 border-sky-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-colors shadow-sm"
							required
						/>
					</div>

					<div className="flex justify-end">
						<button
							type="button"
							className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors uppercase tracking-tight"
						>
							Forgot Password?
						</button>
					</div>

					<button
						type="submit"
						className="bg-sky-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-sky-200 hover:bg-sky-700 active:scale-95 transition-all mt-2"
					>
						LOGIN
					</button>
				</div>
			</form>
		</div>
	)
}
