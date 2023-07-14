import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SwipeListView } from 'react-native-swipe-list-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import HomePage from './components/HomePage';
import Task from './components/Task';


const Stack = createStackNavigator();

const categories = ['Personal', 'Study', 'Work', 'Shopping', 'Others'];

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskCategory, setTaskCategory] = useState('Personal');

  const handleAddTask = () => {
    if (task.trim() && selectedDate) {
      const newTask = {
        text: task,
        priority: 'Low',
        dueDate: selectedDate,
        category: taskCategory,
      };
      setTaskItems([...taskItems, newTask]);
      setTask('');
      setSelectedDate(null);
      setTaskCategory('Personal');
    }
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const updatePriority = (index, newPriority) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].priority = newPriority;
    setTaskItems(itemsCopy);
  };

  const deleteTask = (index) => {
    setTaskItems((prevTaskItems) => {
      const updatedTaskItems = [...prevTaskItems];
      updatedTaskItems.splice(index, 1);
      return updatedTaskItems;
    });
  };
  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name = "Home">
          {(props) => (
            <View style={styles.container}>
              <HomePage
                {...props}
                onAddTask={() => props.navigation.navigate('Task')}
                onCheckTasks={() => props.navigation.navigate('TaskList')}
              />
            </View>
          )}
       </Stack.Screen>
        <Stack.Screen name="Task">
          {(props) => (
            <View style={styles.container}>
              <View style={styles.categoryWrapper}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={styles.categoryButton}
                    onPress={() => setTaskCategory(category)}
                  >
                    <Text style={styles.categoryButtonText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.tasksWrapper}>
                <Text style={styles.subtitle}>My Lists</Text>
                <SwipeListView
                  data={taskItems}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => completeTask(index)}>
                      <Task
                        text={`${item.text} `}
                        key={`task-${index}`}
                        priority={item.priority}
                        updatePriority={(newPriority) => updatePriority(index, newPriority)}
                        dueDate={item.dueDate}
                        category={item.category}
                      />
                    </TouchableOpacity>
                  )}
                  renderHiddenItem={({ item, index }) => (
                    <View style={styles.rowBack}>
                      <TouchableOpacity
                        style={[styles.deleteButton]}
                        onPress={() => deleteTask(index)}
                      >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  rightOpenValue={-75}
                />
              </View>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Write your task"
                  value={task}
                  onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity onPress={showDatePicker}>
                  <Text style={styles.datePickerText}>
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Due Date'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddTask}>
                  <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                  </View>
                </TouchableOpacity>
              </KeyboardAvoidingView>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="TaskList">
          {(props) => (
            <View style={styles.container}>
              <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>Task List</Text>
                <Text style={styles.subtitle}>My Tasks</Text>
                <SwipeListView
                  data={taskItems}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => completeTask(index)}>
                      <Task
                        text={`${item.text} (${item.category})`}
                        key={`task-${index}`}
                        priority={item.priority}
                        updatePriority={(newPriority) => updatePriority(index, newPriority)}
                        dueDate={item.dueDate}
                        category={item.category}
                      />
                    </TouchableOpacity>
                  )}
                  renderHiddenItem={({ item, index }) => (
                    <View style={styles.rowBack}>
                      <TouchableOpacity
                        style={[styles.deleteButton]}
                        onPress={() => deleteTask(index)}
                      >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  rightOpenValue={-75}
                />
              </View>
            </View>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ivory',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -60,
    textDecorationLine: 'underline',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  datePickerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'navy',
    textDecorationLine: 'underline',
  },
  categoryWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  categoryButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'navy',
  },
  categoryButtonText: {
    fontSize: 17,
    color: 'ivory',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'navy',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 40,
    color:'ivory',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 0,
    borderRadius:10,
    padding:10,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: '100%',
    backgroundColor: 'red',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

