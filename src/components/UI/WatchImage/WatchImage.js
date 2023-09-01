import { Image } from "react-native"
import { useSelector } from "react-redux"

export const WatchImage = () => {
    const uri = useSelector(state => state.otherFuncSlice)
 
    return (
        <Image style={{flex: 1, width: '100%', objectFit: 'contain'}} src={uri.imageUri.url} />
    )
}