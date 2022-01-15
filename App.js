import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Contacts from '@screens/Contacts'
import useDatabase from '@hooks/useDatabase'
import { DbContext } from '@context/DbContext';
import * as SQLite from 'expo-sqlite';

export default function App() {

  const isLoadingComplete = useDatabase();
  if (!isLoadingComplete) {
    return null
  } else {
    const db = SQLite.openDatabase('contacts.db');
    return (
      <DbContext.Provider value={db}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <Contacts />
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </DbContext.Provider>
    )
  }
}