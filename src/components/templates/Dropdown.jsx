import React from "react";

const Dropdown = ({ title, options ,func }) => {
  return (
    <div className="select ">
      <select onChange={func} name="format" id="format" defaultValue="">
        <option value="" disabled>
          {title}
        </option>
        {options.map((o, index) => (
          <option key={index} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
