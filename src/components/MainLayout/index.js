import React, { Component } from 'react';
import './style.css';
import 'antd/dist/antd.css';

class MainLayout extends Component {

  render() {
    const { leftHeader, leftChild, rightHeader, rightChild } = this.props;
    return (
      <div className="container">
        <div className="left-container">
          <div className="left-header">
            {leftHeader}
          </div>
          <div className="left-child">
            {leftChild}
          </div>
        </div>
        <div className="right-container">
          <div className="rigth-header">
            {rightHeader}
          </div>
          <div className="right-child">
            {rightChild}
          </div>
        </div>
      </div>
    );
  }
}
export default MainLayout;