import React from 'react';

export default function Popup(props) {
  return (props.trigger) ? (
    <div className='popup-admin'>
      <div className='popup-inner'>
        <i id='popup-colse-btn-notify' class="fa-solid fa-xmark" onClick={() => props.setTrigger(false)}></i>
        {props.children}
      </div>
    </div>
  ) : "";
}
