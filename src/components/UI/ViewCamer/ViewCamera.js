import { Camera } from 'expo-camera';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import backWhite from '../../../../assets/images/backWhite.png'
import { useDispatch } from 'react-redux';
import { cameraVisible, setCameraImg } from '../../../redux/slices/cameraSlice';
import { useState } from 'react';
import { openedChatCheck } from '../../../redux/slices/contextMenuSlice';

export const ViewCamera = ({ navigation}) => {
    let cameraRef = null;
    const [photoUri, setPhotoUri] = useState(null);
    const [isPhotoTaken, setIsPhotoTaken] = useState(false);
    const dispatch = useDispatch()

    const handleCloseCamera = () => {
        dispatch(cameraVisible(false))
        dispatch(openedChatCheck(true))
    }

    const handleTakePhoto = async () => {
        if (cameraRef) {
            const { uri } = await cameraRef.takePictureAsync();
            dispatch(setCameraImg(uri))
            setPhotoUri(uri);
            setIsPhotoTaken(true);

            if(uri) {
                navigation.goBack()
            }
        }
    }

    return (
        <View style={styles.cameraContainer}>
            <Camera
                style={styles.camera}
                ref={(ref) => (cameraRef = ref)}
                type={Camera.Constants.Type.back} // тип камеры (back или front)
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleTakePhoto}
                ></TouchableOpacity>
                <TouchableOpacity style={styles.img} onPress={() => navigation.goBack()}>
                    <Image source={backWhite} />
                </TouchableOpacity>
            </View>
            {isPhotoTaken && (
                <Image
                    src={photoUri}
                    style={styles.previewImage}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    camera: {
        width: '100%',
        flex: 1,
    },
    buttonContainer: {
        position: 'relative',
        width: '100%',
        height: 50,
        marginBottom: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center'
    },
    img: {
        position: 'absolute',
        top: 5,
        left: 10,
    },
    button: {
        width: 60,
        height: 60,
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 50,
    },
});