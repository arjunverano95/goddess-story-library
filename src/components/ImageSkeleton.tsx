import React, {useEffect, useRef, useState} from 'react';
import {YStack} from 'tamagui';

interface ImageSkeletonProps {
  style?: any;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({style}) => {
  const [isHigh, setIsHigh] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsHigh((prev) => !prev);
    }, 1200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <YStack
      animation="medium"
      opacity={isHigh ? 0.8 : 0.3}
      style={style}
      backgroundColor="#E8E8E8"
      borderRadius={8}
      overflow="hidden"
    >
      <YStack flex={1} backgroundColor="#F0F0F0" />
    </YStack>
  );
};

// migrated to Tamagui layout with animations-moti pulse

export default ImageSkeleton;
