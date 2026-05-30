import { useState, useRef } from "react"
import { FaEye, FaEyeSlash, FaX } from "react-icons/fa6"
import { useNavigate } from "react-router"

interface FormProps {
	visible: boolean
	onClose: () => void
}

export default function Login(props: FormProps) {
	const [studentId, setStudentId] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()

	const [dragOffset, setDragOffset] = useState(0)
	const startY = useRef(0)

	const handleTouchStart = (e: React.TouchEvent) => {
		startY.current = e.touches[0].clientY
	}

	const handleTouchMove = (e: React.TouchEvent) => {
		const deltaY = e.touches[0].clientY - startY.current
		if (deltaY > 0) {
			setDragOffset(deltaY)
		}
	}

	const handleTouchEnd = () => {
		if (dragOffset > 100) {
			props.onClose()
		}
		setDragOffset(0)
	}

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		navigate("user")
		console.log("Logging in with:", { studentId, password })
	}

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 z-40 ${props.visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
				onClick={props.onClose}
			/>
			<div
				style={{ transform: `translateX(-50%) translateY(${dragOffset}px)` }}
				className={`fixed z-50 left-1/2 ${props.visible ? "bottom-2" : "-bottom-full"} bg-sky-100 h-[calc(60%-0.5rem)] w-[calc(100%-1rem)] ${dragOffset > 0 ? "" : "transition-all duration-500 ease-in-out"} rounded-3xl p-6 shadow-2xl flex flex-col items-center`}>
				<div
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					className="w-12 h-1.5 bg-sky-300/50 rounded-full mb-4 shrink-0 cursor-grab active:cursor-grabbing"
				/>
				<button
					onClick={props.onClose}
					className="absolute top-6 right-6 p-2 text-sky-900 hover:bg-sky-200 rounded-full transition-colors"
				>
					<FaX />
				</button>

				<form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
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
		</>
	)
}
