import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';

const HomePage = ({ navigation, onAddTask, onCheckTasks }) => {
  const handleAddTask = () => {
    navigation.navigate('Task');
  };

  const handleCheckTasks = () => {
    onCheckTasks();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>PenDown</Text>
      <Text style={styles.userInfo}>...allows you to write your task,select a category of the task and add the preferred due date you would want to complete the task.</Text>
      <Text styles={styles.question}>What would you like to do?</Text>
      <View style={styles.homePageButtons}>
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCheckTasks}>
          <Text style={styles.buttonText}>Check Tasks</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'firebrick',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    fontStyle:'italic',
  },
  homePageButtons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'ivory',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo:{
    fontSize:15,
    fontStyle:'italic',
    color:'ivory',
    flex:0,
  },
  question:{
    fontSize:20,
    fontWeight:'bold',
  },
  
      
});

export default HomePage;
