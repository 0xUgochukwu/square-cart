import { useEffect, useState } from "react";

const InstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                } else {
                    console.log("User dismissed the install prompt");
                }
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <button
            className={`[font-family:'Montserrat'] m-auto w-[90%] block text-center rounded-[20px] bg-white p-[10px] text-[black] font-bold mt-5 ${
                !deferredPrompt ? "!hidden" : ""
            }`}
            onClick={handleInstallClick}
            disabled={!deferredPrompt}
        >
            Install App
        </button>
    );
};

export default InstallButton;
