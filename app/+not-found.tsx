import {Link, Stack} from 'expo-router';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../src/constants/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{title: 'Oops!'}} />
      <View style={[styles.container, {backgroundColor: Colors.background}]}>
        <Text style={[styles.title, {color: Colors.black}]}>
          This screen does not exist.
        </Text>
        <Link href="/home" style={styles.link}>
          <Text style={[styles.linkText, {color: '#0a7ea4'}]}>
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    lineHeight: 30,
    fontSize: 16,
  },
});
