import React from 'react';
import {
    Button,
    Icon,
    Tooltip,
} from 'antd';

const MyButton = (props) => {
    const { placement, tooltipTitle, btnTitle, btnType, onClick, icon, ghost, styleComponent } = props;
    return (
        <Tooltip placement={placement} title={tooltipTitle}>
            <Button
                type={btnType}
                className={styleComponent || ''}
                onClick={onClick}
                ghost={ghost}
            >
                <Icon type={icon} />
                {btnTitle}
            </Button>
        </Tooltip >
    )
};

export default MyButton;
