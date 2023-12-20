import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Redux actions and reducer
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text },
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});

const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: { id },
});

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            text: action.payload.text,
            completed: false,
          },
        ],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
};

// Redux store
const store = createStore(todoReducer);

// React component
const TodoApp = ({ todos, dispatch }) => {
  const [todoText, setTodoText] = useState('');

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      dispatch(addTodo(todoText));
      setTodoText('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your to-do"
          value={todoText}
          onChangeText={(text) => setTodoText(text)}
        />
        <Button title="Add" onPress={handleAddTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              onPress={() => handleToggleTodo(item.id)}
              onLongPress={() => handleRemoveTodo(item.id)}
            >
              <Text
                style={[styles.todoText, item.completed && styles.completedTodoText]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const ConnectedTodoApp = connect(mapStateToProps)(TodoApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  todoItem: {
    marginBottom: 8,
  },
  todoText: {
    fontSize: 16,
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

const App = () => (
  <Provider store={store}>
    <ConnectedTodoApp />
  </Provider>
);

export default App;
