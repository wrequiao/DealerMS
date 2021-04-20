import 'react-native-gesture-handler';
import React, {Component} from 'react';
import AppRouter from './routers/app_router';
import AuthRouter from './routers/auth_router';
import {isAuthPhone, signOut} from './servicos/auth';
import Carregando from './pages/carregando';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
//import styles from './styles';

// adb reverse tcp:9090 tcp:9090
// ferramenta de desenvolvimento
if (__DEV__) {
  require('react-devtools');
  import('./config/ReactotronConfig'); //.then(() => console.log('Reactotron Configured'))
}

export default class App extends Component {
  state = {
    signLoaded: false,
  };

  async componentDidMount() {
    this.setState({loading: true});

    setTimeout(
      () => {
        this.setState({loading: false});
      },
      __DEV__ ? 100 : 4000,
    );

    //signOut();

    const usuarioLogadoAux = await isAuthPhone();
    this.setState({UsuarioLogado: usuarioLogadoAux, signLoaded: true});
  }

  render() {
    const {signLoaded, UsuarioLogado, loading} = this.state;

    setTimeout(() => {
      SplashScreen.hide();
    }, 700);

    if (!loading && signLoaded) {
      return (
        <NavigationContainer>
          {UsuarioLogado ? <AppRouter /> : <AuthRouter />}
        </NavigationContainer>
      );
    } else {
      return <></>;
    }
  }
}
