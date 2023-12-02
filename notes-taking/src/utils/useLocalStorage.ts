import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue === null) {
            if (typeof initialValue === 'function') {
                return (initialValue as () => T)();
            } else {
                return initialValue;
            }
        } else {
            try {
                return JSON.parse(jsonValue);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return initialValue;
            }
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as [T, typeof setValue];
}