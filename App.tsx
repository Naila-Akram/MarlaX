import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import http from '@framework/http';
import AuthNavigator from '@navigation/auth-navigator';
import AppNavigator from '@navigation/app-navigator';
import { queryClient } from '@utils/query-client';
import { useAuthStore } from './src/stores/app-store';

LogBox.ignoreAllLogs();

const linking = {
  prefixes: ['marlax://', 'https://marlax.com'],
  config: {
    screens: {},
  },
};

const HttpInterceptor = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const id = http.interceptors.response.use(
      response => response,
      error => {
        if (error?.response?.status === 401) {
          useAuthStore.getState().signOut();
        }

        return Promise.reject(error);
      },
    );

    return () => http.interceptors.response.eject(id);
  }, []);

  return <>{children}</>;
};

const RootNavigator = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);

  if (isAuthenticated && user?.register) {
    return <AuthNavigator />;
  }

  if (isAuthenticated) {
    return <AppNavigator />;
  }

  return <AuthNavigator />;
};

const App = () => (
  <GestureHandlerRootView>
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <HttpInterceptor>
          <BottomSheetModalProvider>
            <NavigationContainer linking={linking}>
              <RootNavigator />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </HttpInterceptor>
      </QueryClientProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

export default App;
