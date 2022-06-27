// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, ScrollableTab ,Icon, Text} from 'native-base';
import Flex from '../pages/FlexBox';
import Home from '../pages/Home';
// import Login from './src/login';

const App = () => {
  return (
    <Container >
    <Header hasTabs style={styles.heights}/>
    <Tabs renderTabBar={()=> <ScrollableTab />}>
      <Tab heading="Dashboard">
        <Home />
      </Tab>
      <Tab heading="Detail Data">
        <Flex />
      </Tab> 
    </Tabs>
   
  </Container>
   
  );  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heights:{
    height:10.
  }
});
export default App;