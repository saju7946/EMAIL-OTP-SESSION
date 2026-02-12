import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

export const useSessionTimer = (startTime: number) => {
    const [duration, setDuration] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const updateDuration = () => {
            const seconds = Math.floor((Date.now() - startTime) / 1000);
            setDuration(seconds);
        };

        updateDuration();
        intervalRef.current = setInterval(updateDuration, 1000);

        const subscription = AppState.addEventListener('change', state => {
            if (state === 'active') {
                updateDuration();
            }
        });

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            subscription.remove();
        };
    }, [startTime]);

    return duration;
};
