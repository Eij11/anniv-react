import React, { useRef, useState, useEffect } from "react";

import { IoCloseSharp } from "react-icons/io5";

import "./messageModal.css";

const MessageModal = (props) => {
  const modalRef = useRef(null);

  const handleClose = (e) => {
    // Close modal if click occurs outside the `popup-inner` div
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      props.setTrigger(false);
    }
  };

  return props.trigger ? (
    <div className="pop-up" onClick={handleClose}>
      <div className="popup-inner" ref={modalRef}>
        <IoCloseSharp
          className="close-icon fs-2"
          onClick={() => props.setTrigger(false)}
        />

        <div>
          <h3>Happy Anniversary Honhon!</h3>

          <p>
            From the moment I confessed my love for you, from the moment that is
            today. I really am grateful for you sticking around.
          </p>

          <p>
            Even though we weren't able to meet today. I do hope for the coming
            days we'll be able to do so. I want to experience things with you
            more. 
          </p>

          <p>
            We still have to go to that staycation; we haven't eaten my fried
            mushrooms; we haven't gone swimming to Nambalan.
          </p>

          <p>
            'Because of you, I have become one'; it's not an exaggeration to say
            that you complete me. As we achieved this milestone, I hope we, from
            now on, would create more memories together.
          </p>

          <p>With all my love, Eljon Pogi</p>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default MessageModal;
