import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

const TOKEN_KEY = 'userToken';

export const login = async (username: string, password: string): Promise<string> => {
    // Dummy API call simulation
    if (username === 'user' && password === 'password') {
        const token = 'dummy-jwt-token';
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        return token;
    } else {
        throw new Error('Invalid credentials');
    }
};

export const getToken = async (): Promise<string | null> => {
    return SecureStore.getItemAsync(TOKEN_KEY);
};

export const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
};

export const biometricLogin = async (): Promise<boolean> => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Login with Biometrics' });
        return result.success;
    }
    return false;
}; 