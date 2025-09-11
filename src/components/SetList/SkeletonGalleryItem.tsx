import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from '../../constants';
import SkeletonItem from './SkeletonItem';

interface SkeletonGalleryItemProps {
  width?: number;
}

const SkeletonGalleryItem = React.memo<SkeletonGalleryItemProps>((props) => {
  const {width = 160} = props;

  return (
    <View style={[styles.cardContainer, {width}]}>
      {/* Image skeleton */}
      <SkeletonItem
        width="100%"
        height={width} // Square aspect ratio
        borderRadius={8}
        style={styles.imageSkeleton}
      />

      {/* Text content skeleton */}
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <SkeletonItem
            width="60%"
            height={14}
            borderRadius={4}
            style={styles.textSkeleton}
          />
          <SkeletonItem
            width="30%"
            height={14}
            borderRadius={4}
            style={styles.textSkeleton}
          />
        </View>
        <SkeletonItem
          width="80%"
          height={12}
          borderRadius={4}
          style={[styles.textSkeleton, styles.subtitleSkeleton]}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    margin: 2,
    padding: 0,
  },
  imageSkeleton: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  badgeContainer: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  badgeSkeleton: {
    backgroundColor: Colors.greyOutline,
  },
  textContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  textSkeleton: {
    backgroundColor: Colors.greyOutline,
  },
  subtitleSkeleton: {
    marginTop: 2,
  },
});

// Custom comparison function for React.memo
const areEqual = (
  prevProps: SkeletonGalleryItemProps,
  nextProps: SkeletonGalleryItemProps,
) => {
  return prevProps.width === nextProps.width;
};

SkeletonGalleryItem.displayName = 'SkeletonGalleryItem';

export default React.memo(SkeletonGalleryItem, areEqual);
