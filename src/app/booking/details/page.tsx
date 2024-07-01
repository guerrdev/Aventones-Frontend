// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "react-feather";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <>
            {theme === "light" && (
                <Sun
                    size={40}
                    color="black"
                    style={{ cursor: "pointer" }}
                    onClick={() => setTheme("dark")}
                />
            )}

            {theme === "dark" && (
                <Moon
                    size={40}
                    color="white"
                    style={{ cursor: "pointer" }}
                    onClick={() => setTheme("light")}
                />
            )}
        </>
    )
};