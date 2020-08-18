import React from "react";


export const MyModal = function (props) {
  // change code below this line
  return (
    <div className="PastDue-Modal">
      <div className="PastDue-Modal-inner ">
        <h1 className="pastDueBalance bold">This is a modal of {props.countryName}</h1>
        <button type="button" class="close" aria-label="Close" onClick={()=>props.closeModal()}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  ); // change code above this line
};
