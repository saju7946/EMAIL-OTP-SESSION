import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useSessionTimer } from '../hooks/useSessionTimer';
import { logEvent } from '../services/analytics';
import { clearSession } from '../services/sessionManager';

type Props = NativeStackScreenProps<RootStackParamList, 'Session'>;

export default function SessionScreen({ route, navigation }: Props) {
    const { email, startTime } = route.params;

    const duration = useSessionTimer(startTime);

    const minutes = Math.floor(duration / 60)
        .toString()
        .padStart(2, '0');

    const seconds = (duration % 60)
        .toString()
        .padStart(2, '0');

    const handleLogout = async () => {
        await logEvent('logout', { email });
        await clearSession();
        navigation.replace('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Session Active</Text>

                <Text style={styles.email}>Logged in as:</Text>
                <Text style={styles.emailValue}>{email}</Text>

                <Text style={styles.timer}>
                    Duration: {minutes}:{seconds}
                </Text>
            </View>

            <Button title="Logout" onPress={handleLogout} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    emailValue: {
        fontSize: 18,
        marginBottom: 20,
    },
    timer: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
    },
});
