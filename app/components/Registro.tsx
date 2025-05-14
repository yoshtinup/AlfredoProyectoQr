import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombres: '',
    edad: '',
    domicilio: '',
    curp: '',
    religion: '',
    grupoSanguineo: '',
    enfermedades: '',
    alergias: '',
    numerosEmergencia: ''
  });

  const [showQR, setShowQR] = useState(false);

  const handleSubmit = () => {
    setShowQR(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombres y apellidos"
          placeholderTextColor="#666"
          onChangeText={(text) => setFormData({...formData, nombres: text})}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad"
          placeholderTextColor="#666"
          onChangeText={(text) => setFormData({...formData, edad: text})}
        />

        <TextInput
          style={styles.input}
          placeholder="Domicilio"
          placeholderTextColor="#666"
          onChangeText={(text) => setFormData({...formData, domicilio: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Curp"
          placeholderTextColor="#666"
          onChangeText={(text) => setFormData({...formData, curp: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Religion"
          placeholderTextColor="#666"
          onChangeText={(text) => setFormData({...formData, religion: text})}
        />

        <TextInput
          style={styles.input}
          placeholder="Grupo sanguíneo"
          placeholderTextColor="#666"
          onChangeText={(text) => setFormData({...formData, grupoSanguineo: text})}
        />

        <TextInput
          style={styles.input}
          placeholder="Enfermedades"
          placeholderTextColor="#666"
          onChangeText={(text) => setFormData({...formData, enfermedades: text})}
        />

        <TextInput
          style={styles.input}
          placeholder="Alergias"
          placeholderTextColor="#666"
          onChangeText={(text) => setFormData({...formData, alergias: text})}
        />

        <TextInput
          style={styles.input}
          placeholder="Numeros de emergencias"
          placeholderTextColor="#666"
          onChangeText={(text) => setFormData({...formData, numerosEmergencia: text})}
        />
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Registrar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showQR} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <QRCode
              value={JSON.stringify(formData)}
              size={200}
            />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowQR(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  formContainer: {
    gap: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#4E60FF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: 20,
  },
  closeButton: {
    backgroundColor: '#4E60FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  }
});