import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DataSource from '../../DataSource/DataSource';
import { image } from '../../../assets';
const arr = [];

const Home = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctOption, setCorrectOption] = useState(null);
  const [show, setShow] = useState(false);
  const [greenColor, setGreenColor] = useState(false);
  const [redColor, setRedColor] = useState(false);
  const [disabletouch, setDisableTouch] = useState(false);
  const [EnterQuiz,setEnterQuiz] = useState(true);
  const [manageItem, setManageItem] = useState(false);
  const [time,setTime] = useState(5);

  const DataStore = [
    {
      id: 0,
      Question: 'What is Capital of India',
      Options: ['Delhi', 'Hariyna', 'Rajathan', 'Kerala'],
      Answer: 'Delhi',
      img  : image.logo

    },
    {
      id: 1,
      Question: 'What is Capital of UK',
      Options: ['Delhi', 'UP', 'London', 'New York'],
      Answer: 'London',
      img  : image.logo1

    },
    {
      id: 2,
      Question: 'What is Capital of India',
      Options: ['Delhi', 'Hariyna', 'Rajathan', 'Kerala'],
      Answer: 'Delhi',
      img  : image.logo2

    },
    {
      id: 3,
      Question: 'React IS: ',
      Options: [
        'JavaScript Lib',
        'Proggramming',
        'C++ Lib',
        'AIML:related',
      ],
      Answer: 'JavaScript Lib',
      img  : image.logo3

    },
  ];

  const handleScore = item => {
    console.log(item);
    const data = DataStore[currentQuestion].Answer;
    setCorrectOption(data);
    setDisableTouch(true);
    setManageItem(true);
    arr.push(item)
    // console.log(data);
    // console.log('Clicked');
    if (item === data) {
        
        setGreenColor(true);
        setScore(score + 1);
    } else {
      setRedColor(true);
    }
  };

  const handleSubmit = () => {
    if(manageItem == false){
        arr.push("Skipped");
    }
    setDisableTouch(false);
    setTime(0);
    setCorrectOption(null);
    setCurrentQuestion(currentQuestion + 1);
    setGreenColor(true);
    setRedColor(true);
    if (currentQuestion >= DataStore.length - 1) {
      // Alert.alert("Question Completed")
      setShow(true);
    }
    setManageItem(false);
  };

  const handleNext = () => {
    if(manageItem == false){
        arr.push("Skipped");
    }
    setDisableTouch(false);
    setTime(5);
    setCorrectOption(null);
    setCurrentQuestion(currentQuestion + 1);
    setGreenColor(false);
    setRedColor(false);
    if (currentQuestion >= DataStore.length - 1) {
      // Alert.alert("Question Completed")
      setShow(true);
    }
    setManageItem(false);
  };

  const handleStartAgainBtn = () => {
    setDisableTouch(false);
    // console.log('Start Again');
    setTime(5);
    setEnterQuiz(!EnterQuiz);
    setCurrentQuestion(0);
    setGreenColor(false);
    setRedColor(false);
    setScore(0);
    while(arr.length){
        arr.pop();
    }
    setShow(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1);
      if (time === 0) {
        clearInterval(interval);
        setDisableTouch(true);
       
        setTime(0);
        // arr.push('skipped')
        // setTime(5);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  
 
  return (
    <View style={styles.contain}>
{
    EnterQuiz ? 
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View>
            <Image source={require('../../../assets/logo.png')} style={{width:160,height:190}}/>
        </View>
        <View>
            <Text style={{color:'#1A759f',fontSize:40,fontWeight:'800',lineHeight:89.44,fontFamily:'times new roman'}}>Hello, Quiz</Text>
        </View>
        <View>
            <Text style={{marginTop:20,color:'#fff',fontSize:30,fontWeight:'800',fontFamily:'arial'}}>Let's Play</Text>
        </View>
        <View>
            <Text style={{color:'#fff',fontSize:14,fontWeight:'800',fontFamily:'times new roman',lineHeight:34.44}}>& Think More</Text>
        </View>

    <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center',}} onPress={()=>handleStartAgainBtn()}>
        <Text style={[styles.btnText,{backgroundColor:'blue',paddingRight:40,paddingLeft:40,paddingTop:25,paddingBottom:25,borderRadius:20}]}>Enter Quiz</Text>
    </TouchableOpacity>
    </View>
    :
    show ? (
        <ScrollView style={styles.containerResult}>
            
          <View style={styles.score}>
            <Text style={styles.textScore}>Score : {score}</Text>
          </View>

          {DataStore.map((item, index) => {
           
            return (
              <View key={index}>
                <Text style={styles.questions}>{item.Question}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                    <View>
                    <Text style={{color:'#fff',fontSize:14}}>Right Answer</Text>
                    <Text style={{color:'green',fontSize:20,width:'100%'}}>{item.Answer}</Text>
                    </View>
                    <View>
                    <Text style={{color:'#fff',fontSize:14}}>You Choose</Text>
                    {/* <View style={{flexWrap:'wrap',}}> */}
                    <Text style={item.Answer == arr[index] ? {color:'green',fontSize:20,width:'100%'}:{color:'red',fontSize:20}}>{arr[index]}</Text>
                    {/* </View> */}
                    </View>
                </View>               
              </View>
            );
            
          })}

          <TouchableOpacity onPress={() => handleStartAgainBtn()} style={styles.startAgain}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Start Again</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
        <View style={{height:50,width:50,borderRadius:26,backgroundColor:'blue',marginLeft:'80%',alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'#fff',fontSize:19,padding:10}}>
                {time}</Text>
        </View>
         <View style={{flex:1,alignItems:'center',marginBottom:'-90%'}}>
            <Image source={require('../../../assets/logo.png')} style={{width:160,height:190}}/> 
        </View> 

        <View style={styles.container}>
          <View>
            <View style={styles.wrapper}>
          

              <View>
                <Text style={styles.questions}>
                  {DataStore[currentQuestion].Question}
                </Text>
              </View>
              {DataStore[currentQuestion].Options.map((item, index) => {
                return (
                    
                  <TouchableOpacity key={index}
                    disabled={disabletouch}
                    onPress={() => handleScore(item)}
                    style={[
                      styles.AnswerContainer,
                      {
                        borderColor:
                          item == correctOption
                            ? 'green'
                            : redColor
                            ? 'red'
                            : 'gray',
                      },
                      {
                        backgroundColor:
                          item == correctOption
                            ? 'green'
                            : redColor
                            ? 'red'
                            : '#022',
                      },
                      
                    ]}>
                    <Text
                      style={[
                        styles.OptionsAnswers,
                        disabletouch
                          ? item == correctOption
                            ? {color: '#fff'}
                            : {color: 'gray'}
                          : {color: '#fff'},
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {currentQuestion <= DataStore.length - 2 ? (
              <TouchableOpacity onPress={() => handleNext()}>
                <View style={styles.btnQuestion}>
                  <Text style={styles.AnsText}>Next</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleSubmit()}>
                <View style={styles.btnQuestion}>
                  <Text style={styles.AnsText}>Submit</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        </>
      )}



      
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor:'#000'
  },
  containerResult: {
    flex: 1,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },

  AnswerContainer: {
    margin: 10,
    borderRadius: 20,
    borderWidth: 3,
    // borderColor:'gray',
  },
  OptionsAnswers: {
    padding: 15,
    alignItems: 'center',
    color: '#fff',
    fontSize:18,
    fontWeight: '700',
    alignSelf: 'center',
  },
  questions: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'arial',
    margin: 10,
    marginLeft: 20,
  },
  greencolor: {
    borderWidth: 1,
    borderColorL: 'green',
  },
  redcolor: {
    borderWidth: 1,
    borderColorL: 'red',
  },
  score: {
    alignItems: 'center',
  },
  textScore: {
    fontSize: 20,
    marginBottom: 30,
    color: '#fff',
    fontFamily: 'Arial',
    fontWeight: '700',
  },
  btn: {
    height: 60,
    width: 160,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnQuestion: {
    width: '95%',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
    // marginRight:10,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  AnsText: {
    color: '#fff',
    padding: 14,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 25.22,
  },
  startAgain:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
    marginBottom:20,
  }
});



// {DataStore[item.id].Options.map(ele => {
//     return (
//       <View
//         style={[
//           styles.AnswerContainer,
//           {
//             borderColor: ele== item.Answer ?
//               'green':'red'
//           },
//         ]}>
//         <Text
//           style={[
//             styles.OptionsAnswers,
//            {color: '#fff'},
//           ]}>
//           {ele}
//         </Text>
//       </View>
//     );
//   })}


// const timer = ()=>{
//     while(time > 0){
//         setInterval((time) => {
//             setTime(time-1)
//         }, 1000);
//     // setTime(time-1);
//     }
//   }

 // if(currentQuestion < DataStore.length){
        // setCurrentQuestion(currentQuestion+1);
        // }