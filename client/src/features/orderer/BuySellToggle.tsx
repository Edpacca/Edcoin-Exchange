import React, { MouseEventHandler } from 'react';

export function BuySellToggle(props: {isBuying: boolean, onClick: MouseEventHandler}) {
    
    return(
        <div className="toggle-buttons">
            <button className={getStyle(props.isBuying)} onClick={props.onClick}>BUY</button>
            <button className={getStyle(!props.isBuying)} onClick={props.onClick}>SELL</button>
        </div>
    )
}

function getStyle(isBuying: boolean) {
    const baseClass = "buysellbutton "
    return isBuying ? baseClass + "button-selected" : baseClass + "button-unselected";
}