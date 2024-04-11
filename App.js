import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Choose from './screens/Choose';
import Login from './screens/Login';
import Register from './screens/Register';
import BookAppointment from './screens/BookAppointment';
import PatientHomeScreen from './screens/PatientHomeScreen';
import DoctorsList from './screens/DoctorsList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Choose" component={Choose} />
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name="PatientHomeScreen" component={PatientHomeScreen} />
        <Stack.Screen name="BookAppointment" component={BookAppointment} />
        <Stack.Screen name="DoctorsList" component={DoctorsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
