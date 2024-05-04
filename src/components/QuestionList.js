import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  //create state to control the fetched list
const [list, setList] = useState([])

//fetch the data with GET
useEffect(()=> {
  fetch('http://localhost:4000/questions')
  .then((r) => r.json())
  //setState with the newly fetched data
  .then((list) => setList(list));
}, [])

function handleUpdateAnswer(updatedAnswer) {
  const newAnswer = list.map((question) => {
    if (question.id === updatedAnswer.id) {
      return updatedAnswer;
    } else {
      return question;
    }
  });
  setList(newAnswer);
}


function handleDelete(deleted) {
  //create variable for new list after delete
  const updatedList = list.filter((question)=> question.id !== deleted.id)
  //update state with new list on the dom
  setList(updatedList)
}


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {list.map((question)=> (
        <QuestionItem key={question.id} question={question} onDelete={handleDelete} onAnswerUpdate={handleUpdateAnswer}/>
      ))}
      </ul>
    </section>
  );
}

export default QuestionList;
