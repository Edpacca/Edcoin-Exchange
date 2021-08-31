import React, { MouseEventHandler } from 'react';
import { ButtonGroup } from '@material-ui/core';

export function BuySellToggle(props: {isBuying: boolean, onClick: MouseEventHandler}) {
    
    return(
        <div>
            <ButtonGroup>
                <button className={getStyle(props.isBuying)} onClick={props.onClick}>BUY</button>
                <button className={getStyle(!props.isBuying)} onClick={props.onClick}>SELL</button>
            </ButtonGroup>
        </div>
    )
}

function getStyle(isBuying: boolean) {
    const baseClass = "buysellbutton "
    return isBuying ? baseClass + "button-selected" : baseClass + "button-unselected";
}