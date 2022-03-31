import {StyleSheet} from 'react-native';
import {SIDE_PADDING, SIZE} from 'styles/spacing';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SIDE_PADDING,
  },
  containerPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: SIDE_PADDING,
  },
  textPlaceholder: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZE[20],
    alignItems: 'center',
  },
  textLeft: {
    flex: 1,
  },
  textRight: {
    flex: 1,
    textAlign: 'right',
  },
});
