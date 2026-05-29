import { useState } from "react"
import { FaEye, FaEyeSlash, FaX } from "react-icons/fa6"

interface FormProps {
	visible: boolean
	onClose: () => void
}

export default function Login(props: FormProps) {
	const [studentId, setStudentId] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("Logging in with:", { studentId, password })
	}

	return (
		<div className={`fixed ${props.visible ? "bottom-0" : "-bottom-[100%]"} bg-sky-100 h-[calc(55%-0.5rem)] w-full transition-all duration-500 ease-in-out rounded-t-3xl p-6 shadow-2xl flex flex-col items-center`}>
			<button
				onClick={props.onClose}
				className="absolute top-4 right-4 p-2 text-sky-900 hover:bg-sky-200 rounded-full transition-colors"
			>
				<FaX />
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
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								className="w-full bg-white border-2 border-sky-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-colors shadow-sm pr-12"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-sky-600 hover:text-sky-800 transition-colors"
							>
								{showPassword ? (
									<FaEye />
								) : (
									<FaEyeSlash />
								)}
							</button>
						</div>
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
