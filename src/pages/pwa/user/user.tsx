import { FaX } from "react-icons/fa6"
import { useState, useRef } from "react"
import storage from "@/lib/storage"

interface Props {
	visible: boolean
	onClose: () => void
}

export default function UserDetails(props: Props) {
	const [name, setName] = useState("John Doe")
	const [course, setCourse] = useState("BSIT")
	const [yearSection, setYearSection] = useState("4A")
	const [studentId, setStudentId] = useState("2021-0001")

	const userInfo = storage("user")

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

	return (
		<>
			<div
				className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 z-40 ${props.visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
				onClick={props.onClose}
			/>
			<div
				style={{ transform: `translateX(-50%) translateY(${dragOffset}px)` }}
				className={`fixed z-50 left-1/2 ${props.visible ? "bottom-2" : "-bottom-full"} bg-sky-100 h-[calc(85%-0.5rem)] w-[calc(100%-1rem)] ${dragOffset > 0 ? "" : "transition-all duration-500 ease-in-out"} rounded-3xl p-6 shadow-2xl flex flex-col items-center`}>
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

				<div className="w-full max-w-sm flex flex-col gap-6">
					<div className="flex flex-col gap-1">
						<span className="oswald text-2xl text-sky-900">User Information</span>
						<span className="text-sm text-sky-700 font-medium">View and update your personal details</span>
					</div>

					<div className="flex flex-col gap-4 w-full">
						<div className="flex flex-col gap-1">
							<label className="text-xs font-bold text-sky-800 uppercase tracking-wider ml-1">Full Name</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="bg-white border-2 border-sky-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-colors shadow-sm"
							/>
						</div>

						<div className="flex flex-col gap-1">
							<label className="text-xs font-bold text-sky-800 uppercase tracking-wider ml-1">Student ID</label>
							<input
								type="text"
								value={userInfo.username}
								onChange={(e) => setStudentId(e.target.value)}
								className="bg-white border-2 border-sky-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-colors shadow-sm"
							/>
						</div>

						<div className="flex flex-row gap-4 w-full">
							<div className="flex flex-col gap-1 w-[calc(60%-0.5rem)]">
								<label className="text-xs font-bold text-sky-800 uppercase tracking-wider ml-1">Course</label>
								<input
									type="text"
									value={userInfo.department}
									onChange={(e) => setCourse(e.target.value)}
									className="bg-white border-2 border-sky-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-colors shadow-sm"
								/>
							</div>
							<div className="flex flex-col gap-1 w-[calc(40%-0.5rem)]">
								<label className="text-xs font-bold text-sky-800 uppercase tracking-wider ml-1">Year & Section</label>
								<input
									type="text"
									value={yearSection}
									onChange={(e) => setYearSection(e.target.value)}
									className="bg-white border-2 border-sky-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 transition-colors shadow-sm text-center"
								/>
							</div>
						</div>
					</div>

					<button
						className="bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 hover:bg-sky-700 active:scale-95 transition-all mt-4"
					>
						SAVE CHANGES
					</button>
				</div>
			</div>
		</>
	)
}
