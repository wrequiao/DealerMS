import {StyleSheet} from 'react-native';
import {fonts} from './core/fonts';
import {theme} from './core/theme';
import {wp, hp} from '~/core/utils';

export default (stylesGeral = StyleSheet.create({
  ViewCampoPesquisar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingBottom: 10,
  },
  ViewCamposCadastro: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    paddingBottom: 10,
  },
  TextLabelsCadastro: {
    fontSize: fonts.TextoLabelDropDowns,
    fontWeight: 'bold',
  },
  ContainerIpunts: {
    marginVertical: 1,
  },

  ViewPadrao: {
    width: '100%',
    flex: 1,
  },
  Modal: {
    width: wp(100),
    marginLeft: wp(-5),
    height: '80%',
    //flex: 1,
    top: hp(-2.5),
    position: 'absolute',
    backgroundColor: theme.colors.primary,
  },
}));
