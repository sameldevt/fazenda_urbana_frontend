import * as React from "react";
import * as ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import App from "~/components/App";

it("renders without crashing", () => {
    const container = document.createElement("div");

    ReactDOM.render(
        <MemoryRouter>
            <App />
        </MemoryRouter>,
        container
    );

    ReactDOM.unmountComponentAtNode(container);
});
