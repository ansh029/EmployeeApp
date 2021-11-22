// import React from "react";
// import { View, StyleSheet, TextInput,Button,TouchableOpacity,Text} from "react-native";
// import EmpList from './EmpList'
// import FormInput from '../components/FormInput';
// import FormButton from '../components/FormButton';
// import { AuthContext } from '../navigation/AuthProvider';

// const Details = ({navigation}) => {
//   const [name, onChangeName] = React.useState("enter employee name");
//   const [designation, onChangeDesignation] = React.useState("designation");

//   return (
//     <View>
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeName}
//         value={name}
//       />

//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeDesignation}
//         value={designation}
//       />
      
//       <TouchableOpacity onPress={()=>navigation.navigate('EmpList')}>
//         <Text style={{color:'black'}}>Go to List</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
// });

// export default Details;



import React, {useState} from 'react';
import { View, Text } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { Picker } from '@react-native-picker/picker';
import * as api from '../API';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EmpFormScreen= ({navigation}) =>  {
  const [pickerValue, setpickerValue] = useState("")
  const[name,setName]=useState("");
  const[designation,setDesignation]=useState("");
  const[shift,setShift]=useState("");

  postRequest = (name, designation, shift,navigation) => {
    api.insertCall(name, designation, shift).then(function (response) {
      console.log(response.data);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <View style={{alignItems:'center'}}>
      <Text style={{color:'black'}}>Form</Text>
      <FormInput 
      labelValue={name} 
      iconType="user"
      onChangeText={(userName) => setName(userName)} 
      placeholderText="Enter Name"/>

      <FormInput 
      labelValue={designation} 
      // iconType="job"
      onChangeText={(userDesignation) => setDesignation(userDesignation)} 
      placeholderText="Enter Designation"/>
 
      <FormInput 
      labelValue={shift} 
      // iconType="clock"
      onChangeText={(userShift) => setShift(userShift)} 
      placeholderText="Shift" />

      <FormButton buttonTitle="Save" onPress={()=>postRequest(name, designation, shift,navigation)}/>
      <TouchableOpacity onPress={()=>navigation.navigate('EmpList')}>
        <Text style={{color:'black'}}>Go to List</Text>
      </TouchableOpacity>
    </View>
  );
}

export default EmpFormScreen;
 

