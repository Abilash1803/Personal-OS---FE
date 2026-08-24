import React from 'react';
import { Layers, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('PersonalOS ErrorBoundary caught an exception:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 select-none font-sans">
          <div className="max-w-md w-full bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center space-y-5 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
              <Layers className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">
                Something went wrong
              </h2>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Your PersonalOS data is safely stored locally. Click below to recover your session.
              </p>
            </div>

            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-xl transition-all shadow-sm shadow-blue-500/20 w-full"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Recover Session</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
