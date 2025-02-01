"use client";

import { Slide, ToastContainer } from "react-toastify";

interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <ToastContainer
                toastStyle={{ backgroundColor: "#1f2937", top: "4rem" }}
                limit={1}
                autoClose={3000}
                transition={Slide}
                theme="dark"
            />
        </>
    );
}
