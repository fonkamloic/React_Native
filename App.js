/* Name: TodoApp
 * Purpose: Basic todo application use to add , select, and delete task from a todo list
 * Date Implemented: 04-dec-2018
 * Author: Fonkam Loic, Faculty of Science, Department of Computer Science 
 * Version: 1.0
 * Email: fonkamloic@gmail.com
 * GitHub: fonkamloic
 */



import React from 'react';
import { TextInput, CheckBox, ScrollView, Text, StyleSheet, Button, View, TouchableOpacity, Dimensions } from 'react-native';
// import expo constants to make use of statusBarHeight and avoid app overlapping with it
import { Constants } from 'expo';

// create  a Global todo Id variable
let TodoId = 0;

// create a todo component
const Todo = (props) => { 
    return (
    <View style={styles.todoFrame}>
        <CheckBox  value={props.todo.checked} onChange={props.onToogle}/>
        <Text style={styles.todoText}>{ props.todo.text }</Text>
        {props.todo.checked ?
         <Button onPress={props.onDelete} title='Delete' />
           :null
        } 
       </View>
    );
}


export default class App extends React.Component {
    constructor(){
        super();
        this.state= {
            newTodo: "",
            todos: [],
        }
    }

    // get the todo name from input and push in todos array
    getTodo() {
        if(this.state.newTodo == '')
        {
            alert('Enter a todo first')
            return;
        }
        const text = this.state.newTodo;
        this.setState({
            todos: [...this.state.todos, {TodoId: TodoId++, text: text, checked: false }],
            newTodo: '',
        })
    }
    
    // Delete a specific todo using its id
    deleteTodo(TodoId) {
        this.state.todos.forEach((todo) => {if(todo.TodoId == TodoId && todo.checked ==  true) {
             this.setState({
                  todos: this.state.todos.filter(todo =>  todo.TodoId !== TodoId ) 
             })
        }
            return

        })
    }

    // Ensure that a checkbox of a todo can be checked or unchecked
    toogleTodo(TodoId) {
            this.setState({
                todos: this.state.todos.map(todo => {
                    if(todo.TodoId !== TodoId ) return todo
                    return {
                         TodoId: todo.TodoId,
                         text: todo.text,
                         checked: !todo.checked,
                         DelAll: false,
                    }
                })
             })
    }

    // Use to highligh every todo in todos array but changing the checked attribute to true
    selectAll() {
        this.setState({
            todos: this.state.todos.map(todo => {
            if(todo) return {
                TodoId: todo.TodoId,
                text: todo.text,
                checked: true,    
                }
            }),

        })
            
    }

    // delect all todo by emptying the todos array
    deleteAll() {
             this.setState({
                  todos: this.state.todos.filter(todoElement =>   todoElement.checked !== true ) 
             })

    }

    render() {
        return(
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{ fontSize: 35, fontWeight: 'bold' }}> MY TODO </Text>
            </View>
            
            <View style={styles.inputArea}>
                <View style={{ paddingLeft: 50, paddingRight: 50 }} >
                      <TextInput onChangeText ={(newTodo) => this.setState({newTodo}) } style= {{ 
                                                                                           paddingLeft: 10, 
                                                                                           borderColor: 'black',
                                                                                           borderRadius: 4, 
                                                                                           borderWidth: 2,
                                                                                           fontSize: 18
                       }} placeholder = "Enter todo...">{this.state.newTodo}</TextInput>
                </View>
                <View style={styles.counter}>
                    <Text style={styles.counterText}>Todo(s) = {this.state.todos.length}</Text>
                    <Text style={styles.counterText}>Unchecked todo(s) = {this.state.todos.filter(todo => !todo.checked).length} </Text>
                </View>
            
               <View style={styles.buttons}>
               <TouchableOpacity onPress={() => this.getTodo()} style={styles.buttonFrame}><Text style={styles.textButton}>ADD</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectAll()} style={styles.buttonFrame}><Text style={styles.textButton}>Select All</Text></TouchableOpacity>
                { this.state.todos.filter(todo => todo.checked).length > 1?
                 <TouchableOpacity onPress={() => this.deleteAll()} style={styles.buttonFrame}><Text style={styles.textButton}>Delete All</Text></TouchableOpacity>
                    : null
                }
                               </View>
            </View>
            <View style={styles.viewArea}>
                <ScrollView >
                    {this.state.todos.map( todo => ( 
                    <Todo 
                        onToogle={() => this.toogleTodo(todo.TodoId)}
                        onDelete={() => this.deleteTodo(todo.TodoId)}
                        todo={todo}
                        />
                    ))}
               </ScrollView>

            </View>
        </View>
        );
    }
}


const styles = StyleSheet.create({
     container: {
         paddingTop: Constants.statusBarHeight,
         flex: 1, 
         backgroundColor: '#42b4a9',
         alignItems: 'center',
         justifyContent: 'center',
     },

    todoFrame: {
         flexDirection: 'row',
         padding: 10,
         alignItems: 'flex-start',
        margin: 5,
         justifyContent: 'flex-start',
        backgroundColor: 'lightgreen',
         borderRadius: 4,
         borderColor: 'black'
     },

     todoText: {
         fontSize: 20,
         paddingRight: 20,
         paddingLeft: 2,
         fontWeight: '600',
         paddingTop: 5,
     },
   title: {
        flex: 1, 
        alignItems: 'center',
        paddingTop: 14,       
        justifyContent: 'space-around',
    }, 
    
    inputArea: {
        flex: 2,
        borderRadius: 8,
        backgroundColor: 'rgb(100,100, 24)',
        margin: 5,
        justifyContent: 'space-around',
        width: Dimensions.get('window').width - 50,
        height: Dimensions.get('window').height ,
    },
    
    buttons: {
        flexDirection: "row",
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: "space-around",
    },

    buttonFrame: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 5,
        paddingLeft: 25,
        paddingRight: 25,
        padding: 9,
        borderColor: "white",
        borderWidth: 0.5, 
    },

    textButton: {
        fontWeight: "bold",
    },

    viewArea: {
        flex: 6, 
        borderRadius: 8,
        width: Dimensions.get('window').width - 10,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: "center",
    },

    scrollViewContainer: {
        borderRadius: 10,
        borderColor: 'yellow',
        borderWidth: 1, 
        padding: 5,
    },

    textArea: {
        borderColor: 'red',
        borderWidth: 9,
        borderRadius: 4,
        paddingLeft: 50,
    },

    counter: {
        justifyContent: "space-around",
        flexDirection: "row",
    },

    counterText: {
        fontStyle: "italic",
        fontSize: 23,
    }
});

