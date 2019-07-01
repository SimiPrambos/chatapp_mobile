import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  center: {
    alignContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    margin: 20,
    alignContent: 'center',
  },
  brand: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 20
  },
  field: {
    marginVertical: 5,
    borderRadius: 5,
  },
  label: {
    fontSize: 15,
  },
  button: {
    backgroundColor: '#3897f0',
    marginVertical: 5,
  },
  spanText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    paddingHorizontal: 2,
  },
  smallText: {
    fontSize: 13,
  },
  greyText: {
    color: 'grey',
  },
  bold: {
    fontWeight: 'bold',
  },
  white: {
    backgroundColor: 'white',
  },
})