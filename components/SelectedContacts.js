import React from 'react'
import { Text, View, StyleSheet, FlatList, Pressable, Image } from 'react-native'

const AVATAR_SIZE = 44
const CLOSE_BTN_SIZE = 16
const CLOSE_ICON_SIZE = CLOSE_BTN_SIZE * 2 / 5

const closeIcon = require('@assets/ic_action_close.png')

const SelectedItem = ({item, onPress}) => {
    const {name, type} = item
    return (
        <Pressable style={styles.item} onPress={() => onPress(item)}>
            <View style={styles.avatar} />
            <Text style={styles.name}>{type === 'group' ? 'Nhóm' :name.substring(name.trim().lastIndexOf(" ") + 1)}</Text>
            <View style={styles.closeBtn}>
                <Image source={closeIcon} style={styles.closeIcon} />
            </View>
        </Pressable>
    )
}

export default function SelectedContacts({ selectedItems = [], onUnselect, onCreate}) {
    return (
        <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                horizontal={true}
                data={selectedItems}
                keyExtractor={(item, index) => `selected_${item.id}`}
                renderItem={({ item }) => <SelectedItem item={item} onPress={onUnselect}/>}
                ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            />
            {selectedItems.length > 1 && <Pressable style={styles.createBtn} onPress={onCreate}>
                <Text style={styles.createText}>Tạo nhóm</Text>
            </Pressable>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    content: {

    },
    contentContainer: {
        paddingHorizontal: 16
    },
    createBtn: {
        backgroundColor: '#CE2D81',
        paddingHorizontal: 8,
        borderRadius: 8,
        marginHorizontal: 12,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    },
    createText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    item: {
        alignItems: 'center',
        paddingVertical: 10
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        backgroundColor: '#CE2D81'
    },
    name: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '300'
    },
    closeBtn: {
        backgroundColor: 'black',
        width: CLOSE_BTN_SIZE,
        height: CLOSE_BTN_SIZE,
        borderRadius: CLOSE_BTN_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 8,
        right: 0,
        borderWidth: 1.5,
        borderColor: 'white'
    },
    closeIcon: {
        width: CLOSE_ICON_SIZE,
        height: CLOSE_ICON_SIZE
    }
})
