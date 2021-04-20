import {StyleSheet} from 'react-native';

export default (pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 17,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderRadius: 4,
    color: 'black',
    paddingRight: 35, // to ensure the text is never behind the icon
    height: 45,
  },
  inputAndroid: {
    fontSize: 17,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 3,
    borderColor: '#f0f0f0',
    borderRadius: 5,
    color: 'black',
    paddingRight: 35, // to ensure the text is never behind the icon
    height: 45,
  },
  iconContainer: {
    top: 17,
    right: 20,
  },
}));
