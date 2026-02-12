import { useEffect, useState } from 'react';

export const useOtpCountdown = (expiryTime: number) => {
    const [remaining, setRemaining] = useState(
        Math.max(0, Math.floor((expiryTime - Date.now()) / 1000))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const secondsLeft = Math.max(
                0,
                Math.floor((expiryTime - Date.now()) / 1000)
            );
            setRemaining(secondsLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, [expiryTime]);

    return remaining;
};
