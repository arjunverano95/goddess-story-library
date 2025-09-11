import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {Colors} from '../../constants';

interface SkeletonGalleryWebProps {
  itemWidth?: number;
  columnCount?: number;
  itemCount?: number;
}

const SkeletonGalleryWeb = React.memo((props: SkeletonGalleryWebProps) => {
  const {itemCount = 12} = props;

  // Inject CSS styles for skeleton animation
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      if (!document.querySelector('#skeleton-web-styles')) {
        const style = document.createElement('style');
        style.id = 'skeleton-web-styles';
        style.textContent = `
          @keyframes skeletonPulse {
            0% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.7;
            }
            100% {
              opacity: 0.3;
            }
          }
          
          .skeleton-item {
            animation: skeletonPulse 1.5s ease-in-out infinite;
            background: linear-gradient(90deg, #bfbfbf 25%, #e0e0e0 50%, #bfbfbf 75%);
            background-size: 200% 100%;
            animation: skeletonPulse 1.5s ease-in-out infinite, 
                       skeletonShimmer 2s ease-in-out infinite;
          }
          
          @keyframes skeletonShimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          .skeleton-gallery-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 10px;
            margin: 0px;
            padding: 0px;
            width: 100%;
          }
          
          @media (max-width: 480px) {
            .skeleton-gallery-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 481px) and (max-width: 768px) {
            .skeleton-gallery-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          
          @media (min-width: 769px) and (max-width: 1024px) {
            .skeleton-gallery-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }
          
          @media (min-width: 1025px) and (max-width: 1200px) {
            .skeleton-gallery-grid {
              grid-template-columns: repeat(5, 1fr);
            }
          }
          
          @media (min-width: 1201px) {
            .skeleton-gallery-grid {
              grid-template-columns: repeat(6, 1fr);
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);

  const renderSkeletonItem = (index: number) => (
    <div
      key={`skeleton-${index}`}
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Image skeleton */}
      <div
        className="skeleton-item"
        style={{
          width: '100%',
          aspectRatio: '1',
          borderRadius: '8px',
          backgroundColor: Colors.greyOutline,
        }}
      />

      {/* Text content skeleton */}
      <div
        style={{
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            className="skeleton-item"
            style={{
              width: '60%',
              height: '14px',
              borderRadius: '4px',
              backgroundColor: Colors.greyOutline,
            }}
          />
          <div
            className="skeleton-item"
            style={{
              width: '30%',
              height: '14px',
              borderRadius: '4px',
              backgroundColor: Colors.greyOutline,
            }}
          />
        </div>
        <div
          className="skeleton-item"
          style={{
            width: '80%',
            height: '12px',
            borderRadius: '4px',
            backgroundColor: Colors.greyOutline,
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="skeleton-gallery-grid">
      {Array.from({length: itemCount}).map((_, index) =>
        renderSkeletonItem(index),
      )}
    </div>
  );
});

SkeletonGalleryWeb.displayName = 'SkeletonGalleryWeb';

export default SkeletonGalleryWeb;
