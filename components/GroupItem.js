import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Checkbox from 'expo-checkbox';

const GroupItem = ({ group = { name: 'Nhi, Ngọc và 2 người khác' }, isChecked, onCheckedChange = () => { } }) => {
    return (
        <View style={styles.item}>
            <View style={styles.avatar}>
                <View style={[styles.avatarImg, { backgroundColor: `#b4b967` }]} />
            </View>
            <View style={styles.content}>
                <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.title}>{group.name.toUpperCase()}</Text>
                    <Text numberOfLines={1} style={styles.subTitle}>{'Nhóm'}</Text>
                </View>
                <Checkbox
                    hitSlop={{ left: 20, top: 20, right: 20, bottom: 20 }}
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={() => onCheckedChange(group)}
                    color={isChecked ? '#4FBC0C' : undefined}
                />
            </View>

        </View>
    )
}

export default React.memo(GroupItem)

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        minHeight: 64,
        paddingHorizontal: 12,

    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE'
    },
    info: {
        flexGrow: 1,
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 12,
        paddingVertical: 8
    },
    avatar: {
        width: 52,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarImg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#b4b967'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '300'
    },
    checkboxWrapper: {

    },
    checkbox: {
        margin: 8,
        alignSelf: 'center',

    }
})