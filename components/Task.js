import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = ({
  text,
  priority,
  updatePriority,
  dueDate,
  category,
  completeTask,
}) => {
  return (
    <TouchableOpacity onPress={completeTask}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={[styles.pointer, { backgroundColor: getPriorityColor(priority) }]}></View>
          <Text style={styles.itemText}>{text}</Text>
        </View>
        <View style={styles.taskDetails}>
          <Text style={styles.dueDateText}>{dueDate.toLocaleDateString()}</Text>
          <Text style={styles.categoryText}>({category})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Low':
      return 'green';
    case 'Medium':
      return 'orange';
    case 'High':
      return 'red';
    default:
      return 'gray';
  }
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent:'space-between',
  },
  pointer: {
    width: 24,
    height: 24,
    opacity: 0.4,
    borderRadius: 20,
    marginRight: 5,
    
  },
  itemText: {
    maxWidth: '80%',
  },
  taskDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
  },
  dueDateText: {
    marginRight: 5,
  },
  categoryText: {
    color: 'black',
  },
});

export default Task;
