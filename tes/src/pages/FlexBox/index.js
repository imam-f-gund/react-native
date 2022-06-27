import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, FlatList,View ,Dimensions, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Container, Content, Badge, CardItem,Grid, Col, Text, Body} from 'native-base';

export default class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tes: [],
      isLoading: true,
      refreshing: true
    };
  }

 
        
  componentDidMount() {
    fetch('http://kkn.levenshop.com/data.php')
      .then((response) => response.json())
      .then((json) => {
        
        const coba =  json.data.map(function(item) {
          return {
            key: item.id,
            values: item.ph,
            values_suhu: item.suhu   
          };
        });

        this.setState({data: json.data, tes: coba, refreshing: false });
        // console.error(res)
        })
      .catch((error) => alert(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  
  ListViewItemSeparator = () => {
    return (
      //returning the listview item saparator view
      <View
        style={{  
          height: 0.2,
          width: '90%',
          backgroundColor: '#808080',
        }}
      />
    );
  };
  
  onRefresh() {
    //Clear old data of the list
    this.setState({ data: [],tes: [] });
    //Call the Service to get the latest data
    this.componentDidMount();
  }
  
  render() {
    const windowWidth = Dimensions.get('screen').width;
    const { tes ,suhus, data, isLoading } = this.state;


    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View >
            <ActivityIndicator />
           
        </View>
      );
    }
   
    return (
      <SafeAreaView >
      <ScrollView
       
       refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh.bind(this)}
        />
      }
      >
        <Container >
            
           <CardItem header style={{alignItems: 'stretch',backgroundColor: 'powderblue'}}>
           <Text>Data Ph dan Suhu Air</Text>
           </CardItem>
           <CardItem header bordered style={{alignItems: 'stretch'}} >
             
             <Grid>
                   <Col><Text>Ph</Text></Col>
                   <Col><Text>Suhu</Text></Col>
                   <Col><Text>Date</Text></Col>
               </Grid>
           </CardItem>
           
           {/* <Text>Pull down to see RefreshControl indicator</Text> */}
       <Content style={{flex: 1, flexDirection: 'row'}} style={{height: 50}}>
       {/* <SafeAreaView 
        refreshControl={
          <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
          />
        }> */}
       {/* <ScrollView > */}
         
       {isLoading ? <ActivityIndicator /> : (
          
          
         <FlatList
        //  contentContainerStyle={styles.scrollView}  
           data={this.state.data}
           keyExtractor={({ id }, index) => id}
          //  refreshControl={
          //   <RefreshControl
          //     //refresh control used for the Pull to Refresh
          //     refreshing={this.state.refreshing}
          //     onRefresh={this.onRefresh.bind(this)}
          //   />
          //  }
           renderItem={({ item }) => (
            // <Text>{item.time}</Text>
            // <Grid>
            // <Col><Badge success><Text>{item.ph}</Text></Badge ></Col>
            // <Col><Badge  info><Text>{item.suhu}</Text></Badge ></Col>

            // <Badge primary><Text>{item.time}</Text></Badge >
            // </Grid>
               <CardItem bordered>
              
                {/* <View > */}
                <Grid>
                    <Col><Text>{item.ph}</Text></Col>
                    <Col><Text>{item.suhu}</Text></Col>
                    <Text>{item.time}</Text>
                </Grid>
                {/* </View> */}
               </CardItem>
               
           )}
         />
       
       )}
     
       {/* </ScrollView> */}
       {/* </SafeAreaView> */}
       </Content>
      
     </Container>
     </ScrollView>
    </SafeAreaView>
     
    );
  }
};
const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});