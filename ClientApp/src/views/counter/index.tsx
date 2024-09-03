import * as React from "react";
import Counter from "~/views/counter/components/Counter";
import CounterContext from "~/views/counter/components/CounterContext";

export default () => (
    <CounterContext.Provider>
        <Counter />
    </CounterContext.Provider>
);
