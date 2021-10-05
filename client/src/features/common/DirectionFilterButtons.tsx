import { Button } from "@material-ui/core";
import { ExchangeType } from "../../models/exchangeType";

export function DirectionFilterButtons(props: {
    directionFilter: ExchangeType,
    handleDirectionTypeFilter: (directionTypeFilter: ExchangeType) => void
}) {
    return(
            <div>
                <Button 
                    onClick={() => props.handleDirectionTypeFilter(ExchangeType.All)}
                    color={props.directionFilter === ExchangeType.All ? 'primary' : 'default'}
                    variant={props.directionFilter === ExchangeType.All ? 'outlined' : 'text'}
                    >All
                </Button>
                <Button 
                    onClick={() => props.handleDirectionTypeFilter(ExchangeType.Buy)}
                    color={props.directionFilter === ExchangeType.Buy ? 'primary' : 'default'}
                    variant={props.directionFilter === ExchangeType.Buy ? 'outlined' : 'text'}
                    >Buy
                </Button>
                <Button
                    onClick={() => props.handleDirectionTypeFilter(ExchangeType.Sell)}
                    color={props.directionFilter === ExchangeType.Sell ? 'primary' : 'default'}
                    variant={props.directionFilter === ExchangeType.Sell ? 'outlined' : 'text'}
                    >Sell
                </Button>
            </div>
    )
}