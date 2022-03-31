import {StyleSheet} from 'react-native';
import {SIDE_PADDING, SIZE} from 'styles/spacing';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    justifyContent: 'flex-end',
    left: 0,
    right: 0,
    zIndex: 10,
    paddingBottom: SIZE[10],
    paddingHorizontal: SIDE_PADDING,
  },
  text: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
});
