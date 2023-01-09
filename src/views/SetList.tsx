import {Button, Icon, Text} from '@rneui/themed';
import {View} from 'react-native';
import Header from '../components/Header';

const SetList = () => {
  return (
    <>
      <Header>
        <View
          style={{
            flex: 1,
            paddingLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 19,
              color: '#fff',
            }}
          >
            {'Goddess Story'}
          </Text>
        </View>
        <Button
          containerStyle={{
            marginTop: 10,
            marginRight: 8,
          }}
          buttonStyle={{
            height: 46,
          }}
          type="clear"
          onPress={async () => {}}
        >
          <Icon name="tune" color="white" />
        </Button>
      </Header>
    </>
  );
};
export default SetList;
