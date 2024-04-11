import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Login = ({ navigation }) => {
  const [identity, setIdentity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (identity === '') {
      alert('Please select your User Type');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
    // Email validation
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Password validation
    if (!passwordRegex.test(password)) {
      alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long');
      return;
}

    const staticCredentials = [
      { email: 'patient@example.com', password: 'Patient@123' },
      { email: 'doctor@example.com', password: 'Doctor@123' }
    ];
  
    // Find matching credentials
    const matchedCredential = staticCredentials.find(
      cred => cred.email === email && cred.password === password
    );
  
    // If matched credential is found, navigate to patient home screen
    if (matchedCredential) {
      navigation.navigate('PatientHomeScreen');
    } else {
      alert('Invalid credentials. Please try again.');
    }

    // Add your authentication logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo02.png')} style={styles.logo} />
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Medsahyog</Text>
        <View style={styles.identityContainer}>
        <Text style={styles.identityLabel}>You are:</Text>
        <TouchableOpacity
          style={[styles.identityOption, identity === 'Patient' && styles.selectedOption]}
          onPress={() => setIdentity('Patient')}
        >
          <Text style={styles.identityOptionText}>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.identityOption, identity === 'Doctor' && styles.selectedOption]}
          onPress={() => setIdentity('Doctor')}
        >
          <Text style={styles.identityOptionText}>Doctor</Text>
        </TouchableOpacity>
      </View>
        <TextInput
          placeholder="Enter email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa" // Placeholder text color
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa" // Placeholder text color
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.signUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ade0d6', // Background color for the entire screen
  },
  identityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  identityLabel: {
    marginRight: 10,
  },
  identityOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginRight: 10,
  },
  identityOptionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: '#02D0C2',
  },
  logo: {
    marginTop: -100,
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Card background color with slight transparency
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    elevation: 2, // Shadow for Android devices
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width:'70%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 30,
    borderColor: '#02D0C2', 
    borderWidth: 1,
    color: '#333', 
  },
  button: {
    width: '80%',
    backgroundColor: '#02D0C2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#02D0C2',
  },
  signUp: {
    marginTop: 10,
  },
  signUpText: {
    color: '#02D0C2',
  },
});

export default Login;
