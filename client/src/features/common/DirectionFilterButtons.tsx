import { Button } from "@material-ui/core";
import { DirectionType } from "../../models/directionType";

export function DirectionFilterButtons(props: {
    directionFilter: DirectionType,
    handleDirectionTypeFilter: (directionTypeFilter: DirectionType) => void
}) {
    return(
            <div>
                <Button 
                    onClick={() => props.handleDirectionTypeFilter(DirectionType.All)}
                    color={props.directionFilter === DirectionType.All ? 'primary' : 'default'}
                    variant={props.directionFilter === DirectionType.All ? 'outlined' : 'text'}
                    >All
                </Button>
                <Button 
                    onClick={() => props.handleDirectionTypeFilter(DirectionType.Buy)}
                    color={props.directionFilter === DirectionType.Buy ? 'primary' : 'default'}
                    variant={props.directionFilter === DirectionType.Buy ? 'outlined' : 'text'}
                    >Buy
                </Button>
                <Button
                    onClick={() => props.handleDirectionTypeFilter(DirectionType.Sell)}
                    color={props.directionFilter === DirectionType.Sell ? 'primary' : 'default'}
                    variant={props.directionFilter === DirectionType.Sell ? 'outlined' : 'text'}
                    >Sell
                </Button>
            </div>
    )
}