import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import BottomNavBar from './BottomNavbar';
import DatePicker from 'react-native-modern-datepicker';

const BookAppointment = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError(''); 
    if (!name.trim() || !email.trim() || !date.trim() || !timeSlot.trim()) {
      setError('All fields are required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }
  
    alert('Appointment booked!');
    navigation.navigate('PatientHomeScreen');
  }
  
  return (
    <View>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book an Appointment</Text>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <DatePicker 
        style={styles.datePicker}
        date={date}
        mode="calendar"
        placeholder="Select Date"
        format="YYYY-MM-DD"
        minDate={new Date()}
        maxDate="2025-12-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            backgroundColor: '#F2F2F2',
            borderRadius: 15,
            marginBottom: 20,
            borderWidth: 0,
          },
          dateText: {
            fontSize: 16,
            color: 'black',
          },
        }}
        onDateChange={(selectedDate) => setDate(selectedDate)}
      />
      <Picker
        selectedValue={timeSlot}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) =>
          setTimeSlot(itemValue)
        }>
        <Picker.Item label="Morning Shift (8-12)" value="Morning Shift (8-12)" />
        <Picker.Item label="Afternoon Shift (12-3)" value="Afternoon Shift (12-3)" />
        <Picker.Item label="Evening Shift (3-6)" value="Evening Shift (3-6)" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ade0d6',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#20426e',

  },
  errorMessage: {
    color: 'red',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
  datePicker: {
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    height: 45,
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: '100%',
    maxWidth: 200,
    backgroundColor: '#02D0C2',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    marginBottom:40
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookAppointment;
