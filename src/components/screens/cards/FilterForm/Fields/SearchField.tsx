import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MaterialIcons} from '@expo/vector-icons';
import {FlashList} from '@shopify/flash-list';
import {Input, Sheet, Text, XStack, YStack, useTheme} from 'tamagui';
// remove unused alias

interface SearchFieldProps {
  label: string;
  value: string | string[];
  data: string[];
  onPress: () => void;
  onSelect: (item: string) => void;
  onClearAll?: () => void;
  multiSelect?: boolean;
}

export const SearchField = (props: SearchFieldProps) => {
  const {
    label,
    value,
    data,
    onPress,
    onSelect,
    onClearAll,
    multiSelect = false,
  } = props;

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchBarRef = useRef<any>(null);
  // const {theme} = useTheme();

  const theme = useTheme();
  const backgroundColor = theme.subtleBg?.val ?? '#F7D6D5';

  // Normalize selected values to an array
  const selectedValues = useMemo<string[]>(
    () => (Array.isArray(value) ? value : value ? [value] : []),
    [value],
  );

  // Keep selected values at the top of the list
  const formattedData = useMemo<string[]>(
    () =>
      selectedValues.length === 0
        ? data
        : [
            ...selectedValues,
            ...data.filter((item) => !selectedValues.includes(item)),
          ],
    [data, selectedValues],
  );

  // Use state (not ref) so searches re-render correctly
  const [listData, setListData] = useState<string[]>(formattedData);

  // Open/close & reset overlay state safely
  const toggleOverlay = useCallback(() => {
    setListData(formattedData);
    setSearchValue('');
    setIsOverlayVisible((v) => !v);
  }, [formattedData]);

  // Auto-focus SearchBar when overlay becomes visible
  useEffect(() => {
    if (isOverlayVisible && searchBarRef.current) {
      // Small delay to ensure the overlay is fully rendered
      const timer = setTimeout(() => {
        searchBarRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOverlayVisible]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (!value?.trim()) {
      setListData(formattedData);
      return;
    }
    const lower = value.toLowerCase();
    setListData(
      data.filter((item) => String(item).toLowerCase().includes(lower)),
    );
  };
  const onChangeText = (text?: string) => handleSearch(text ?? '');
  const renderItem = useCallback(
    ({item}: {item: string}) => {
      const checked = selectedValues.includes(item);
      return (
        <TouchableOpacity
          style={{paddingVertical: 5}}
          onPress={() => {
            onSelect(item);
            if (!multiSelect) toggleOverlay();
          }}
        >
          <XStack
            alignItems="center"
            justifyContent="flex-start"
            style={{paddingHorizontal: 10, paddingVertical: 8}}
          >
            <MaterialIcons
              name={checked ? 'check-box' : 'check-box-outline-blank'}
              size={22}
              color={
                checked
                  ? theme.primary?.val || '#D7B23A'
                  : theme.muted?.val || '#8B8D79'
              }
            />
            <Text>{item}</Text>
          </XStack>
        </TouchableOpacity>
      );
    },
    [
      multiSelect,
      onSelect,
      selectedValues,
      toggleOverlay,
      theme.primary?.val,
      theme.muted?.val,
    ],
  );

  return (
    <>
      <TouchableOpacity
        style={{
          marginHorizontal: 0,
          paddingVertical: 5,
          paddingHorizontal: 0,
          borderBottomWidth: 1,
          borderColor: theme.borderColor?.val as any,
          height: 50,
          paddingLeft: 10,
        }}
        onPress={() => {
          onPress();
          toggleOverlay();
        }}
      >
        <XStack
          alignItems="center"
          justifyContent="space-between"
          style={{paddingHorizontal: 10, paddingVertical: 5}}
        >
          <Text
            style={{
              fontSize: 18,
              color:
                selectedValues.length === 0
                  ? '#8B8D79'
                  : (theme.color?.val as any),
            }}
            numberOfLines={2}
          >
            {selectedValues.length === 0 ? label : selectedValues.join(', ')}
          </Text>
          <MaterialIcons
            name="arrow-forward"
            size={24}
            color={theme.color?.val}
          />
        </XStack>
      </TouchableOpacity>

      <Sheet
        modal
        open={isOverlayVisible}
        onOpenChange={setIsOverlayVisible}
        snapPointsMode="fit"
      >
        <Sheet.Overlay />
        <Sheet.Frame padding={0}>
          <YStack style={{flex: 1, backgroundColor: '#FFF9F9'}}>
            {/* Header */}
            <XStack
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: theme.borderColor?.val as any,
              }}
            >
              <Text style={{color: '#43484d'}} fontSize={20} fontWeight="700">
                {label}
              </Text>

              <XStack style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* Optional Clear (only shows when something is selected) */}
                {selectedValues.length > 0 && (
                  <TouchableOpacity
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 12,
                      marginRight: 8,
                    }}
                    onPress={() => {
                      if (onClearAll) {
                        onClearAll();
                      } else {
                        // Fallback: Clear is delegated to the parent via onSelect for single values;
                        // For multi-select parents typically handle remove/toggle.
                        // Here we try to "clear all" by toggling off each selected item.
                        // Parent should support this by updating `value` accordingly.
                        selectedValues.forEach((v) => onSelect(v));
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: theme.primary?.val as any,
                      }}
                    >
                      Clear
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={toggleOverlay}
                >
                  <MaterialIcons
                    name="close"
                    size={24}
                    color={theme.color?.val}
                  />
                </TouchableOpacity>
              </XStack>
            </XStack>

            {/* Search */}
            <YStack style={{paddingHorizontal: 10, paddingVertical: 10}}>
              <Input
                ref={searchBarRef}
                placeholder={label}
                backgroundColor={backgroundColor as any}
                onChangeText={onChangeText}
                value={searchValue}
              />
            </YStack>

            {/* List */}
            <SafeAreaView style={{margin: 10, flex: 1}}>
              <FlashList
                data={listData}
                renderItem={renderItem}
                keyExtractor={(item) => String(item)}
                extraData={selectedValues}
                keyboardShouldPersistTaps="handled"
              />
            </SafeAreaView>

            {/* Multi-select footer */}
            {multiSelect && (
              <YStack
                style={{
                  borderTopWidth: 1,
                  borderTopColor: '#E6E1DE',
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  backgroundColor: '#FFF9F9',
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: theme.primary?.val as any,
                  }}
                  onPress={toggleOverlay}
                >
                  <Text
                    style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold'}}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              </YStack>
            )}
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};
// Removed StyleSheet in favor of inline styles
