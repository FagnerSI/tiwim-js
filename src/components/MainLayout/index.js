import React from 'react';
import { Spin, } from 'antd';
import './style.css';
import 'antd/dist/antd.css';

function MainLayout(props) {
  const { leftHeader, leftChild, rightHeader, rightChild, loading } = props;

  return (
    <>
      {
        loading
          ? (
            <div className="load-container" >
              <Spin size="large" />
            </div>
          )
          :
          (
            <div className="main-container">
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
          )
      }
    </>
  );
}
export default MainLayout;