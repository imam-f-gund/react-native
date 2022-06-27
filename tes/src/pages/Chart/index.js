import React, { Component } from 'react';
import { Dimensions} from 'react-native';
import { Body } from 'native-base';
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
  
  render() {
    
    // const screenWidth = Dimensions.get("window").width;
    const windowWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('window').height;
    const { tes ,suhus, data, isLoading } = this.state;

    const arr = [0]; 
    const arr_label = ['1','2','3','4','5','6','7','8','9','10'];
    const arr_suhu = [0]; 
    const arr_label_suhu = ['1','2','3','4','5','6','7','8','9','10'];

   
    tes.forEach(myFunction);

    function myFunction(value) {
      console.log(value.key);
     
      if (value.values != undefined || value.key != undefined) {
      arr.push(value.values);
    //   arr_label.push(value.key);
      arr_suhu.push(value.values_suhu);
    //   arr_label_suhu.push(value.key);
      }
    }
    // console.log(arr);
    
    const datas = {
      labels: arr_label,
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
      labels: arr_label_suhu,
      datasets: [
        {
          data:arr_suhu.slice(0, 10),
          color: (opacity = 1) => `rgba(0, 0, 139, ${opacity})`, // optional
          strokeWidth: 2 // optional
            }
      ],
      legend: ["Tingkat Suhu"] // optional
    };
   
    return (
     
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
              height={178}
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
         
    );
  }
};
