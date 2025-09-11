import * as Network from 'expo-network';
import {useEffect, useState} from 'react';

interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | undefined;
  type: string | undefined;
}

export const useNetworkStatus = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: true,
    isInternetReachable: true,
    type: undefined,
  });
  const [isChecking, setIsChecking] = useState(false);

  const checkNetworkStatus = async () => {
    setIsChecking(true);
    try {
      const networkInfo = await Network.getNetworkStateAsync();
      setNetworkState({
        isConnected: networkInfo.isConnected ?? false,
        isInternetReachable: networkInfo.isInternetReachable ?? false,
        type: networkInfo.type,
      });
    } catch (error) {
      console.error('Error checking network status:', error);
      setNetworkState({
        isConnected: false,
        isInternetReachable: false,
        type: undefined,
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkNetworkStatus();

    // Set up network state listener
    const subscription = Network.addNetworkStateListener((networkInfo) => {
      setNetworkState({
        isConnected: networkInfo.isConnected ?? false,
        isInternetReachable: networkInfo.isInternetReachable ?? false,
        type: networkInfo.type,
      });
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  const isOffline =
    !networkState.isConnected || networkState.isInternetReachable === false;

  return {
    isOffline,
    isConnected: networkState.isConnected,
    isInternetReachable: networkState.isInternetReachable,
    networkType: networkState.type,
    isChecking,
    checkNetworkStatus,
  };
};
