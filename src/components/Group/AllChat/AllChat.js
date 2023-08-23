import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Archive from '../../../../assets/images/archive_folder.png'

export const AllChat = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.TouchableOpacity} >
                <View style={styles.archive}>
                    <Image source={Archive} />
                    <Text style={styles.text}>Архив</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',     
    },
    TouchableOpacity: {
        width: '100%',
        paddingLeft: 20,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    text: {
        color: '#000',
        fontSize: 17,
        fontWeight: 600,

    },
    archive: {
        gap: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingBottom: 5,
    }
});