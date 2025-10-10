import {MaterialIcons} from '@expo/vector-icons';
import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Button, Input, Text, View, XStack, YStack, useTheme} from 'tamagui';

import {GSLCard} from '@/src/models/GSLCard';

interface FilterFormProps {
  data: GSLCard;
  formData: {setNumbers: string[]; rarities: string[]; series: string[]};
  onSubmit: (value: GSLCard) => void;
}

// local type with array support
type MultiKeys = 'SetNumber' | 'Rarity' | 'SeriesName';
interface ExtendedGSLCard
  extends Omit<GSLCard, 'SetNumber' | 'Rarity' | 'SeriesName'> {
  SetNumber: string | string[];
  Rarity: string | string[];
  SeriesName: string | string[];
}

type Mode = 'main' | 'picker';

export default function FilterForm(props: FilterFormProps) {
  const {
    data,
    onSubmit,
    formData: {setNumbers, rarities, series},
  } = props;
  const theme = useTheme();

  // normalize incoming values to arrays when needed
  const [formData, setFormData] = useState<ExtendedGSLCard>({
    ...data,
    SetNumber: data.SetNumber
      ? data.SetNumber.includes('|')
        ? data.SetNumber.split('|').map((s) => s.trim())
        : data.SetNumber
      : '',
    Rarity: data.Rarity
      ? data.Rarity.includes('|')
        ? data.Rarity.split('|').map((s) => s.trim())
        : data.Rarity
      : '',
    SeriesName: data.SeriesName
      ? data.SeriesName.includes('|')
        ? data.SeriesName.split('|').map((s) => s.trim())
        : data.SeriesName
      : '',
  });

  // view switching (no new sheet)
  const [mode, setMode] = useState<Mode>('main');
  const [pickerKey, setPickerKey] = useState<MultiKeys | null>(null);
  const [search, setSearch] = useState('');

  const openPicker = (key: MultiKeys) => {
    setPickerKey(key);
    setSearch('');
    setMode('picker');
  };
  const closePicker = () => {
    setSearch('');
    setMode('main');
  };

  const listData = useMemo(() => {
    const source =
      pickerKey === 'SetNumber'
        ? setNumbers
        : pickerKey === 'Rarity'
          ? rarities
          : series;
    if (!search.trim()) return source;
    const q = search.toLowerCase();
    return source.filter((s) => s.toLowerCase().includes(q));
  }, [pickerKey, setNumbers, rarities, series, search]);

  const selectedValues = useMemo<string[]>(() => {
    if (!pickerKey) return [];
    const v = formData[pickerKey];
    return Array.isArray(v) ? v : v ? [v] : [];
  }, [pickerKey, formData]);

  const toggleMulti = useCallback(
    (item: string) => {
      if (!pickerKey) return;
      const current = Array.isArray(formData[pickerKey])
        ? (formData[pickerKey] as string[])
        : formData[pickerKey]
          ? [formData[pickerKey] as string]
          : [];
      const exists = current.includes(item);
      const next = exists
        ? current.filter((i) => i !== item)
        : [...current, item];
      setFormData((f) => ({...f, [pickerKey]: next}));
    },
    [pickerKey, formData],
  );

  const clearAll = (key: MultiKeys) => setFormData((f) => ({...f, [key]: []}));

  const resetAll = () => {
    const clear: GSLCard = {
      ID: '',
      Code: '',
      SetNumber: '',
      CardNumber: '',
      CharacterName: '',
      SeriesName: '',
      Rarity: '',
      ImageUrl: '',
      HasImage: '',
    };
    setFormData(clear);
    onSubmit(clear);
  };

  const apply = () => {
    const payload: GSLCard = {
      ...formData,
      SetNumber: Array.isArray(formData.SetNumber)
        ? formData.SetNumber.join('|')
        : formData.SetNumber,
      Rarity: Array.isArray(formData.Rarity)
        ? formData.Rarity.join('|')
        : formData.Rarity,
      SeriesName: Array.isArray(formData.SeriesName)
        ? formData.SeriesName.join('|')
        : formData.SeriesName,
    };
    onSubmit(payload);
  };

  // -------- UI building blocks --------
  const Row = ({
    label,
    value,
    onPress,
  }: {
    label: string;
    value?: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={{
        height: 56, // consistent height
        borderRadius: 14, // uniform radius
        paddingHorizontal: 16,
        justifyContent: 'center',
        backgroundColor: theme.cardBg?.val as any,
      }}
    >
      <XStack ai="center" jc="space-between">
        <Text fontSize={16} color={theme.muted?.val as any}>
          {label}
        </Text>
        <XStack ai="center" gap={8}>
          {value ? (
            <Text
              fontSize={16}
              color={theme.color?.val as any}
              numberOfLines={1}
            >
              {value}
            </Text>
          ) : null}
          <MaterialIcons
            name="keyboard-arrow-right"
            size={22}
            color={theme.color?.val}
          />
        </XStack>
      </XStack>
    </TouchableOpacity>
  );
  const InputRow = ({
    label,
    placeholder,
    value,
    onChangeText,
  }: {
    label: string;
    placeholder: string;
    value?: string;
    onChangeText: (v: string) => void;
  }) => (
    <XStack
      ai="center"
      height={56}
      bg="$white"
      br={14}
      px="$4"
      jc="space-between"
    >
      <Text color={theme.muted?.val as any}>{label}</Text>
      <Input
        flex={1}
        ml="$3"
        unstyled
        bg="$white"
        borderWidth={0}
        placeholder={placeholder}
        placeholderTextColor={theme.muted?.val as any}
        value={value}
        onChangeText={onChangeText}
      />
    </XStack>
  );

  const Section = ({
    title,
    children,
  }: {
    title?: string;
    children: React.ReactNode;
  }) => (
    <YStack gap={16}>
      {title ? (
        <Text fontSize={13} color={theme.muted?.val as any} ml={4}>
          {title}
        </Text>
      ) : null}
      <YStack gap={12}>{children}</YStack>
    </YStack>
  );

  // -------- RENDER --------
  if (mode === 'picker' && pickerKey) {
    const title =
      pickerKey === 'SetNumber'
        ? 'Set'
        : pickerKey === 'Rarity'
          ? 'Rarity'
          : 'Series';

    return (
      <YStack f={1} bg="$bg" p="$4" pb="$6" gap="$4">
        {/* header */}
        <XStack ai="center" jc="space-between" py="$2">
          <TouchableOpacity
            onPress={closePicker}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
          >
            <MaterialIcons
              name="arrow-back"
              size={26}
              color={theme.color?.val}
            />
          </TouchableOpacity>
          <Text fontSize={24} fontWeight="700">
            {title}
          </Text>
          <View />
        </XStack>

        {/* search */}
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder={`Search ${title}`}
          bg="$white"
          borderWidth={0}
          px="$4"
          py="$3"
          br="$8"
          // (optional) softer placeholder
          placeholderTextColor={theme.muted?.val as any}
        />

        {/* list */}
        <YStack f={1} mt="$2">
          <FlashList
            data={listData}
            keyExtractor={(i) => i}
            renderItem={({item}) => {
              const checked = selectedValues.includes(item);
              return (
                <TouchableOpacity
                  onPress={() => toggleMulti(item)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 6,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.borderColor?.val as any,
                  }}
                >
                  <XStack ai="center" jc="space-between">
                    <XStack ai="center" gap="$3">
                      <MaterialIcons
                        name={checked ? 'check-box' : 'check-box-outline-blank'}
                        size={22}
                        color={
                          (checked
                            ? theme.primary?.val
                            : theme.muted?.val) as any
                        }
                      />
                      <Text fontSize={16}>{item}</Text>
                    </XStack>
                  </XStack>
                </TouchableOpacity>
              );
            }}
          />
        </YStack>

        {/* footer (like “Show 497”) */}
        <XStack gap="$3" mt="$3">
          <Button
            flex={1}
            size="$4"
            br="$8"
            bg="$cardBg"
            color="$color"
            borderColor="$borderColor"
            borderWidth={1}
            onPress={() => clearAll(pickerKey)}
          >
            Clear Selection
          </Button>
          <Button
            flex={1}
            size="$4"
            br="$8"
            bg="$primary"
            color="white"
            onPress={closePicker}
          >
            {`Show ${selectedValues.length || ''}`.trim()}
          </Button>
        </XStack>
      </YStack>
    );
  }

  // MAIN FILTER VIEW
  return (
    <YStack f={1} bg="$bg" p="$4" pb="$6" gap="$4" jc="space-between">
      {/* top bar */}
      <XStack ai="center" jc="center" py="$2" pb="$3" position="relative">
        <Text fontSize={24} fontWeight="700">
          Filter
        </Text>
        <TouchableOpacity
          onPress={resetAll}
          style={{position: 'absolute', right: 0}}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
        >
          <MaterialIcons name="close" size={24} color={theme.color?.val} />
        </TouchableOpacity>
      </XStack>

      {/* groups */}
      <YStack gap="$4" f={1}>
        <Section>
          <Row
            label="Set"
            value={
              Array.isArray(formData.SetNumber)
                ? formData.SetNumber.join(', ')
                : formData.SetNumber
            }
            onPress={() => openPicker('SetNumber')}
          />
          <InputRow
            label="Card No."
            placeholder="e.g. 001"
            value={formData.CardNumber}
            onChangeText={(v) => setFormData((f) => ({...f, CardNumber: v}))}
          />

          <Row
            label="Rarity"
            value={
              Array.isArray(formData.Rarity)
                ? formData.Rarity.join(', ')
                : formData.Rarity
            }
            onPress={() => openPicker('Rarity')}
          />

          <InputRow
            label="Character"
            placeholder="Type a name"
            value={formData.CharacterName}
            onChangeText={(v) => setFormData((f) => ({...f, CharacterName: v}))}
          />

          <Row
            label="Series"
            value={
              Array.isArray(formData.SeriesName)
                ? formData.SeriesName.join(', ')
                : formData.SeriesName
            }
            onPress={() => openPicker('SeriesName')}
          />
        </Section>
      </YStack>

      {/* bottom bar */}
      <XStack gap="$3" mt="$2">
        <Button
          flex={1}
          size="$4"
          br="$8"
          bg="$cardBg"
          color="$color"
          borderColor="$borderColor"
          borderWidth={1}
          onPress={resetAll}
        >
          Reset All
        </Button>
        <Button
          flex={1}
          size="$4"
          br="$8"
          bg="$primary"
          color="white"
          onPress={apply}
        >
          Apply
        </Button>
      </XStack>
    </YStack>
  );
}
