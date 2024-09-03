import * as React from "react";

interface State {
    isNavbarOpen: boolean;
    toggleNavbar?: () => void;
}

const initialState: State = { isNavbarOpen: false };

const Context = React.createContext(initialState);

class Provider extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            ...initialState,
            toggleNavbar: this.toggleNavbar
        };
    }

    toggleNavbar = () => this.setState((prevState) => ({ isNavbarOpen: !prevState.isNavbarOpen }));

    render() {
        return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
    }
}

export default { Provider, Consumer: Context.Consumer };
