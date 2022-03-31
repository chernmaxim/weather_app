import {ThemeContext} from 'providers/ThemeProvider/ThemeProvider';
import React, {useMemo, useCallback, useContext, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setThresholdValue} from 'store/root/actions';
import {styles} from './styles';
import * as storage from 'utils/async-storage.util';

const ChangeThreshold = () => {
  const dispatch = useDispatch();
  const [text, onChangeText] = useState('');
  const [isEditingMode, setIsEditingMode] = useState(false);
  const {theme} = useContext(ThemeContext);

  const handleSaveThreshold = useCallback(async () => {
    dispatch(setThresholdValue(+text));
    setIsEditingMode(false);
    onChangeText('');
    await storage.storeUserThreshold(+text);
  }, [text, dispatch]);

  const handlePressButton = useCallback(() => {
    if (isEditingMode) {
      if (isNaN(+text)) {
        throw Error('Threshold value must be a number');
      } else {
        handleSaveThreshold();
      }
    } else {
      setIsEditingMode(true);
    }
  }, [theme, isEditingMode, text, handleSaveThreshold]);

  const themeStyles = useMemo(
    () => ({
      input: [
        styles.input,
        {color: theme.SECONDARY, borderColor: theme.SECONDARY},
      ],
      textButton: [styles.textButton, {color: theme.SECONDARY}],
      containerButton: [styles.containerButton, {borderColor: theme.SECONDARY}],
    }),
    [theme],
  );

  return (
    <View style={styles.container}>
      {isEditingMode ? (
        <TextInput
          value={text}
          onChangeText={onChangeText}
          style={themeStyles.input}
          placeholder={'Threshold value'}
          placeholderTextColor={'#C4C4C4'}
        />
      ) : null}
      <TouchableOpacity
        style={themeStyles.containerButton}
        onPress={handlePressButton}>
        <Text style={themeStyles.textButton}>
          {isEditingMode ? 'Save' : 'Change Threshold Value'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeThreshold;
