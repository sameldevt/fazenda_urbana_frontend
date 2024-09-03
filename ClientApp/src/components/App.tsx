import * as React from "react";
import * as Loadable from "react-loadable";
import { Route, Switch } from "react-router-dom";
import "~/components/App.css";
import AppContext from "~/components/AppContext";
import { Home } from "~/components/Home";
import Layout from "~/components/Layout";
import { Loading } from "~/components/Loading";
import NotFound from "~/components/NotFound";

const Counter = Loadable({
    loader: () => import("~/views/counter"),
    loading: Loading
});

const App = () => (
    <AppContext.Provider>
        <Layout>
            <Switch>
                <Route exact={true} path="/" component={Home} />
                <Route path="/counter" component={Counter} />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    </AppContext.Provider>
);

export default App;
