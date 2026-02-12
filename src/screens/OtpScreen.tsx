import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import {
    validateOtp,
    getOtpExpiry,
} from '../services/otpManager';
import { useOtpCountdown } from '../hooks/useOtpCountdown';
import { saveSession } from '../services/sessionManager';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export default function OtpScreen({ route, navigation }: Props) {
    const { email } = route.params;

    const [otp, setOtp] = useState('');

    const expiryRef = useRef<number | null>(null);

    if (expiryRef.current === null) {
        expiryRef.current = getOtpExpiry(email);
    }

    const remaining = useOtpCountdown(
        expiryRef.current ?? Date.now()
    );

    const minutes = Math.floor(remaining / 60)
        .toString()
        .padStart(2, '0');

    const seconds = (remaining % 60)
        .toString()
        .padStart(2, '0');

    const handleVerify = async () => {
        if (otp.length !== 6) {
            Alert.alert('Error', 'OTP must be 6 digits');
            return;
        }

        const result = validateOtp(email, otp);

        if (!result.success) {
            Alert.alert('Error', result.reason || 'Invalid OTP');
            return;
        }

        const startTime = Date.now();
        await saveSession(email, startTime);

        navigation.replace('Session', {
            email,
            startTime,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
                Enter OTP
            </Text>

            <Text style={{ marginBottom: 20 }}>
                OTP expires in: {minutes}:{seconds}
            </Text>

            <TextInput
                placeholder="6-digit OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
            />

            <Button title="Verify OTP" onPress={handleVerify} />
        </SafeAreaView>
    );
}
