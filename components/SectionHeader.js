import React from 'react'
import {Text, StyleSheet} from 'react-native'

export default function SectionHeader({title}){
    return (<Text style={styles.header}>{title}</Text>)
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 12,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#EEEEEE',
        paddingVertical: 4
    }
})
