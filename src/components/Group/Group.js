import { View, StyleSheet, SafeAreaView, Keyboard } from "react-native"
import { AllChat } from "./AllChat/AllChat"
import { Search } from "../UI/Search/Search";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { CurrentChat } from "./CurrentChat/CurrentChat";
import { AllAudioChat } from "./AllAudioChat/AllAudioChat";
import { Archive } from "./Archive/Archive";
import { useSelector } from "react-redux";


export const Group = ({ 
        authData, 
        setContextMenuVisible, 
        setTouchMessage, 
        setContextConfig,
        navigation,
    }) => {
    const [isActiveChat, setIsActiveChat] = useState()
    const [chatID, setChatID] = useState(null)
    const [isActiveArchive, setIsActiveArchive] = useState(false)
    const [isActiveKeyboard, setIsActiveKeyoard] = useState()
    // const isActiveKeyboard = useSelector(state => state.otherFuncSlice.isActiveKeyboard)
    const [categoryActive, setCategoryActive] = useState("Чат")
    const state = useSelector(state => state.contextMenuSlice)

    useEffect(() => {
        if(state.openedChat === true) {
            setIsActiveChat(true)
        } 
    }, [state.openedChat])
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {isActiveArchive ? (
                    <Archive navigation={navigation} setIsActiveArchive={setIsActiveArchive} />
                ) : (
                    <>
                        {categoryActive === "Чат" ? (
                            <>
                                    <AllChat
                                        navigation={navigation}
                                        setIsActiveArchive={setIsActiveArchive}
                                        setIsActiveChat={setIsActiveChat}
                                        setContextMenuVisible={setContextMenuVisible}
                                        setTouchMessage={setTouchMessage}
                                        setChatID={setChatID}
                                        authData={authData}
                                        setContextConfig={setContextConfig}
                                        categoryActive={categoryActive}
                                        setCategoryActive={setCategoryActive}
                                    />
                            </>
                        ) : (
                            <>
                                <AllAudioChat categoryActive={categoryActive} setCategoryActive={setCategoryActive} />
                            </>
                        )}
                    </>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },

    wrapper: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
});