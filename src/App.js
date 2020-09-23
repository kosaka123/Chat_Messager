import React, { useState, useEffect } from "react";
import { FormControl, Input } from "@material-ui/core";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  //useState=variable in React
  //useEffect=run code on a condition in React
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  /*{username:'ong',message:'hi'},
    {username:'lim',message:'hello'}{} means object*/
  const [username, setUsername] = useState("");

  //useState=variable in REACT
  //useEffect=run code on a condition in REACT

  useEffect(() => {
    //get firebase in messages
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        /*if any changes run below code*/ (snapshot) => {
          //get inside firebase messages of document data , docs are all document ,
          //doc is once document
          //doc.data is inside document data  like {username:'',text:''}
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
          );
        }
      );
  }, []);

  useEffect(() => {
    //run code
    //if its blank inside[],this code runs ONCE when the app component loads
    //if we have a variable like input,it runs every time input change
    setUsername(prompt("PLease insert your name:"));
  }, []); //condition

  const sendMessage = (event) => {
    event.preventDefault(); //stop refresh
    //all the logic to send a message goes
    //send data to firebase of database
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    //setMessages([...messages,{username:username,text:input}]);//keep print all messages array and  value
    setInput(""); //input to be blank
  };

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1>haha</h1>
      <h2>Welcome {username}</h2>

      <form className="app_form">
        <FormControl className="app_formControl">
          <Input
            className="app_input"
            placeholder="Enter a message..."
            value={input}
            /*cannot input any word*/ onChange={(event) =>
              setInput(event.target.value)
            }
          />
          <IconButton
            className="app_iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {/*messages theme*/}
        {messages.map((
          { id, message } //.map is select all array value inside of message
        ) => (
          <Message
            key={id}
            /*id=in firebase database of document*/ username={username}
            message={message}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
