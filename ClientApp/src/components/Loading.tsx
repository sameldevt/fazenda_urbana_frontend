import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { LoadingComponentProps } from "react-loadable";
import { Alert } from "reactstrap";

const Error = () => (
    <span className="d-table w-100 h-100">
        <span className="d-table-cell align-middle text-center">
            <Alert color="danger">Something is wrong.</Alert>
        </span>
    </span>
);

const Loader = () => (
    <span className="d-table w-100 h-100">
        <span className="d-table-cell align-middle text-center">
            <FontAwesomeIcon spin={true} icon={faCircleNotch} />
        </span>
    </span>
);

const Loading = (props: LoadingComponentProps) => {
    if (props.error) {
        return <Error />;
    }

    if (props.pastDelay) {
        return <Loader />;
    }

    return null;
};

export { Error, Loader, Loading };
