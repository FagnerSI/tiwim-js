import React from 'react';
import {
    Button,
    Tooltip,
} from 'antd';

const MyButton = (props) => {
    const { placement, tooltipTitle, btnTitle, btnType, onClick, ghost, icon, className } = props;
    return (
        <Tooltip placement={placement} title={tooltipTitle}>
            <Button
                type={btnType}
                className={className || ''}
                onClick={onClick}
                ghost={ghost}
                icon={icon}
            >
                {btnTitle}
            </Button>
        </Tooltip >
    )
};

export default MyButton;
