import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {Dimensions, StyleSheet, View} from 'react-native';
import {laughEmoji, shockedEmoji} from './src/assets/images';

const Box = () => {
  const Delayed = ({children, waitBeforeShow = 210, index = 0}: Props) => {
    const [isShown, setIsShown] = useState(false);
    // text translateY
    const textTranslateY = useSharedValue(20);

    const animatedTextStyles = useAnimatedStyle(() => {
      return {
        top: textTranslateY.value,
      };
    });

    useEffect(() => {
      setTimeout(() => {
        textTranslateY.value = withTiming(0, {
          easing: Easing.out(Easing.ease),
          duration: 500,
        });
        setIsShown(true);
      }, waitBeforeShow * (index + 1));
    }, [waitBeforeShow]);

    return isShown ? (
      <Animated.View style={[animatedTextStyles]}>{children}</Animated.View>
    ) : null;
  };

  interface animatedTextInterface {
    text?: string;
    images?: string[];
    waitBeforeShow: number;
    type: 'text' | 'image';
  }
  const AnimatedText = ({
    text = '',
    waitBeforeShow,
    type = 'text',
    images,
  }: animatedTextInterface) => {
    return (
      <Animated.View style={[styles.containerText]}>
        {type === 'text'
          ? !!text?.length &&
            text?.split('')?.map((value, index) => {
              return (
                <Delayed index={index} waitBeforeShow={waitBeforeShow}>
                  <Animated.Text key={index} style={[styles.text]}>
                    {value}
                  </Animated.Text>
                </Delayed>
              );
            })
          : type === 'image'
          ? !!images?.length &&
            images?.map((value, index) => {
              return (
                <Delayed index={index} waitBeforeShow={waitBeforeShow}>
                  <Animated.Image
                    key={index}
                    source={value}
                    style={[styles.image]}
                  />
                </Delayed>
              );
            })
          : null}
      </Animated.View>
    );
  };
  return (
    <View style={styles.box}>
      <AnimatedText
        text={'String'}
        images={[laughEmoji, shockedEmoji]}
        type={'image'}
        waitBeforeShow={300}
      />
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.center}>
      <Box />
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    resizeMode: 'contain',
  },
  boxContainer: {
    alignItems: 'center',
    overflow: 'hidden',
    borderTopStartRadius: 150,
    borderTopEndRadius: 150,
    borderBottomStartRadius: 80,
    borderBottomEndRadius: 80,
    width: 170,
    height: 200,
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2,
  },
  sun: {
    position: 'absolute',
    top: -20,
    right: 30,
    width: 65,
    height: 65,
  },
  text: {
    fontSize: 30,
    fontFamily: 'EditorialNew-Ultrabold',
    color: 'black',
  },
  progress: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontFamily: 'Futura Book',
    color: 'black',
  },
  containerText: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
});
