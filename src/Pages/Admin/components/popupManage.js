import React from 'react';

export default function PopupManage(props) {
  return (props.trigger) ? (
    <div className='popup-admin-contact'>
      <div className='popup-inner-manage'>
        <i id='popup-colse-btn-contact' class="fa-solid fa-xmark" onClick={() => props.setTrigger(false)}></i>
        {props.children}
      </div>
    </div>
  ) : "";
}
