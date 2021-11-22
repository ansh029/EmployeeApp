
//Try for update
import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, Alert, Image, Dimensions, SafeAreaView, Modal, Button, ActivityIndicator } from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Birlasoft } from '../server/db.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as api from '../API';
import NetInfo from "@react-native-community/netinfo";
import * as en from '../locale/en';
import ErrorDialog from '../components/ErrorDialog';


export default class EmpList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalName: '',
      modalDesignation: '',
      modalShift: '',
      id: null,
      searchText: "",
      responseData: [],
      filteredData: [],
      showDialog: false,
      errorText: "",
      errorTypeText: "",
      isLoading: true
    };
  }

  componentDidMount() {
    this.getRequest();
  }

  hideDialog = () => {

    this.setState({
      showDialog: false
    })
  }


  getRequest = () => {

    NetInfo.fetch().then(state => {
      if (state.isConnected) {

        api.getCall().then(responseData => {
          this.setState({ showDialog: false, responseData: responseData.data, isLoading: false })
        }).catch(function (error) {
          this.setState({
            isLoading: false, showDialog: true, errorText: en.ERROR_TEXT, errorTypeText: en.ERROR_TYPE
          })

        })
      } else {

        this.setState({
          isLoading: false, showDialog: true, errorText: en.ALERT_TEXT, errorTypeText: en.ALERT_TYPE
        })

      }
    });
  }

  setModalVisible = (visible, id, name, designation, shift) => {

    this.setState({ modalVisible: visible, id: id, modalName: name, modalDesignation: designation, modalShift: shift });

  }

  ShowModal() {

    return (

      <Modal visible={this.state.modalVisible} transparent={true} >
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View style={{ margin: 50, backgroundColor: "#FFE5B4", flex: 1, borderRadius: 8, padding: 10 }}>

            <TextInput
              style={{ height: 60 }}
              placeholder="Employee name"
              onChangeText={(text) => this.setState({ modalName: text })}
              value={this.state.modalName}
            />

            <TextInput
              style={{ height: 60 }}
              placeholder="Employee designation"
              onChangeText={(text) => this.setState({ modalDesignation: text })}
              value={this.state.modalDesignation}
            />

            <TextInput
              style={{ height: 60 }}
              placeholder="Shift"
              onChangeText={(text) => this.setState({ modalShift: text })}
              value={this.state.modalShift}
            />


            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
              <Button onPress={() => { this.setState({ modalVisible: false }) }} title="Cancel" />

              <Button onPress={() => { this.putRequest(this.state.id, this.state.modalName, this.state.modalDesignation, this.state.modalShift) }} title="Update" />
            </View>



          </View>
        </View>
      </Modal>

    )


  }

  deleteRequest = (id) => {
    api.deleteCall(id).then(function (response) {
      console.log(response.data);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  putRequest = (id, name, designation, shift) => {
    api.updateCall(id, name, designation, shift).then(function (response) {
      // console.log(response.data);

      this.setState({
        modalVisible: false
      })
    })
      .catch(function (error) {
        console.log(error)
      })
  }


  SearchFilterFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.responseData.filter(function (item) {
      return item.name.includes(searchText);
    });

    this.setState({ filteredData: filteredData });
  };

  renderData = ({ item, navigation }) => {
    return (
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <Text style={{ color: 'black', padding: 12 }}>{item.id}{' | '}{item.name}{' | '}{item.designation}{' | '}{item.shift}</Text>

          <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>

            <FontAwesome5 color='black' size={25} name={'pencil-alt'} onPress={() => { this.setModalVisible(true, item.id, item.name, item.designation, item.shift) }} />
            {/* <FontAwesome5 color='black' size={25} name={'pencil-alt'} onPress={() =>console.log ("updated")} /> */}
            <FontAwesome5 color='black' size={20} name={'trash'} onPress={() => deleteRequest(item.id)} />

          </View>

        </View>
      </View>
    )
  }

  render() {

    if (this.state.isLoading) {

      return (
        <View style={styles.activityIndicatorStyle}>
          <ActivityIndicator size="large" color={'#F36F0F'} />
        </View>
      )

    }
    return (
      <View style={{ backgroundColor: '#97DDA7' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Text style={{ color: 'black' }}> All Employees </Text>
        </View>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.searchText}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <View>
          <FlatList
            data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.responseData}
            renderItem={this.renderData}
            keyExtractor={item => item.id}
          />
        </View>
        {this.ShowModal()}
        <ErrorDialog showDialog={this.state.showDialog} onPress={this.hideDialog} errorText={this.state.errorText} errorTypeText={this.state.errorTypeText} />

      </View>
    )
  }
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
    marginVertical: 10
  }, card: {
    backgroundColor: '#FEF8',
    marginBottom: 10,
    marginLeft: '2%',
    width: '96%',
    height: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

