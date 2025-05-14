import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import * as BarCodeScanner from 'expo-barcode-scanner';
import { CameraView, Camera } from 'expo-camera';

export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  // Manejo de permisos y plataforma
  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    };
    getPermissions();
  }, []);

  // Vista para web
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.webText}>El escáner QR no está disponible en la versión web</Text>
        <Text style={styles.webHint}>Usa la versión móvil para escanear códigos QR</Text>
      </View>
    );
  }

  // Estados de permisos para móvil
  if (hasPermission === null) {
    return <View style={styles.container}><Text>Solicitando permisos...</Text></View>;
  }

  if (hasPermission === false) {
    return <View style={styles.container}><Text>No se otorgaron permisos para la cámara</Text></View>;
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    alert(`Código QR escaneado: ${data}`);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.frame} />
          <Text style={styles.scanText}>Enfoca el código QR</Text>
        </View>
        {scanned && (
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Escanear Nuevamente</Text>
          </TouchableOpacity>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  frame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  scanText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  webText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  webHint: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
  },
});