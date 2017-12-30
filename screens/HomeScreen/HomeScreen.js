import React from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as localStore from '../../localStore/localStore.js';
import { Text, View, Button, AsyncStorage, NetInfo } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { InputText, Header, StyledButton } from '../../components/exports.js';
import { Wrap } from '../../layouts/exports.js';

class HomeScreen extends React.Component
{
    static navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="bath" size={30} color="#900" />
        ),
    };

    state = {
        text: 'AMP',
        title: null,
        body: null,
        connected: false
    }

    componentWillMount()
    {
        localStore.getData('isLogged', (result)=> {
            if(result == null)
            {
                this.props.navigation.navigate('Login');
            }
        })
    }

    componentDidMount()
    {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConectivityChange);
    }

    handleConectivityChange()
    {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });
    }

    render()
    {
        const { navigate } = this.props.navigation;

        return (
            <View>
                <Header toggleMenu={this.props.navigation}/>
                <Wrap>
                    <Text>Serban</Text>
                    <Text>This mobile device is {this.state.connected}</Text>
                    <StyledButton onPress={()=> localStore.saveData('Florinel', {name: 'Florinel', job: 'Screw seller'}) } title={'Save data'}/>
                    <StyledButton onPress={()=> localStore.getData('Florinel', (result)=> {console.log(result)})} title={'Get Data'}/>
                    <StyledButton onPress={()=> localStore.getAllKeys()} title={'Get Keys'}/>
                    <StyledButton onPress={()=> localStore.mergeData('Florinel', {hillbilly: true})} title={'Merge'}/>
                    <StyledButton onPress={()=> localStore.clearData()} title={'Clear'}/>
                </Wrap>
            </View>
        );
    }
}

export default HomeScreen;
