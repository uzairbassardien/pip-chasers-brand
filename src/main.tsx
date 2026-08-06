import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme early to avoid flash. Default is light.
if (typeof window !== "undefined") {
	try {
		const stored = localStorage.getItem("theme");
		if (stored === "dark") document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	} catch (e) {
		// ignore
	}
}

createRoot(document.getElementById("root")!).render(<App />);
