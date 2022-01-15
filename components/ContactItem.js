import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Checkbox from 'expo-checkbox';

const ContactItem = ({ contact = { name: 'Nguyễn Anh Tuấn', phone: '096.53.49.777' }, isChecked, onCheckedChange = () => { } }) => {
    return (
        <View style={styles.item}>
            <View style={styles.avatar}>
                <View style={[styles.avatarImg, { backgroundColor: `#e751c2` }]} />
            </View>
            <View style={styles.content}>
                <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.name}>{contact.name.toUpperCase()}</Text>
                    <Text numberOfLines={1} style={styles.phone}>{contact.phone}</Text>
                </View>
                <Checkbox
                    hitSlop={{ left: 20, top: 20, right: 20, bottom: 20 }}
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={() => onCheckedChange(contact)}
                    color={isChecked ? '#4FBC0C' : undefined}
                />
            </View>

        </View>
    )
}

export default React.memo(ContactItem)

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
        backgroundColor: 'yellow'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    phone: {
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