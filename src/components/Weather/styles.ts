import {StyleSheet} from 'react-native';
import {SIZE} from 'styles/spacing';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZE[20],
    minHeight: SIZE[200],
    justifyContent: 'center',
  },
  icon: {
    width: SIZE[200],
    height: SIZE[200],
    alignSelf: 'center',
  },
  textCity: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  textTemp: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginBottom: SIZE[20],
  },
  containerItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: SIZE[45],
    flexDirection: 'row',
    paddingVertical: SIZE[10],
    borderWidth: 1,
  },
  textDescription: {
    flex: 1,
    textAlign: 'center',
  },
});
