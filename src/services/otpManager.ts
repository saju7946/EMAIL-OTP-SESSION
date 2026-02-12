import { OTPEntry } from '../types/auth';

const otpStore: Map<string, OTPEntry> = new Map();

export const generateOtp = (email: string): string => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore.set(email, {
        otp,
        expiresAt: Date.now() + 60_000,
        attempts: 0,
    });

    return otp;
};

export const validateOtp = (
    email: string,
    input: string
): { success: boolean; reason?: string } => {
    const entry = otpStore.get(email);

    if (!entry) return { success: false, reason: 'No OTP found' };

    if (Date.now() > entry.expiresAt)
        return { success: false, reason: 'OTP expired' };

    if (entry.attempts >= 3)
        return { success: false, reason: 'Maximum attempts exceeded' };

    if (entry.otp !== input) {
        entry.attempts += 1;
        return { success: false, reason: 'Incorrect OTP' };
    }

    otpStore.delete(email);
    return { success: true };
};

export const getOtpExpiry = (email: string): number | null => {
    const entry = otpStore.get(email);
    return entry ? entry.expiresAt : null;
};
