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
  popupButtoName: string;
  popupIcon: string;
}

// Slider Switcher  Layout you just have to pass the component
export const SliderSwitcher: React.FC<SliderSwitcherProps> = ({
  children,
  popupButtoName = 'Add Item',
  popupIcon,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
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
    // Programmatically scroll to the corresponding content
    scrollViewRef.current?.scrollTo({x: index * screenWidth, animated: true});
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / screenWidth);
    setActiveIndex(newIndex);
  };

  const handleScrollBeginDrag = () => {
    // Optional: Add logic if needed when scrolling starts
  };

  const handleScrollEndDrag = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const finalIndex = Math.round(contentOffset / screenWidth);
    setActiveIndex(finalIndex);
  };

  useEffect(() => {
    // Ensure the scroll view is at the correct position on initial load or when activeIndex changes programmatically
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
          onScroll={handleScroll}
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
          onPress={() => console.log('>>>>')}
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
