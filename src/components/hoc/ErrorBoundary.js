import { Component } from 'react'

class ErrorBoundary extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        //
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="alert alert-danger">
                    <h4>Wystąpił jakiś problem</h4>
                </div>
            )
        }
        return this.props.children;
    }
}


export default ErrorBoundary;