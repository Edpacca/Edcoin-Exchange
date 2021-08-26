import React, { useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';

export function BuySellToggle() {
    
    return (
        <div>
            <ButtonGroup>
                <Button>BUY</Button>
                <Button>SELL</Button>
            </ButtonGroup>
        </div>
    )
}