import { AsyncStorage } from "react-native";
import axios from "axios";

export const USER_KEY = "auth-demo-key";

export const onSignIn = (username, password) => {

  axios.get('http://10.16.1.131:3000/login', {
    params: {
      username: username,
      password: password
    }
  })
  .then((res) => {
    AsyncStorage.setItem(USER_KEY, res.data.token);
    return res;
  })
  .catch((err) => {
    console.error(err);
  })
}

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
    .then(res => {
      if (res !== null) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
    .catch(err => reject(err));
  });
};
