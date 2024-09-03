import * as React from "react";
import { Container } from "reactstrap";
import AppNavbar from "~/components/AppNavbar";

class Layout extends React.Component {
    render() {
        return (
            <div id="Layout">
                <header>
                    <AppNavbar />
                </header>
                <main className="text-center">
                    <Container>{this.props.children}</Container>
                </main>
                <footer className="text-center">
                    <Container>
                        <strong>SPA Rocks!</strong> by <a
                            href="https://github.com/eyamenko"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Eugene Yamenko
                        </a>. The source code is licensed <a
                            href="https://opensource.org/licenses/mit-license.php"
                            target="_blank"
                            rel="noopener noreferrer license"
                        >
                            MIT
                        </a>.
                    </Container>
                </footer>
            </div>
        );
    }
}

export default Layout;
