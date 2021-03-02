import React, { Component } from 'react';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDisabled: true
        }
    }

    toggleShowHide = () => {
        this.setState(state => ({ isDisplayed: !state.isDisplayed }))
        // this.setState(state=>({
        //     isDisabled:!isDisabled
        // })
    }



    render() {
        const Hello = 'Hello from basic component.'

        return (
            <>
                <button onClick={this.toogleShowHide} type="button">Pokaż/Ukryj</button>
                {/* {this.state.isDisplayed ? <HelloReact1 hello={Hello} /> : null} */}
                <HelloReact1 hello={Hello} idDisplayed={this.state.isDisplayed} />
                <HelloReact1 hello={Hello} />
                <HelloReact2 hello={{ text: "Witam z komponentu funkcyjnego :)" }} />
            </>
        )
    }
}

class HelloReact1 extends Component {
    render() {
        return (
            <div>
                <h1> {this.props.hello}</h1>
            </div>
        )
    }
}

const HelloReact2 = ({ hello, isDisplayed }) => {
    return (
        isDisplayed ? <h1>{hello}</h1> : null
    )
}

export default App