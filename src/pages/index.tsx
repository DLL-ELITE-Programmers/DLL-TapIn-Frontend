import { isPWA } from "../lib/utils";

export default function Pages() {
	return (
		<div className="flex items-center justify-center h-full text-2xl font-bold text-zinc-800 dark:text-zinc-200">
			Status: {isPWA ? "PWA Mode" : "Browser Mode"}
		</div>
	)
}
