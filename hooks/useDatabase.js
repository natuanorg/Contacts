import React from 'react'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-asset'
import * as SplashScreen from 'expo-splash-screen'

export default function useDatabase() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false)

    React.useEffect(() => {
        async function openDatabase() {
            SplashScreen.preventAutoHideAsync()
            try {
                if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/contacts.db')).exists) {
                    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
                        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite')
                    }
                    await FileSystem.downloadAsync(
                        Asset.fromModule(require('@database/contacts.db')).uri,
                        FileSystem.documentDirectory + 'SQLite/contacts.db'
                    )
                }
            } catch (error) {
                console.warn(e)
            } finally {
                setLoadingComplete(true)
                SplashScreen.hideAsync()
            }
        }
        openDatabase()
    }, [])
    return isLoadingComplete
}