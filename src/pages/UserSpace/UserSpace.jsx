import React from "react";
import { withUser } from "../../components/Auth/withUser";
import "./UserSpace.css"

const UserSpace = (props) => {
  return (
    <div className="UserSpace">
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
};

export default withUser(UserSpace);
