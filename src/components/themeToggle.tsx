import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    if (theme) {
        return (
            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
            >
                {theme === "dark" ? <Sun /> : <Moon />}
            </button>
        );
    }
    return null;
}
