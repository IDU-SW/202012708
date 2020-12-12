import React, {Component} from 'react';

class DarkMode extends Component {
    state = {
        checked: localStorage.getItem("theme") === "dark"
            ? true
            : false,
        theme: localStorage.getItem("theme")
    };

    componentDidMount() {
        document
            .getElementsByClassName("calculator-body")[0]
            .setAttribute("data-theme", localStorage.getItem("theme"));
    }

    toggleThemeChange = () => {
        const {checked} = this.state;
        if (checked === false) {
            localStorage.setItem("theme", "dark");
            document
                .getElementsByClassName("calculator-body")[0]
                .setAttribute("data-theme", localStorage.getItem("theme"));
            this.setState({
                checked: true
            });
        } else {
            localStorage.setItem("theme", "light");
            document
                .getElementsByClassName("calculator-body")[0]
                .setAttribute("data-theme", localStorage.getItem("theme"));
            this.setState({
                checked: false
            });
        }
    };

    render() {
        return (
            <label className="switch">
                <input type="checkbox" defaultChecked={this.state.checked} onChange={() => this.toggleThemeChange()} />
                <span className="slider round"></span>
            </label>
        );
    }
}

export default DarkMode;