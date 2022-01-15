import React, { useEffect, useContext, useState, useCallback } from 'react'
import { View, StyleSheet, SectionList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { DbContext } from '@context/DbContext';
import SearchHeader from '@components/SearchHeader';
import ContactItem from '@components/ContactItem';
import GroupItem from '@components/GroupItem';
import SectionHeader from '@components/SectionHeader';
import SelectedContacts from '@components/SelectedContacts'
import Animated, { SlideOutDown, SlideInDown } from 'react-native-reanimated';
import { lastWord } from '@helper/string'
import QUERY from '@database/query';
import latinize from 'latinize'

import { get, chain, find, isEmpty, debounce, filter, isNull, reduce, map } from 'lodash';

const TYPE = { CONTACT: 'contact', GROUP: 'group' }

export default function Contacts() {

    const db = useContext(DbContext)
    const [keyword, setKeyword] = useState(null)
    const [contacts, setContacts] = useState(null)
    const [groups, setGroups] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [lastInsertGroup, setLastInsertGroup] = useState(null)

    const createContactSectionListData = (array) => {
        setContacts(chain(array)
            .groupBy(({name}) => latinize(name[0]))
            .map((data, title) => ({ title, data }))
            .sortBy('title', 'asc')
            .value())
    }

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(QUERY.GET_ALL_CONTACTS, null, (_, { rows: { _array } }) => createContactSectionListData(_array))
            tx.executeSql(QUERY.GET_ALL_GROUPS, null, (_, { rows: { _array } }) => {
                setGroups(_array)
            })
        })
    }, [])

    const onToggleItem = (item) => {
        const exist = find(selectedItems, { type: item.type, id: item.id })
        const newSelectedItems = exist ? filter(selectedItems, ({ id, type }) => type = item.type && id != item.id) : [...selectedItems, item]
        setSelectedItems(newSelectedItems)
    }

    const renderItem = ({ item }) => {
        return (<ContactItem contact={item}
            isChecked={!!find(selectedItems, { 'id': item.id, type: TYPE.CONTACT })}
            onCheckedChange={(item) => onToggleItem({ ...item, type: TYPE.CONTACT })} />)
    }

    const renderSectionHeader = ({ section: { title } }) => <SectionHeader title={title} />

    const renderListHeaderComponent = () => {
        return (<View>
            {
                !isEmpty(contacts) && !isEmpty(groups) && <>
                    <SectionHeader title={'Nhóm'} />
                    {
                        groups.map(group => <GroupItem
                            key={`group_${group.id}`}
                            isChecked={!!find(selectedItems, { 'id': group.id, type: TYPE.GROUP })}
                            group={group}
                            onCheckedChange={(item) => onToggleItem({ ...item, type: TYPE.GROUP })}
                        />)
                    }
                </>
            }
        </View>)
    }

    const searchContacts = () => {
        console.log('searchContacts.keyword', keyword)
        let searchContactsSql
        if (isEmpty(keyword)) {
            searchContactsSql = QUERY.GET_ALL_CONTACTS
        } else if (/^\d+$/.test(keyword)) {
            searchContactsSql = QUERY.SEARCH_CONTACT_BY_PHONE(keyword)
        } else {
            searchContactsSql = QUERY.SEARCH_CONTACT_BY_NAME(keyword)
        }
        db.transaction((tx) => {
            tx.executeSql(searchContactsSql, null, (_, { rows: { _array } }) => createContactSectionListData(_array))
        })
    }

    const delaySearchContacts = useCallback(debounce(searchContacts, 200), [keyword])

    useEffect(() => {
        if (!isNull(keyword)) delaySearchContacts()
        return delaySearchContacts.cancel
    }, [keyword, delaySearchContacts])

    useEffect(() => {
        if (isNull(keyword) || isEmpty(contacts)) return
        let searchGroupsSql
        if (isEmpty(keyword)) {
            searchGroupsSql = QUERY.GET_ALL_GROUPS
        } else {
            const contactIds = reduce(contacts, (result, { data }) => [...result, ...map(data, 'id')], [])
            searchGroupsSql = QUERY.SEARCH_GROUPS_BY_CONTACT_IDS(contactIds)
        }
        db.transaction((tx) => {
            tx.executeSql(searchGroupsSql, null, (_, { rows: { _array } }) => {
                setGroups(_array)
            })
        })
    }, [contacts])

    const createGroup = () => {
        console.log('selectedItems', selectedItems);
        const hasSelectedGroup = find(selectedItems, {type: TYPE.GROUP})
        if(hasSelectedGroup) {
            return
        }
        const groupName = `${lastWord(selectedItems[0].name)}, ${lastWord(selectedItems[1].name)} ${selectedItems.length <= 2 ? '' : `và ${selectedItems.length - 2} người khác`}`
        const createGroupSql = QUERY.CREATE_GROUP(groupName)
        db.transaction((tx) => {
            tx.executeSql(createGroupSql, [], (_, { rows: { _array } }) => {
                setLastInsertGroup(get(_array, '[0]', null))
                setSelectedItems([])
            })
        })
    }

    useEffect(() => {
        if (lastInsertGroup) {
            const insertUsersToGroup = QUERY.ADD_USERS_TO_GROUP(selectedItems.map(({ id }) => `(${lastInsertGroup.id}, ${id})`).join(','))
            db.transaction((tx) => {
                tx.executeSql(insertUsersToGroup, null, (_, { rows: { _array } }) => {
                    console.log('insertUsersToGroup.result', _array)
                })
                tx.executeSql(QUERY.GET_ALL_GROUPS, [], (_, { rows: { _array } }) => {
                    setGroups(_array)
                })
            })
        }
    }, [lastInsertGroup])

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <SearchHeader onChangeText={(text) => setKeyword(text)} />
            <SectionList
                contentContainerStyle={isEmpty(contacts) ? { flex: 1 } : {}}
                ListHeaderComponent={renderListHeaderComponent()}
                extraData={[selectedItems, groups]}
                sections={contacts || []}
                keyExtractor={(item) => `contact_${item.id}`}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                ListEmptyComponent={!isNull(contacts) && <View style={styles.emptyView}>
                    <Text style={styles.emptyText}>{`Không tìm thấy bạn bè`}</Text>
                </View>}
            />
            {
                !isEmpty(selectedItems) && <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={styles.bottomSheet}>
                    <SelectedContacts selectedItems={selectedItems} onUnselect={onToggleItem} onCreate={createGroup} />
                    <SafeAreaView />
                </Animated.View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomSheet: {
        height: 120,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -0.5,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        elevation: 4,
    },
    emptyView: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        fontWeight: 'bold',
    }
})