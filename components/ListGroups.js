import React from 'react'
import {View, StyleSheet} from 'react-native'
import { isEmpty } from 'lodash'
import GroupItem from './GroupItem'

export default function ListGroups({groups, isChecked, onCheckedChange}){
    if(isEmpty(groups)) return null
    return (
        <View>
            {
                groups.map(group => <GroupItem key={group.id} group={group}/>)
            }    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }    
})