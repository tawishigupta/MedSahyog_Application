import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const Register = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    email: '',
    password: '',
    qualification: '',
    experience: '',
    department: ''
  });
  const [updateIndex, setUpdateIndex] = useState(null);
  const [departments, setDepartments] = useState([]);

  const handleInputChange = (name, value) => {
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  useEffect(() => {
    axios.get('http://10.24.85.158:5000/api/departments')
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  const addDoctor = () => {
    if (newDoctor.name && newDoctor.email && newDoctor.password && newDoctor.qualification && newDoctor.experience && newDoctor.department) {
      if (updateIndex !== null) {
        axios.put(`http://10.24.85.158:5000/api/doctors/${doctors[updateIndex]._id}`, newDoctor)
          .then(response => {
            const updatedDoctors = [...doctors];
            updatedDoctors[updateIndex] = response.data;
            setDoctors(updatedDoctors);
            setUpdateIndex(null);
            setNewDoctor({ name: '', email: '', password: '', qualification: '', experience: '', department: '' });
          })
          .catch(error => {
            console.error('Error updating doctor:', error);
          });
      } else {
        axios.post('http://10.24.85.158:5000/api/doctors', newDoctor)
          .then(response => {
            setDoctors([...doctors, response.data]);
            setNewDoctor({ name: '', email: '', password: '', qualification: '', experience: '', department: '' });
          })
          .catch(error => {
            console.error('Error adding doctor:', error);
          });
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>DOCTOR DETAILS</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newDoctor.name}
          onChangeText={text => handleInputChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={newDoctor.email}
          onChangeText={text => handleInputChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={newDoctor.password}
          onChangeText={text => handleInputChange('password', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Qualification"
          value={newDoctor.qualification}
          onChangeText={text => handleInputChange('qualification', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Experience"
          value={newDoctor.experience}
          onChangeText={text => handleInputChange('experience', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Department"
          value={newDoctor.department}
          onChangeText={text => handleInputChange('department', text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={addDoctor}>
        <Text style={styles.buttonText}>{updateIndex !== null ? 'Update Doctor' : 'Add Doctor'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Register;