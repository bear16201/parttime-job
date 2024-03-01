import React from 'react';

export default function PopupAdmin(props) {
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        <i id='popup-colse-btn' class="fa-solid fa-xmark" onClick={() => props.setTrigger(false)}></i>
        {props.children}
      </div>
    </div>
  ) : "";
}
