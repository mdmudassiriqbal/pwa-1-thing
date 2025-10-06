import { useEffect, useState } from "react";

function App() {
  const [isStandalone, setIsStandalone] = useState(false);
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
        openPage();
      }
    };

    // Initial check
    if (mediaQuery.matches) {
      setIsStandalone(mediaQuery.matches);
      openPage();
    }
    mediaQuery.addEventListener("change", handleMediaQueryChange);

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
            <p>Loading...</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
