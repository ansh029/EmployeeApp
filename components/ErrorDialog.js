import React from "react";
import { Text, View, TextInput, StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import * as fonts from '../themes/Fonts';
import * as colors from '../themes/Colors';
import * as en from '../locale/en';
import { Dialog } from "react-native-simple-dialogs";


const ErrorDialog = ({showDialog,onPress,errorText,errorTypeText}) => {

    const { buttonStyle, headingStyle,subHeadingStyle,dialogStyle,buttonTextStyle } = styles;
   
   

    return (
        <Dialog
            dialogStyle={dialogStyle}
            animationType="none"
            onTouchOutside={onPress}
            visible={showDialog}
        >
            <View style={{ alignItems: "center" }}>
            <Text style={headingStyle}>
                {errorText}
            </Text>
            <Text style={subHeadingStyle}>
                {errorTypeText}
            </Text>
            
            <TouchableOpacity onPress={onPress} style={buttonStyle}>
                <Text
                    style={buttonTextStyle}
                >
                   {en.OK_TEXT}
                </Text>
            </TouchableOpacity></View>
        </Dialog>
    );
};


const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor:colors.BUTTON_COLOR,
        marginTop:20,
        height: 40,
        width: Dimensions.get('screen').width - 260,
        borderRadius:8,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    headingStyle: {
        fontSize: fonts.FONT_LARGE, 
        fontWeight: "bold",
         textAlign: "center" ,
          color:colors.HEADING_COLOR
        },
    subHeadingStyle:{
         fontSize: fonts.FONT_MEDIUM,
          marginTop: 10,
           textAlign: "center" ,
            color:colors.HEADING_COLOR
        },
    dialogStyle:{ 
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ffffff",
        backgroundColor: colors.COLOR_WHITE 
    },
    buttonTextStyle:{
        fontSize: fonts.FONT_MEDIUM,
        marginTop: 10,
        color:colors.COLOR_WHITE,
        
    }


});

export default ErrorDialog;
