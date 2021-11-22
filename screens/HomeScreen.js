import * as React from 'react';
import { View, Text, Alert } from 'react-native';
import * as api from '../API';
import FormButton from '../components/FormButton';

const HomeScreen = () => {


  getRequest = () => {

    api.getCall().then(function (response) {

      console.log(JSON.stringify(response.data))

    })
      .catch(function (error) {
        console.log(error);
      })

  }



  postRequest = (name, designation, shift) => {

    api.insertCall(name, designation, shift).then(function (response) {
      console.log(response.data);
    })
      .catch(function (error) {
        console.log(error)
      })

  }

  putRequest = (id, name, designation, shift) => {
    api.updateCall(id, name, designation, shift).then(function (response) {
      console.log(response.data);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  deleteRequest = (id) => {
    api.deleteCall(id).then(function (response) {
      console.log(response.data);
    })
      .catch(function (error) {
        console.log(error)
      })
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


      <FormButton
        buttonTitle="Hit For Get call"
        onPress={() => getRequest()}
      />


      <FormButton
        buttonTitle="Hit For Post call"
        onPress={() => postRequest("nitesh", "Associate Software developer", "night")}
      />


      <FormButton
        buttonTitle="Hit For Put call"
        onPress={() => putRequest("3", "chaitrali", " Software developer", "afternoon")}
      />

      <FormButton
        buttonTitle="Hit For Delete call"
        onPress={() => deleteRequest("5")}
      />
    </View>
  );
}

export default HomeScreen;