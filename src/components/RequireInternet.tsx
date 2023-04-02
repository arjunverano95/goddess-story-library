import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useNetInfo} from '@react-native-community/netinfo';
import {Button, Icon, Text} from '@rneui/themed';

import {Colors, Icons} from '../app/constants';
import {useGSL} from '../app/hooks/useGSL';
import Overlay from './Overlay';

const RequireInternet = () => {
  const netInfo = useNetInfo();
  const {isLoading} = useGSL('/data/goddess-story.json');

  // return (
  //   <View style={styles.skeletonContainer}>
  //     <View style={styles.skeletonHeader}>
  //       {boxSize.width > 0 && (
  //         <Skeleton style={styles.skeleton} height={60} />
  //       )}
  //     </View>

  //     <View
  //       style={styles.skeletonContent}
  //       onLayout={(event) => {
  //         const {width, height} = event.nativeEvent.layout;
  //         setBoxSize({width: (width - 15) / 2, height: (height - 30) / 3});
  //       }}
  //     >
  //       <View style={styles.skeletonContentRow}>
  //         <View
  //           style={{
  //             width: boxSize.width,
  //             height: boxSize.height,
  //           }}
  //         >
  //           <Skeleton style={styles.skeleton} height={boxSize.height - 40} />
  //           <Skeleton style={styles.skeletonSmall} height={30} />
  //         </View>
  //         <View
  //           style={{
  //             width: boxSize.width,
  //             height: boxSize.height,
  //           }}
  //         >
  //           <Skeleton style={styles.skeleton} height={boxSize.height - 40} />
  //           <Skeleton style={styles.skeletonSmall} height={30} />
  //         </View>
  //       </View>
  //       <View style={styles.skeletonContentRow}>
  //         <View
  //           style={{
  //             width: boxSize.width,
  //             height: boxSize.height,
  //           }}
  //         >
  //           <Skeleton style={styles.skeleton} height={boxSize.height - 40} />
  //           <Skeleton style={styles.skeletonSmall} height={30} />
  //         </View>
  //         <View
  //           style={{
  //             width: boxSize.width,
  //             height: boxSize.height,
  //           }}
  //         >
  //           <Skeleton style={styles.skeleton} height={boxSize.height - 40} />
  //           <Skeleton style={styles.skeletonSmall} height={30} />
  //         </View>
  //       </View>
  //       <View style={styles.skeletonContentRow}>
  //         <View
  //           style={{
  //             width: boxSize.width,
  //             height: boxSize.height,
  //           }}
  //         >
  //           <Skeleton style={styles.skeleton} height={boxSize.height - 40} />
  //           <Skeleton style={styles.skeletonSmall} height={30} />
  //         </View>
  //         <View
  //           style={{
  //             width: boxSize.width,
  //             height: boxSize.height,
  //           }}
  //         >
  //           <Skeleton style={styles.skeleton} height={boxSize.height - 40} />
  //           <Skeleton style={styles.skeletonSmall} height={30} />
  //         </View>
  //       </View>
  //     </View>
  //   </View>
  // );

  return (
    <>
      <Overlay
        showClose={false}
        isVisible={isLoading || !netInfo.isConnected}
        toggleOverlay={() => {
          console.log('toggleOverlay');
        }}
      >
        <View style={styles.container}>
          {isLoading ? (
            <Button type="clear" loading loadingProps={{size: 25}} />
          ) : (
            <>
              <Icon name={Icons.no_internet} size={50} />
              <Text h4>{'Conection Error'}</Text>
              <Text>{'Please check your network connectivity'}</Text>
              <Text>{'and try again.'}</Text>
            </>
          )}
        </View>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //   skeletonContainer: {
  //     padding: 15,
  //     flex: 1,
  //   },
  //   skeletonHeader: {height: 60},
  //   skeletonContent: {
  //     flex: 1,
  //     marginTop: 15,
  //     overflow: 'hidden',
  //   },
  //   skeletonContentRow: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     marginBottom: 15,
  //   },
  //   skeleton: {
  //     borderRadius: 10,
  //     opacity: 0.3,
  //   },
  //   skeletonSmall: {
  //     borderRadius: 5,
  //     marginTop: 10,
  //     opacity: 0.3,
  //   },
});
export default RequireInternet;
