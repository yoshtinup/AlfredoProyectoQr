import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Modal } from 'react-native';

export default function QRScanner() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos tu permiso para mostrar la cámara</Text>
        <Button onPress={requestPermission} title="Dar permiso" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    setScanned(true);
    setScannedData(data);
    try {
      const parsedData = JSON.parse(data);
      setScannedData(parsedData);
    } catch (error) {
      setScannedData('Formato de QR no válido');
    }
  };

  const renderQRData = (data: any) => {
    if (!data) return null;
    
    const fields = {
      nombres: 'Nombre',
      edad: 'Edad',
      domicilio: 'Domicilio',
      religion: 'Religión',
      grupoSanguineo: 'Grupo Sanguíneo',
      alergias: 'Alergias',
      numerosEmergencia: 'Número de Emergencia'
    };

    return (
      <View style={styles.dataContainer}>
        {Object.entries(fields).map(([key, label]) => (
          data[key] && (
            <View key={key} style={styles.dataRow}>
              <Text style={styles.dataLabel}>{label}:</Text>
              <Text style={styles.dataValue}>{data[key]}</Text>
            </View>
          )
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Voltear Cámara</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.qrFrame} />
      
      {scanned && scannedData && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={scanned}
          onRequestClose={() => setScanned(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Información Personal</Text>
              {renderQRData(scannedData)}
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setScanned(false)}
              >
                <Text style={styles.closeButtonText}>Escanear Otro</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height, 
  },
  overlay: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    padding: 15,
    backgroundColor: '#4E60FF',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  qrFrame: {
    position: 'absolute',
    width: 300,
    height: 280,
    borderWidth: 3,
    borderColor: '#4E60FF',
    backgroundColor: 'transparent',
    borderRadius: 20,
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -150 }, // La mitad del width
      { translateY: +230}  // La mitad del height
    ]
  },
  rescanButton: {
    position: 'absolute',
    bottom: 100,
    padding: 15,
    backgroundColor: '#4E60FF',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rescanText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#4E60FF',
  },
  dataContainer: {
    marginBottom: 20,
  },
  dataRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dataLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dataValue: {
    flex: 2,
    fontSize: 16,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#4E60FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});