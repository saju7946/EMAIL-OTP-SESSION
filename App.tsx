import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import OtpScreen from './src/screens/OtpScreen';
import SessionScreen from './src/screens/SessionScreen';
import { getSession } from './src/services/sessionManager';

export type RootStackParamList = {
  Login: undefined;
  Otp: { email: string };
  Session: { email: string; startTime: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>('Login');

  const [sessionData, setSessionData] = useState<{
    email: string;
    startTime: number;
  } | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      if (session) {
        setSessionData(session);
        setInitialRoute('Session');
      }
      setLoading(false);
    };

    loadSession();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen}
          options={{
            headerBackVisible: false
          }} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen

          name="Session"
          component={SessionScreen}
          initialParams={sessionData ?? undefined}
          options={{
            headerBackVisible: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
