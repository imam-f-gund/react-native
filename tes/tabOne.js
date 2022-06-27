import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { ActivityIndicator, View ,Dimensions} from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import {LineChart} from 'react-native-chart-kit';

// import { DataTable } from 'react-native-paper';

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
    
    // const screenWidth = Dimensions.get("window").width;
    const windowWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('window').height;
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
        <View style={{ flex: 1,  backgroundColor: "#8FBC8F", paddingTop: 20 }}>
        
          <ActivityIndicator />
        </View>
      );
    }
   
    return (
       <Container>
        <Text>Data Ph Dan Suhu Air</Text>
        <Text note>Welcome</Text>
             
        <Content>
          <Card>
            <CardItem>
              <Body>
                <LineChart
                data={datas}
                // width={Dimensions.get("screen").width - 40} // from react-native
                width={windowWidth - 40} // from react-native
                height={178}
                yAxisLabel={""}
                chartConfig={{
                backgroundColor: "green",
                backgroundGradientFrom: "green",
                backgroundGradientTo: "blue",
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 1) => `white`,
                labelColor: (opacity = 1) => `white`,
                style: {
                    borderRadius: 16
                }
                }}
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
                />

            <LineChart
              data={datas_suhu}
              //  width={Dimensions.get("window").width - 50} // from react-native
              width={windowWidth-40} // from react-native
              height={170}
              yAxisLabel={""}
              chartConfig={{
              backgroundColor: "yellow",
              backgroundGradientFrom: "green",
              backgroundGradientTo: "red",
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `white`,
              labelColor: (opacity = 1) => `white`,
              style: {
                  borderRadius: 16
              }
              }}
              style={{
              marginVertical: 8,
              borderRadius: 16
              }}
              />
           
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>@Copyring</Text>
            </CardItem>
         </Card>
        </Content>
      </Container>
      
    );
  }
};
