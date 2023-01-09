import {Button, Icon, Text} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';

const SetList = () => {
  return (
    <>
      <Header>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{'Goddess Story'}</Text>
        </View>
        <Button
          containerStyle={styles.filterContainer}
          buttonStyle={styles.filterButton}
          type="clear"
          onPress={async () => {}}
        >
          <Icon name="tune" color="white" />
        </Button>
      </Header>
    </>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 19,
    color: '#fff',
  },
  filterContainer: {
    marginTop: 10,
    marginRight: 8,
  },
  filterButton: {
    height: 46,
  },
});
export default SetList;
