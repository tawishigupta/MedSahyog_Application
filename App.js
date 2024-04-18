import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import Choose from './screens/Choose';
import Login from './screens/Login';
import Register from './screens/Register';
import BookAppointment from './screens/BookAppointment';
import PatientHomeScreen from './screens/PatientHomeScreen';
import DoctorHomeScreen from './screens/DoctorHomeScreen';
import DoctorsList from './screens/DoctorsList';
import Login1 from './screens/Login1';
import PatientProfile from'./screens/PatientProfile';
import UpdatePatientProfile from './screens/UpdatePatientProfile';
import AppointmentList from './screens/AppointmentList';
import DoctorAppointmentList from './screens/DoctorAppointmentList';
import DoctorProfile from'./screens/DoctorProfile';
import UnavailabilitySet from './screens/UnavailabilitySet';


const Stack=createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Choose" component={Choose} />
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Login1' component={Login1}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name="PatientHomeScreen" component={PatientHomeScreen} />
        <Stack.Screen name="DoctorHomeScreen" component={DoctorHomeScreen} />
        <Stack.Screen name="BookAppointment" component={BookAppointment} />
        <Stack.Screen name="DoctorsList" component={DoctorsList} />
        <Stack.Screen name="PatientProfile" component={PatientProfile}/>
        <Stack.Screen name="UpdatePatientProfile" component={UpdatePatientProfile}/>
        <Stack.Screen name="AppointmentList" component={AppointmentList}/>
        <Stack.Screen name="DoctorProfile" component={DoctorProfile}/>
        <Stack.Screen name="UnavailabilitySet" component={UnavailabilitySet}/>
        <Stack.Screen name="DoctorAppointmentList" component={DoctorAppointmentList}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
