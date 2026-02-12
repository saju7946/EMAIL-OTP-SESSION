import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'active_session';

export const saveSession = async (email: string, startTime: number) => {
    const session = { email, startTime };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = async (): Promise<{
    email: string;
    startTime: number;
} | null> => {
    const data = await AsyncStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
};

export const clearSession = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
};
