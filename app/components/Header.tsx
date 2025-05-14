import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function Header() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 868;

  return (
    <ScrollView horizontal={isSmallScreen} style={styles.scrollContainer}>
      <View style={[styles.container, isSmallScreen && styles.containerSmall]}>
        {/* Logo */}
        <Text style={styles.logo}>R.live</Text>

        {/* Información de contacto */}
        <View style={[styles.contactInfo, isSmallScreen && styles.contactInfoSmall]}>
          <View style={styles.contactItem}>
            <Ionicons name="location-outline" size={20} color="white" />
            <Text style={[styles.contactText, isSmallScreen && styles.contactTextSmall]}>
              123 Street, New York, USA
            </Text>
          </View>
          
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color="white" />
            <Text style={[styles.contactText, isSmallScreen && styles.contactTextSmall]}>
              info@example.com
            </Text>
          </View>
          
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color="white" />
            <Text style={[styles.contactText, isSmallScreen && styles.contactTextSmall]}>
              +012 345 67890
            </Text>
          </View>
        </View>

        {/* Redes sociales */}
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-twitter" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-linkedin" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#4E60FF',
  },
  container: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '200%',
  },
  containerSmall: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingHorizontal: 20,
    paddingVertical: 30,
    minWidth: '200%',
  },
  logo: {
    color: 'white',
    fontSize: 29,
    fontWeight: 'bold',
    marginRight: 20,
  },
  contactInfo: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  contactInfoSmall: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 25,
    flexWrap: 'nowrap',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  contactText: {
    color: 'white',
    fontSize: 18,
  },
  contactTextSmall: {
    fontSize: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 20,
  },
  socialButton: {
    width: 32,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});