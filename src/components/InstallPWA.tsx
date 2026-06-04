import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isCompatible] = useState(() => {
    return ('BeforeInstallPromptEvent' in window) || ('onbeforeinstallprompt' in window);
  });

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsReady(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (!isCompatible) {
        alert("PWA installation is not supported by your browser's direct prompt. Please use your browser's menu (e.g., 'Add to Home Screen') to install.");
      } else {
        alert("The installation prompt is not ready yet. Please wait a moment or try refreshing.");
      }
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsReady(false);
  };


  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-6 max-w-md w-full transition-all duration-300">
      <div className="flex items-center gap-4">

        <div className="flex-1">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Install DLL VeriScan</h3>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            {isCompatible
              ? "Install our app for a better experience and offline access."
              : "To install, open your browser menu and select 'Add to Home Screen'."}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleInstallClick}
          disabled={!isReady && isCompatible}
          className={`w-full px-6 py-3 text-base font-semibold text-white rounded-xl transition-all shadow-md hover:shadow-lg active:transform active:scale-[0.98] ${!isReady && isCompatible
            ? "bg-blue-400 cursor-not-allowed opacity-70"
            : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isReady ? "Install Application" : isCompatible ? "Preparing..." : "How to Install"}
        </button>
      </div>
    </div>
  );
}
