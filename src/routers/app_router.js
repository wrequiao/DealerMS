import React, {useState, useEffect, memo} from 'react';
import {View, Text} from 'react-native';
import Home from '../pages/home';
import DadosUsuario from '../pages/dados_usuario';
import Dashboard from '../pages/dashboard';
import Empresas from '../pages/empresas';
import PerfilAcesso from '../pages/perfis_acesso';
import CadLinkAcesso from '../pages/auth/cadastrar_link_acesso';
import {AtendimentosListagem} from '../pages/atendimento';
import {AtendimentosCadastro} from '../pages/atendimento';
import {EstoqueListagem} from '../pages/estoque';
import {EstoqueCadastro} from '../pages/estoque';
import ReservaVeiculos from '../pages/reserva';
import AuthRouter from './auth_router';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {getUsuario} from '../servicos/auth';

import {CustomMenu} from '../componentes/CustomMenu';

const Drawer = createDrawerNavigator();

function AppRouter() {
  const [inicioUseEffect, setinicioUseEffect] = useState(true);
  const [UsuarioDesc, setUsuarioDesc] = useState('');

  useEffect(() => {
    getUsuarioDesc();
  }, [inicioUseEffect]);

  async function getUsuarioDesc() {
    let Usuario = await getUsuario();
    setUsuarioDesc(Usuario.Login);
  }

  return (
    <Drawer.Navigator
      initialRouteName="drawer"
      drawerContent={props => CustomMenu(props, UsuarioDesc)}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="drawer" component={MyStack} />
    </Drawer.Navigator>
  );
}

function MyStack() {
  const Tab = createStackNavigator();

  return (
    <Tab.Navigator initialRouteName="Home" headerMode="none">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="DadosUsuario" component={DadosUsuario} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Empresas" component={Empresas} />
      <Tab.Screen name="PerfilAcesso" component={PerfilAcesso} />
      <Tab.Screen name="CadLinkAcesso" component={CadLinkAcesso} />
      <Tab.Screen
        name="AtendimentosListagem"
        component={AtendimentosListagem}
      />
      <Tab.Screen
        name="AtendimentosCadastro"
        component={AtendimentosCadastro}
      />
      <Tab.Screen name="EstoqueListagem" component={EstoqueListagem} />
      <Tab.Screen name="EstoqueCadastro" component={EstoqueCadastro} />
      <Tab.Screen name="ReservaVeiculos" component={ReservaVeiculos} />
      <Tab.Screen name="Auth" component={AuthRouter} />
    </Tab.Navigator>
  );
}

export default AppRouter;
