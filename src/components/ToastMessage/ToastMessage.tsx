import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Animated, Text} from 'react-native';
import {styles} from './styles';
import {SIZE} from 'styles/spacing';
import {RED} from 'styles/colors';
import {IS_IOS} from 'utils/constants';
import {getAppMessageContent} from 'store/root/selectors';
import {setAppMessageContent} from 'store/root/actions';

const ToastMessage = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const appMessageContent = useSelector(getAppMessageContent);
  const [animatedValue] = useState(new Animated.Value(0));

  const start = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const hide = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  useEffect(() => {
    if (appMessageContent) {
      start();

      setTimeout(() => {
        hide();
      }, 5000);

      setTimeout(() => {
        dispatch(setAppMessageContent(''));
      }, 6000);
    }
  }, [start, hide, appMessageContent, dispatch]);

  if (!appMessageContent) {
    return null;
  }

  return (
    <Animated.View
      style={[
        {
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
          ],
          backgroundColor: RED,
          minHeight: SIZE[30] + insets.top,
          paddingTop: IS_IOS ? insets.top : SIZE[10],
        },
        styles.container,
      ]}>
      <Text style={styles.text}>{appMessageContent}</Text>
    </Animated.View>
  );
};

export default ToastMessage;
