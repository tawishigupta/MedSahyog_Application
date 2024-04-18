import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import DatePicker from 'react-native-modern-datepicker';
import axios from 'axios';

const BookAppointment = ({ navigation }) => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://10.24.85.158:5000/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const fetchDoctors = async (departmentName) => {
    try {
      const response = await axios.get(`http://10.24.85.158:5000/api/doctorsappt?department=${departmentName}`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAvailableTimes = async (date, doctorId) => {
    try {
      const response = await axios.get(`http://10.24.85.158:5000/api/appointments?date=${date}&doctor=${doctorId}`);
      const bookedTimes = response.data.map(appointment => appointment.time);
      const allTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
      const availableTimes = allTimes.filter(time => !bookedTimes.includes(time));
      setAvailableTimes(availableTimes);
    } catch (error) {
      // Log the error for debugging
      console.error('Error fetching available times:', error);
  
      // Display an error message to the user (optional)
      setError('Failed to fetch available times. Please try again later.');
    }
  };
  

  const handleDepartmentChange = async (departmentName) => {
    setSelectedDoctor('');
    fetchDoctors(departmentName);
  };

  const handleFormSubmit = async () => {
    if (!appointmentDate || !appointmentTime || !selectedDoctor) {
      setError('Please fill out all fields');
      return;
    }
    
    try {
      const response = await axios.get('http://10.24.85.158:5000/api/currentuserpat');
      const patientId = response.data._id;
      const appointmentData = {
        date: appointmentDate,
        time: appointmentTime,
        doctor: selectedDoctor,
        patient: patientId
      };
      const appointmentResponse = await axios.post('http://10.24.85.158:5000/api/appointments', appointmentData);
      setAppointmentDate('');
      setAppointmentTime('');
      setSelectedDoctor('');
      setError('');
      alert('Appointment booked!');
      navigation.navigate('PatientHomeScreen');
    } catch (error) {
      setError(error.response.data.message || 'An error occurred');
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book an Appointment</Text>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <DatePicker 
        style={styles.datePicker}
        date={appointmentDate}
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
        onDateChange={(selectedDate) => setAppointmentDate(selectedDate)}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Department:</Text>
        <Picker
          selectedValue={selectedDoctor}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedDoctor(itemValue);
            handleDepartmentChange(itemValue);
          }}>
          <Picker.Item label="Select Department" value="" />
          {departments.map(department => (
            <Picker.Item key={department._id} label={department.name} value={department.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Doctor:</Text>
        <Picker
          selectedValue={selectedDoctor}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedDoctor(itemValue);
            fetchAvailableTimes(appointmentDate, itemValue);
          }}>
          <Picker.Item label="Select Doctor" value="" />
          {doctors.map(doctor => (
            <Picker.Item key={doctor._id} label={doctor.name} value={doctor._id} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Time:</Text>
        <Picker
          selectedValue={appointmentTime}
          style={styles.picker}
          onValueChange={(itemValue) => setAppointmentTime(itemValue)}>
          <Picker.Item label="Select Time" value="" />
          {availableTimes.map(time => (
            <Picker.Item key={time} label={time} value={time} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ade0d6',
    padding: 20,
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
  datePicker: {
    width: '100%',
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
  },
  button: {
    width: '100%',
    maxWidth: 200,
    backgroundColor: '#02D0C2',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookAppointment;
