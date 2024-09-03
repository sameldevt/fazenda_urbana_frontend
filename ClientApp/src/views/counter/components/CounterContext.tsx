import * as React from "react";

interface State {
    count: number;
    increment?: () => void;
    decrement?: () => void;
}

const initialState: State = { count: 0 };

const Context = React.createContext(initialState);

class Provider extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            ...initialState,
            increment: this.increment,
            decrement: this.decrement
        };
    }

    increment = () => this.setState((prevState) => ({ count: prevState.count + 1 }));
    decrement = () => this.setState((prevState) => ({ count: prevState.count - 1 }));

    render() {
        return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
    }
}

export default { Provider, Consumer: Context.Consumer };
