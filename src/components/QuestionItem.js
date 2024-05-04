import React from "react";

function QuestionItem({question, onDelete, onAnswerUpdate}) {
  const { id, prompt, correctIndex, answers} = question;

  //add handle delete on delete button
function handleDeleteClick(){
  fetch(`http://localhost:4000/questions/${question.id}`, {
    method: "DELETE",
  })
    .then((r) => r.json())
    //send the deleted question up to the questionList with onDelete call back
    .then(() => onDelete(question))
}
//add handle change to the select dropdown
function handleAnswerChange(event){
  //target the new index
const newCorrectIndex= event.target.value
  fetch(`http://localhost:4000/questions/${question.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correctIndex: newCorrectIndex
    }),
  })
    .then((r) => r.json())
    //send updated question to the Questions List with cb function
    .then((updatedQuestion) => onAnswerUpdate(updatedQuestion));

}

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{
answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
    ))}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
