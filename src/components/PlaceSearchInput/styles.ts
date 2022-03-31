import {StyleSheet} from 'react-native';
import {SIZE} from 'styles/spacing';

export const styles = StyleSheet.create({
  containerInput: {
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: SIZE[10],
  },
  input: {
    paddingLeft: SIZE[20],
    height: SIZE[45],
    flex: 1,
  },
  containerLoop: {
    height: SIZE[45],
    width: SIZE[45],
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  loop: {
    width: SIZE[18],
    height: SIZE[18],
  },
  containerButton: {
    height: SIZE[45],
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
