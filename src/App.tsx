import { useEffect, useState } from "react";

function App() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const password = import.meta.env.VITE_PASSWORD;
  const openPage = () => {
    const link = document.createElement("a");
    link.href = "https://1-thing.in/#/timesheet";
    link.rel = "noopener noreferrer";
    link.click();
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsStandalone(e.matches);
        confirmPassword && openPage();
      }
    };

    // Initial check
    if (mediaQuery.matches) {
      const confirm = window.prompt("Confirm password");
      setConfirmPassword(password === confirm);
      setIsStandalone(mediaQuery.matches);
      password === confirm && openPage();
    }
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    if (navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          display: "grid",
          placeContent: "center",
          height: "100%",
        }}
      >
        {!confirmPassword && isStandalone && <p>Wrong password!</p>}
        {!isStandalone ? (
          <p
            style={{
              fontSize: "24px",
              color: "red",
            }}
          >
            Please add this app into your home screen
          </p>
        ) : (
          <>
            {!confirmPassword ? (
              <button onClick={() => window.location.reload()}>
                Try Again
              </button>
            ) : (
              <p>Loading...</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
