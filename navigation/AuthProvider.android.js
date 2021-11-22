import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: (email,password,navigation) => {
          
            auth().signInWithEmailAndPassword(email,password,navigation)
            .then(() => {
              console.log('User account signed in!');  
              navigation.navigate('LeftPanel')
            })
            .catch(error => {
          
              console.error(error);
            });
         
        },
        register: (email,password,navigation) => {
         
           auth().createUserWithEmailAndPassword(email,password,navigation)
            .then(() => {
              console.log('User account created & signed in!');
              navigation.navigate('Login')
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }
          
              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }
          
              console.error(error);
            });
         
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};