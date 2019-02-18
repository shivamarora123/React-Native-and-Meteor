import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import {View,Text} from 'react-native'
import { AuthStack, Tabs } from './config/routes';
import Loading from './components/Loading';
import settings from './config/settings';

Meteor.connect(settings.METEOR_URL);

const juntraxApp = (props) => {
  const { status, user, loggingIn } = props;

  if (status.connected === false || loggingIn) {
    return <Loading />;
  } else if (user !== null) {
    return <Tabs />;
    // return (<View><Text> User Loggen In as {user.emails[0].address}</Text></View>)
  }
  return <AuthStack />;
};

juntraxApp.propTypes = {
  status: React.PropTypes.object,
  user: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
};

export default createContainer(() => {
  console.log({
    status: Meteor.status(),
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  });
  
  return {
    status: Meteor.status(),
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, juntraxApp);
