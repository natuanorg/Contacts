import React from 'react'
import {View, StyleSheet} from 'react-native'
import SectionHeader from './SectionHeader'
import ListGroups from './ListGroups'

export default function ContactsSectionListHeader(props){
    const {recents, groups} = props
    return (
        <View>
            <SectionHeader title={'Nhóm'}/>
            <ListGroups groups={groups} />            
        </View>
    )
}

const styles = StyleSheet.create({

})