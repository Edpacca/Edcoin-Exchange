import { ChangeEventHandler } from 'react'
import './styles/dropdown.css';

export interface DropDownSelectProps {
    id: string;
    values: string[];
    onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const DropDownSelect = (props: DropDownSelectProps): JSX.Element => {
    return (
        <select 
            id={props.id}
            className={`dropdown ${props.id}`}
            onChange={props.onChange}
        >
            {props.values.map(value => 
            <option value={value} key={value}>
                {value}
            </option>)}
        </select>
    )
}