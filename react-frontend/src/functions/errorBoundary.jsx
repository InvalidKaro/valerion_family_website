import React, { Component } from 'react';
import '../styles/flyout.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
    this.setState({ error, errorInfo });
  }
  renderError() {
    return (
      <div className="flyout visible" style={{ backgroundColor: 'rgba(97, 0, 0, 0.81)', color: 'white' }}>
        <h2>Error: Something went wrong</h2>
        <p>{this.state.error && this.state.error.toString()}</p>
        <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorRenderer ? this.props.errorRenderer(this.state.error, this.state.errorInfo) : this.renderError();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;