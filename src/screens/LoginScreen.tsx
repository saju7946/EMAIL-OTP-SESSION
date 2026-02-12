import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Text,
    TextInput,
    Button,
    Alert,
    View,
    StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { generateOtp } from '../services/otpManager';
import { logEvent } from '../services/analytics';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);

    const handleSendOtp = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter email');
            return;
        }

        const otp = generateOtp(email.trim());

        // Show OTP on screen (Demo mode)
        setGeneratedOtp(otp);
        Alert.alert("Your otp is " + otp);

        await logEvent('otp_generated', { email });

        navigation.navigate('Otp', { email: email.trim() });
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        setGeneratedOtp(null); // reset OTP display if email changes
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Email Login</Text>

                <TextInput
                    placeholder="Enter email"
                    value={email}
                    onChangeText={handleEmailChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={styles.input}
                />

                <Button title="Send OTP" onPress={handleSendOtp} />

                {generatedOtp && (
                    <View style={styles.otpBox}>
                        <Text style={styles.demoText}>Demo OTP (for testing):</Text>
                        <Text style={styles.otpText}>{generatedOtp}</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 12,
        marginBottom: 20,
    },
    otpBox: {
        marginTop: 20,
        padding: 15,
        borderWidth: 1,
        borderRadius: 6,
    },
    demoText: {
        fontSize: 14,
        marginBottom: 5,
    },
    otpText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
