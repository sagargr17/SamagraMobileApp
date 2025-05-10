import React, {RefObject, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextComponet} from '../Elements/TextComponet';
import {useTheme} from '@react-navigation/native';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {Icon} from 'react-native-paper';
import AppButton from '../Elements/Button';

interface SliderSwitcherProps {
  children: React.ReactNode;
  popupButtonName: string;
  popupIcon: string;
  popupButtonPressed: () => void;
}

// Slider Switcher  Layout you just have to pass the component
export const SliderSwitcher: React.FC<SliderSwitcherProps> = ({
  children,
  popupButtonName: popupButtoName = 'Add Item',
  popupIcon,
  popupButtonPressed,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const theme = useTheme();
  const scrollViewRef = useRef<any>(null);
  const childrenArray = React.Children.toArray(children);
  const tabsData = childrenArray.map((child: any) => ({
    key: child.key || `tab-${Math.random()}`, // Ensure each child has a key
    title: child.key.split('$')[1] || 'Tab', // Expecting a 'title' prop on the children
  }));
  const {width: screenWidth} = Dimensions.get('window');
  const {colors} = useTheme();

  const handleTabPress = (index: number) => {
    setActiveIndex(index);
    scrollViewRef.current?.scrollTo({x: index * screenWidth, animated: true});
  };

  const handleScroll = (event: any) => {
    if (event && event.nativeEvent) {
      event.persist(); // Persist the synthetic event

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      setScrollTimeout(
        setTimeout(() => {
          const contentOffset = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(contentOffset / screenWidth);
          setActiveIndex(newIndex);
          setScrollTimeout(null);
        }, 100), // Adjust the delay (in milliseconds) as needed
      );
    }
  };

  const handleScrollBeginDrag = () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
      setScrollTimeout(null);
    }
  };

  const handleScrollEndDrag = (event: any) => {
    if (event && event.nativeEvent) {
      const contentOffset = event.nativeEvent.contentOffset.x;
      const finalIndex = Math.round(contentOffset / screenWidth);
      setActiveIndex(finalIndex);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: activeIndex * screenWidth,
      animated: true,
    });
  }, [activeIndex]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.055,
          padding: SamagraScaller({
            value: 2,
            scaleBy: 'average',
          }),
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabBarContainer}>
          {tabsData.map((tab, index) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => handleTabPress(index)}
              style={[
                styles.tabItem,
                activeIndex === index && styles.activeTabItem,
                {
                  backgroundColor:
                    activeIndex === index
                      ? 'rgba(46, 204, 112, 0.12)'
                      : colors.background,
                  borderRadius: SamagraScaller({
                    value: 40,
                    scaleBy: 'average',
                  }),
                },
              ]}>
              <TextComponet
                title={tab.title}
                fontVariant={'medium'}
                fontSize={16}></TextComponet>
              {activeIndex === index && (
                <View
                  style={[
                    styles.activeIndicator,
                    {
                      backgroundColor:
                        activeIndex === index
                          ? colors.primary
                          : colors.background,
                    },
                  ]}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          marginVertical: SamagraScaller({
            value: 14,
            scaleBy: 'average',
          }),
          //   backgroundColor: 'pink',
        }}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll} // Using the debounced handleScroll with setTimeout
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          scrollEventThrottle={16} // Optimize scroll event handling
          style={{flex: 2}}>
          {childrenArray.map((child: any, index) => (
            <View
              key={child.key || `content-${index}`}
              style={{width: screenWidth, flex: 1}}>
              {child}
            </View>
          ))}
        </ScrollView>

        <AppButton
          onPress={() => popupButtonPressed()}
          icon={'camera'}
          style={{
            borderRadius: 50,
            bottom: 10,
            width: 120,
            right: 10,
            position: 'absolute',
          }}
          contentStyle={{
            padding: 8,
          }}>
          <TextComponet
            customStyle={{
              color: 'white',
            }}
            title={popupButtoName}
            fontVariant="regular"></TextComponet>
        </AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    // backgroundColor: 'orange',
    padding: 0,
  },

  tabItem: {
    paddingHorizontal: 25,

    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 8,
    flex: 2,
  },
  activeTabItem: {},
  tabLabel: {
    fontSize: 16,
    color: 'orange',
  },
  activeTabLabel: {
    fontWeight: 'bold',
    color: '#6200EE', // Example primary color
  },
  activeIndicator: {
    height: 2,
    // backgroundColor: 'pink',
    width: '80%',
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
