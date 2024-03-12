import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Todos, Radar, Yo } from '../screens';

const Tab = createMaterialBottomTabNavigator();

const TabsProps = [
    {
        name: 'Todos',
        component: Todos,
        icon: 'account-group'
    },
    {
        name: 'Radar',
        component: Radar,
        icon: 'radar'
    },
    {
        name: 'Yo',
        component: Yo,
        icon: 'account'
    },
]

export default () => (
    <Tab.Navigator initialRouteName='Radar' >
        {
            TabsProps.map(
                ({ name, component, icon }, i) => (
                    <Tab.Screen
                        key={i}
                        name={name}
                        component={component}
                        options={{
                            tabBarIcon: ({ color }) => <Icon name={icon} color={color} size={24} />
                        }}
                    />
                )
            )
        }
    </Tab.Navigator>
)