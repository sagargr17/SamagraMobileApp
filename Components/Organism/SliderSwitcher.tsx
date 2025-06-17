import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Surface} from 'react-native-paper';
import {AreaMapper} from '../../Utilities/CustomMethods';
import AppButton from '../Elements/Button';
import {AppText} from '../Elements/AppText';

interface SliderSwitcherProps {
  children: React.ReactNode;
  popupButtonName?: string;
  popupIcon?: string;
  popupButtonPressed?: () => void;
  upperContainerFlexHeight?: number;
  bottomContainerFlexHeight?: number;
  isBottomContainerMovable?: boolean;
}

export const SliderSwitcher: React.FC<SliderSwitcherProps> = ({
  children,
  popupButtonName: popupButtoName = 'Add Item',
  popupIcon,
  popupButtonPressed,
  upperContainerFlexHeight: upperContainer = 0.055,
  bottomContainerFlexHeight: bottomContainer = 1,
  // isBottomContainerMovable = true, // Removed as it's not used
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const childrenArray = React.Children.toArray(children);
  const tabsData = childrenArray.map((child: any) => ({
    key: child.key || `tab-${Math.random()}`,
    title: child.key.split('$')[1] || 'Tab',
  }));
  const {width: screenWidth} = Dimensions.get('window');
  const {colors} = useTheme();
  const itemScrollRef = useRef<any>(null);
  const isScrollingByDrag = useRef(false);

  const handleTabPress = (index: number) => {
    setActiveIndex(index);
    scrollViewRef.current?.scrollTo({x: index * screenWidth, animated: true});
  };

  const handleScroll = (event: any) => {};

  const handleScrollBeginDrag = () => {
    isScrollingByDrag.current = true; // User has started dragging
  };

  const handleScrollEndDrag = () => {};

  const handleMomentumScrollEnd = (event: any) => {
    isScrollingByDrag.current = false; // User has stopped dragging/flinging
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / screenWidth);

    // Only update activeIndex if it's genuinely different from the current
    setActiveIndex(newIndex);
    scrollViewRef.current?.scrollTo({
      x: newIndex * screenWidth,
      animated: true,
    });
  };

  useEffect(() => {
    if (!isScrollingByDrag.current) {
      scrollViewRef.current?.scrollTo({
        x: activeIndex * screenWidth,
        animated: true,
      });
    }
  }, [screenWidth]);

  return (
    <View style={{flex: 1}}>
      <Surface
        elevation={1}
        style={{
          flex: upperContainer,
          paddingVertical: AreaMapper({
            value: 10,
            scaleBy: 'average',
          }),
          paddingHorizontal: AreaMapper({
            value: 4,
            scaleBy: 'average',
          }),
          backgroundColor: colors.background,
        }}>
        <ScrollView
          ref={itemScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabBarContainer}>
          {tabsData.map((tab, index) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => handleTabPress(index)}
              style={[
                styles.tabItem,
                {
                  borderRadius: AreaMapper({
                    value: 40,
                    scaleBy: 'average',
                  }),
                  marginTop: 5,
                },
              ]}>
              <AppText
                title={tab.title}
                fontVariant={'medium'}
                fontSizeVariant={'regular'}></AppText>
              {activeIndex === index && (
                <View
                  style={[
                    styles.activeIndicator,
                    {
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Surface>
      <View
        style={{
          flex: bottomContainer,
          marginBottom: AreaMapper({
            value: 1,
            scaleBy: 'average',
          }),
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          horizontal
          pagingEnabled // This is key for snapping to pages
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll} // Still listen, but its main purpose now is less about activeIndex
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag} // Fired when finger lifts
          onMomentumScrollEnd={handleMomentumScrollEnd} // Fired when scroll animation stops
          scrollEventThrottle={16}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}>
          {childrenArray.map((child: any, index) => (
            <View
              key={child.key || `content-${index}`}
              style={{width: screenWidth, flex: 1}}>
              {child}
            </View>
          ))}
        </ScrollView>
        {popupButtoName && popupButtonPressed && popupIcon ? (
          <AppButton
            onPress={() => {
              popupButtonPressed();
            }}
            icon={popupIcon}
            style={{
              borderRadius: AreaMapper({value: 50, scaleBy: 'average'}),
              bottom: AreaMapper({value: 10, scaleBy: 'average'}),
              width: AreaMapper({value: 120, scaleBy: 'average'}),
              right: AreaMapper({value: 10, scaleBy: 'average'}),
              position: 'absolute',
            }}
            contentStyle={{
              padding: AreaMapper({value: 8, scaleBy: 'average'}),
            }}>
            <AppText
              fontSizeVariant="regular"
              title={popupButtoName}
              fontVariant="regular"></AppText>
          </AppButton>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 15,
    backgroundColor: 'orang',
  },
  tabItem: {
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabItem: {},
  activeIndicator: {
    height: 2,
    width: '100%',
    marginTop: 2,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
