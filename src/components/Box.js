import { useState } from "react";

export default function Box({ isOpenDefault = false, children }) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
