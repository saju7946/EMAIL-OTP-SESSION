import AsyncStorage from '@react-native-async-storage/async-storage';

export const logEvent = async (
    event: string,
    payload?: Record<string, any>
) => {
    try {
        const existing = await AsyncStorage.getItem('logs');
        const logs = existing ? JSON.parse(existing) : [];

        logs.push({
            event,
            payload,
            timestamp: Date.now(),
        });

        await AsyncStorage.setItem('logs', JSON.stringify(logs));
    } catch (error) {
        console.log('Analytics error:', error);
    }
};
