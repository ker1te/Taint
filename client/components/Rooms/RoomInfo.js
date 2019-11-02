import React, {Component} from 'react';
import { Text, ScrollView, FlatList, View, Alert, StyleSheet } from 'react-native';
import { ListItem, Icon, Tooltip, ButtonGroup, Button, Avatar } from 'react-native-elements';

const ControlPanel = (props) => (
  <View style={{flexDirection: 'row', marginRight: 15}}>
    <Button
      icon={
        <Icon
          name='user-plus'
          type='font-awesome'
          color='#09C709'
          size={18}
        />
      }
      containerStyle={{marginRight: 5}}
      onPress={props.addUser}
      type='clear'
    />
    <Button
      icon={
        <Icon
          name='trash'
          type='font-awesome'
          color='#09C709'
          size={18}
        />
      }
      onPress={props.deleteRoom}
      type='clear'
    />
  </View>
)

const DeleteUserButton = (props) => (
  <Button
    icon={
      <Icon
        name='minus-circle'
        type='font-awesome'
        color='#167B14'
        size={15}
      />
    }
    buttonStyle={{marginHorizontal: 3}}
    containerStyle={{padding: 0}}
    onPress={() => props.deleteUser(props.userId)}
    type='clear'
  />
)

class RoomInfo extends Component {
  constructor(props){
    super(props);

    this.state = {
      contacts: [
        {id: 0, username: 'kaper'},
        {id: 1, username: 'kaper'},
        {id: 2, username: 'kaper'},
        {id: 3, username: 'kaper'},
        {id: 4, username: 'kaper'},
        {id: 5, username: 'MORANA'},
        {id: 6, username: 'nastya'}
      ],
      roomId: 1,
      roomName: '',
      roomType: '',
      roomKey: '',
      roomTime: 2981,
      roomCreator: '0',
      roomUsers: [
        {id: 0, username: 'kaper'},
        {id: 1, username: 'kaper'},
        {id: 2, username: 'kaper'},
        {id: 3, username: 'kaper'},
        {id: 4, username: 'kaper'},
        {id: 5, username: 'MORANA'}
      ]
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Information',
      headerStyle: {
        backgroundColor: '#222222'
      },
      headerTintColor: '#09C709',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: (
        <ControlPanel
          addUser={navigation.getParam('addUser')}
          deleteRoom={navigation.getParam('deleteRoom')}
        />
      )
    };
  };

  componentWillMount(){
    const roomId = this.props.navigation.getParam('roomId');
    const roomName = this.props.navigation.getParam('roomName');
    const roomKey = '1234-7618-234';
    const roomType = 'Private';
    this.setState({
      roomId,
      roomName,
      roomKey,
      roomType
    })
  }

  componentDidMount(){
    this.props.navigation.setParams({ 
      addUser: this.addUser,
      deleteRoom: this.deleteRoom
    });
  }

  // DELETE ROOM OPERATION
  deleteRoom = () => {
    Alert.alert(
      'Delete Room',
      `Are you sure you want to delete ${this.state.roomId} room?`,
      [
        { text: 'Cancel', style: 'cancel', onPress: () => {console.log('Canceled')} },
        { text: 'Delete', style: 'default', onPress: () => {console.log('Deleted')} }
      ]
    )
  }

  // ADD USER OPERATION
  addUser = () => {
    const {contacts, roomUsers} = this.state;
    this.props.navigation.navigate('RoomUsersSelect', {
      handleUsersSelect: this.handleUsersSelect,
      contacts: contacts.filter(c => !roomUsers.find(u => u.id == c.id))
    });
  }

  handleUsersSelect = (users) => {
    console.log(users.map(u => u.id));
  }

  deleteUser = (id) => {
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${id} user?`,
      [
        { text: 'Cancel', style: 'cancel', onPress: () => {console.log('Canceled')} },
        { text: 'Delete', style: 'default', onPress: () => {console.log('Deleted')} }
      ]
    )
  }

  renderUser = ({ item }) => {
    return(
      <ListItem
        title={item.username}
        bottomDivider
        containerStyle={styles.infoListItemCont}
        titleStyle={styles.infoListItemTitle}
        leftElement={
          <Avatar
            rounded
            size='small'
            source={require('../../assets/cat.jpg')}
          />
        }
        rightElement={
          <DeleteUserButton deleteUser={this.deleteUser} userId={item.id}/>
        }
      />
    )
  }

  render(){
    return(
      <ScrollView
        style={{
          backgroundColor: '#151516'
        }}
      >
        <ListItem
          title='Name'
          rightTitle={this.state.roomName}
          containerStyle={styles.infoListItemCont}
          titleStyle={styles.infoListItemTitle}
          rightTitleStyle={styles.infoListItemRigthTitle}
        />
        <ListItem
          title='Key'
          rightTitle={this.state.roomKey}
          containerStyle={styles.infoListItemCont}
          titleStyle={styles.infoListItemTitle}
          rightTitleStyle={styles.infoListItemRigthTitle}
        />
        <ListItem
          title='Time'
          rightTitle={`${Math.floor(this.state.roomTime/60)}m`}
          containerStyle={styles.infoListItemCont}
          titleStyle={styles.infoListItemTitle}
          rightTitleStyle={styles.infoListItemRigthTitle}
        />
        <ListItem
          title='Users'
          rightTitle={`${this.state.roomUsers.length}`}
          containerStyle={styles.infoListItemCont}
          titleStyle={styles.infoListItemTitle}
          rightTitleStyle={styles.infoListItemRigthTitle}
        />
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={this.state.roomUsers}
          renderItem={this.renderUser}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  infoListItemCont: {
    backgroundColor: '#151516'
  },
  infoListItemTitle: {
    color: '#fff'
  },
  infoListItemRigthTitle: {
    color: 'grey'
  }
})

export default RoomInfo;