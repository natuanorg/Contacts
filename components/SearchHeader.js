import { StyleSheet, View, TextInput, Image} from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEIGHT = 56
const searchIcon = require('@assets/ic_search.png')
const backIcon = require('@assets/ic_arrow_back.png')

export default function SearchHeader({value, onChangeText}) {
    const insets = useSafeAreaInsets()
    return (
        <View style={styles.header}>
            <View style={[styles.content, { marginTop: insets.top }]}>
                <View style={styles.backBtn}>
                    <Image style={styles.backIcon} source={backIcon}/>
                </View>
                <View style={styles.inputWrapper}>
                    <Image style={styles.searchIcon} source={searchIcon}/>
                    <TextInput
                        value={value}
                        placeholder={'Search'}
                        placeholderTextColor={'rgb(67, 60, 60)'}
                        style={styles.input}
                        onChangeText={onChangeText}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#C43B81'
    },
    safeArea: {
        height: getStatusBarHeight(true)
    },
    backBtn: {
        height: HEIGHT,
        width: HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backIcon: {
        width: 16,
        height: 16
    },
    content: {
        width: '100%',
        height: HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputWrapper: {
        flexGrow: 1,
        flexDirection: 'row',
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 12,
        marginRight: 16,
        backgroundColor: 'white',
    },
    searchIcon: {
        width: 20,
        height: 20
    },
    input: {
        flex: 1,
        marginLeft: 8,
        height: '100%',
        fontSize: 15,
        paddingTop: 0,
        paddingBottom: 0,
        includeFontPadding: false,
        justifyContent: 'center'
    },
})