import { useEffect } from "react";

export default function useWebsiteTitle(title) {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    return (title) => document.title = title; 
}