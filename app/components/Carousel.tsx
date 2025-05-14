import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Welcome to GrowMark',
    subtitle: 'Ready to Grow Your Business',
    buttonText: 'Explore More',
    image: require('../../assets/carucel/carousel-1.jpg'), // Asegúrate de tener esta imagen en tu proyecto
  },
  {
    title: 'Welcome to GrowMark',
    subtitle: 'Ready to Grow Your Business',
    buttonText: 'Explore More',
    image: require('../../assets/carucel/carousel-2.jpg'), // Asegúrate de tener esta imagen en tu proyecto
  },
  // Puedes agregar más slides aquí
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const goToNext = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={slides[currentSlide].image}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.arrowButton} onPress={goToPrevious}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.content}>
            <Text style={styles.welcomeText}>{slides[currentSlide].title}</Text>
            <Text style={styles.titleText}>{slides[currentSlide].subtitle}</Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.buttonText}>{slides[currentSlide].buttonText}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.arrowButton} onPress={goToNext}>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 670,
    width: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    opacity: 0.8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#4E60FF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(78, 96, 255, 0.8)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});