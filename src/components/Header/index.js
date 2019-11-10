import React, { Component } from 'react';
import { Button } from '~/components';

import './style.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <span>TiWIM</span>
                <Button
                    placement="bottomRight"
                    tooltipTitle="Configurações"
                    btnType="primary"
                    styleComponent="btn-primary"
                    icon="user"
                />
            </div>
        )
    }

}
