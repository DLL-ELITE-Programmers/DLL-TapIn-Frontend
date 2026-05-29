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
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install button or popup
      setShowPopup(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-4 z-50 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <img src="/favicon.svg" alt="App Icon" className="w-8 h-8 invert brightness-0" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Install DLL Tap-IN</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Install our app for a better experience and offline access.
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setShowPopup(false)}
          className="flex-1 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          Later
        </button>
        <button
          onClick={handleInstallClick}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Install
        </button>
      </div>
    </div>
  );
}
