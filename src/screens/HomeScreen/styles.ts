import {StyleSheet} from 'react-native';
import {SIDE_PADDING, SIZE} from 'styles/spacing';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SIDE_PADDING,
  },
  containerTop: {
    flexDirection: 'row',
  },
  containerInput: {
    flex: 1,
  },
  containerSettings: {
    borderRadius: 15,
    borderWidth: 1,
    width: SIZE[100],
    height: SIZE[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZE[10],
  },
});
