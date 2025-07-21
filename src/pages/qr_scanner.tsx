import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, View } from "react-native";
import { RootStackParamList } from "types";
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'

type QRScannerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "QRScanner"
>;

interface Props {
  navigation: QRScannerScreenNavigationProp;
}

export default function QRScanner({
    navigation
}: Props){
    const handleBarCodeRead = ({ data }: { data: string }) => {
        Alert.alert('QR Code Detected', data);
    };
    const device = useCameraDevice('back')
    const { hasPermission } = useCameraPermission()

  return (
        <View >
            <Camera device={device} isActive={true} />
        </View>
    )
}
