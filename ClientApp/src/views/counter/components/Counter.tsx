import * as React from "react";
import { Button, ButtonGroup } from "reactstrap";
import CounterContext from "~/views/counter/components/CounterContext";

interface CouterInterface {
    count: number;
    increment?: () => void;
    decrement?: () => void;
}

const Counter = ({ count, decrement, increment }: CouterInterface) => (
    <div>
        <div>{count}</div>
        <ButtonGroup>
            <Button className="btn-secondary" onClick={increment}>
                increment
            </Button>
            <Button className="btn-secondary" onClick={decrement}>
                decrement
            </Button>
        </ButtonGroup>
    </div>
);

export default () => (
    <CounterContext.Consumer>
        {(counter) => <Counter {...counter} />}
    </CounterContext.Consumer>
);
