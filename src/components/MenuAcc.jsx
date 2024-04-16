import React from "react";
import { Link } from "react-router-dom";

export default function MenuAcc() {
  return (
    <div class="left-sidebar">
      <h2>Account</h2>
      <div class="panel-group category-products" id="accordian">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title">
              <a href="/">account</a>
            </h4>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title">
              <Link to={`/user/myproduct`}>My product</Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
