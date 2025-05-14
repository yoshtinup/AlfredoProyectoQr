// app/(tabs)/informacion.tsx
import { View } from "react-native";
import QRScanner from "../components/scanner";

export default function Informacion() {
  return (
    <View>
        <QRScanner />
    </View>
  );
}