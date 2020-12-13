import React, { Component } from 'react';
import { Button } from 'antd';
import './Footer.css';
import 'antd/dist/antd.css';


export default class FooterProject extends Component {
    render() {
        const { okText, onOk, okDisabled, hidePrevious, onPrevious } = this.props;

        return (
            <div className="container">
                <Button
                    type={"primary"}
                    disabled={okDisabled}
                    onClick={onOk}
                >
                    {okText || 'Proxímo'}
                </Button>
                {
                    !hidePrevious &&
                    <Button
                        onClick={onPrevious}
                        className="btn">
                        Anterior
                    </Button>
                }
            </div>
        )
    }
}