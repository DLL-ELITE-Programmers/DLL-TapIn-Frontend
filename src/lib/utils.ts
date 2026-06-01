export const isPWA =
	window.matchMedia('(display-mode: standalone)').matches ||
	window.matchMedia('(display-mode: fullscreen)').matches ||
	window.matchMedia('(display-mode: minimal-ui)').matches ||
	(window.navigator as Navigator & { standalone?: boolean }).standalone === true;

export const isMobile = true //Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


