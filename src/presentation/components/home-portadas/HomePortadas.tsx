import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {RootStackParams} from '../../navigation/Navigation';

interface Props {
  id: number;
  image: ImageSourcePropType;
  width: number;
}

export const HomePortadas: React.FC<Props> = ({id, image, width}) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  //   const styles = StyleSheet.create({
  //     img: {
  //       width: 120,
  //       height: 120,
  //       borderRadius: 5,
  //     },
  //   });

  return (
    <Pressable
      onPress={() => navigation.navigate('Details', {id})}
      style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
      <View>
        <Image
          source={image}
          style={{
            width: width - 5,
            height: width - 5,
            borderRadius: 5,
            resizeMode: 'cover',
          }}
        />
      </View>
    </Pressable>
  );
};
