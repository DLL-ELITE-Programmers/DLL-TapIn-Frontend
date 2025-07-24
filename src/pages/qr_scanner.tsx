import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, View } from "react-native";
import { RootStackParamList } from "types";

import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import Card from "src/component/card";

type QRScannerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "QRScanner"
>;

interface Props {
  navigation: QRScannerScreenNavigationProp;
}

export default function QRScanner({ navigation }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [studentID, setStudentID] = useState("");

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const scannedResult = ({ data }: BarcodeScanningResult) => {
    if (data) {
      setStudentID(data);
    }
  };

  return (
    <Card>
      <Text>Test</Text>
      <CameraView
        // className="w-[200px] h-[200px] border-rounded overflow-hidden self-center flex-1"
        style={{
          width: 200,
          height: 200,
          borderRadius: 5,
          overflow: "hidden",
          alignSelf: "center",
        }}
        facing="back"
        onBarcodeScanned={scannedResult}
      />
      <Text>{studentID}</Text>
    </Card>
  );
}
