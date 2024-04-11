import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';

const BottomNavBar = ({ navigation }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('PatientHomeScreen')}>
        <Text style={styles.navText}><AntDesign name="home" size={24} color="black" /></Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Testimonials')}>
        <Text style={styles.navText}><FontAwesome name="comments" size={24} color="black" /></Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('BookAppointment')}>
        <Text style={styles.navText}><MaterialCommunityIcons name="book-account-outline" size={24} color="black" /></Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DoctorsList')}>
        <Text style={styles.navText}><Fontisto name="doctor" size={24} color="black" /></Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
        <Text style={styles.navText}><AntDesign name="profile" size={24} color="black" /></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
      navText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
      },
});

export default BottomNavBar;
