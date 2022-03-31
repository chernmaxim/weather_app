import {ThemeContext} from 'providers/ThemeProvider/ThemeProvider';
import React, {useCallback, useState, useMemo, useContext} from 'react';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getWeatherByName} from 'store/root/actions';
import {getIsWeatherLoading} from 'store/root/selectors';
import {styles} from './styles';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const PlaceSearchInput = ({style}: Props) => {
  const dispatch = useDispatch();
  const [search, onChangeSearch] = useState('');
  const isLoadingWeather = useSelector(getIsWeatherLoading);
  const {theme} = useContext(ThemeContext);

  const themeStyles = useMemo(
    () => ({
      containerInput: [
        styles.containerInput,
        {backgroundColor: theme.PRIMARY, borderColor: theme.SECONDARY},
      ],
      containerButton: [
        styles.containerButton,
        {
          backgroundColor: theme.SECONDARY,
        },
      ],
      textButton: [styles.textButton, {color: theme.PRIMARY}],
      input: [styles.input, {color: theme.SECONDARY}],
    }),
    [theme, isLoadingWeather, search],
  );

  const handleSearch = useCallback(() => {
    dispatch(getWeatherByName(search));
  }, [search, dispatch]);

  return (
    <View style={style}>
      <View style={themeStyles.containerInput}>
        <TextInput
          autoCorrect={false}
          style={themeStyles.input}
          placeholder={'Search Location'}
          placeholderTextColor={'#C4C4C4'}
          value={search}
          onChangeText={onChangeSearch}
          maxLength={30}
        />
        <View style={styles.containerLoop}>
          <Image
            source={require('../../assets/icons/search_loop.png')}
            style={styles.loop}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={isLoadingWeather || !search.length}
        style={themeStyles.containerButton}
        onPress={handleSearch}>
        <Text style={themeStyles.textButton}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceSearchInput;
