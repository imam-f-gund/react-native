import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { ActivityIndicator, RefreshControl, FlatList,View ,Dimensions} from 'react-native';
import { Container, Content, Badge, CardItem,Grid, Col, Text, Button, Body} from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tes: [],
      isLoading: true,
      refreshing: true
    };
  
    this.data1 = {data:'tes'};
      
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

        this.setState({  data: json.data, tes: coba, refreshing: false });
        // console.error(res)
        })
      .catch((error) => console.error(error))
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

    const arr = [0]; 
    const arr_label = [0];
    const arr_suhu = [0]; 
    const arr_label_suhu = [0];

   
    tes.forEach(myFunction);

    function myFunction(value) {
      console.log(value.key);
     
      if (value.values != undefined || value.key != undefined) {
      arr.push(value.values);
      arr_label.push(value.key);
      arr_suhu.push(value.values_suhu);
      arr_label_suhu.push(value.key);
      }
    }
    console.log(arr);
    
    
  
    const datas = {
      labels: arr_label.slice(0, 10),
      datasets: [
        {
          data:arr.slice(0, 10),
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Tingkat Ph"] // optional
    };
    
    const datas_suhu = {
      labels: arr_label_suhu.slice(1, 10),
      datasets: [
        {
          data:arr_suhu.slice(0, 10),
          color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }
      ],
      legend: ["Tingkat Suhu"] // optional
    };

    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        <View style={{ flex: 1,  backgroundColor: "#8FBC8F", paddingTop: 10 }}>
            <ActivityIndicator />
        </View>
      );
    }
   
    return (
        <Container>
            
             <CardItem header style={{alignItems: 'stretch',backgroundColor: 'powderblue'}}>
             <Text>Data Ph dan Suhu Air</Text>
            </CardItem><CardItem header bordered style={{alignItems: 'stretch'}}>
              <Grid>
                    <Col><Badge success><Text>Ph</Text></Badge></Col>
                    <Col><Badge info><Text>Suhu</Text></Badge></Col>
                    <Col><Badge primary><Text>Date</Text></Badge></Col>
                </Grid>
            </CardItem>
        <Content style={{flex: 1, flexDirection: 'row'}} style={{height: 50, backgroundColor: 'powderblue'}}>
       
          <View style={{ flex: 1, padding: 10}}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={this.state.data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
                
                <CardItem bordered>
                <Body>
                <Grid>
                    <Col><Button block  success><Text>{item.ph}</Text></Button ></Col>
                    <Col><Button block  info><Text>{item.suhu}</Text></Button ></Col>

                    <Button block primary><Text>{item.time}</Text></Button >
                </Grid>
                </Body>
                </CardItem>
                
            )}
            refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
          />
        )}
      </View>
               
        
        </Content>
      </Container>
    );
  }
};

// data={this.state.data}
// ItemSeparatorComponent={this.ListViewItemSeparator}
// enableEmptySections={true}
// keyExtractor={({ id }, index) => id}
// renderItem={({ item }) => (

//   <Badge success>
//   <Text>{item.ph}</Text>
//   </Badge>,
//  <Badge success>
//   <Text>{item.time}</Text>
// </Badge> 
// //   <Text>{item.suhu}{item.time} </Text>

// )}
// refreshControl={
//   <RefreshControl
//     //refresh control used for the Pull to Refresh
//     refreshing={this.state.refreshing}
//     onRefresh={this.onRefresh.bind(this)}
//   />
// }