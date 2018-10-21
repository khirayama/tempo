// tslint:disable
import * as classNames from 'classnames';
import * as React from 'react';

import { Container, IContainerProps } from 'presentations/containers/Container';
import { Link } from 'router/Link';
import { IItem, IPaper, IState, ITextItem, IUI } from 'state/state';

/*
- keydown/keypress/keyupの差異
- input/changeの差異
- caretの取得方法
- selectionの操作方法
- 日本語入力
- html挿入時の問題
*/

function LogTable(props: { logs: string[][] }): JSX.Element {
  const logs: string[][] = props.logs;

  return (
    <table className="LogTable">
      <thead>
        <tr>
          <th>event</th>
          <th>keyCode</th>
          <th>value</th>
          <th>innerText</th>
          <th>innerHTML</th>
          <th>el.sectionStart</th>
          <th>el.sectionEnd</th>
          <th>window.getSelection().anchorOffset</th>
          <th>window.getSelection().focusOffset</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log: string[], index: number) => {
          return (
            <tr key={index}>
              {log.map((val: string | number, i: number) => {
                if (val || val === 0) {
                  return <td key={i}>{val}</td>;
                }
                return (
                  <td key={i}>
                    <span className="empty">undefined</span>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function clearLogs(): void {
  this.setState({
    logs: [],
  });
}

function logger(event: any): void {
  const values: string[] = [
    event.type,
    event.keyCode,
    event.currentTarget.value,
    event.currentTarget.innerText,
    event.currentTarget.innerHTML,
    event.currentTarget.selectionStart,
    event.currentTarget.selectionEnd,
    window.getSelection().anchorOffset,
    window.getSelection().focusOffset,
  ];
  const logs: string[][] = this.state.logs;
  logs.push(values);
  this.setState({
    logs,
  });
}

// Components
class ContentEditableComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      logs: [],
    };
  }

  public render(): JSX.Element {
    return (
      <>
        <div
          className="ContentEditableComponent"
          contentEditable
          onKeyDown={logger.bind(this)}
          onKeyPress={logger.bind(this)}
          onKeyUp={logger.bind(this)}
          onInput={logger.bind(this)}
          onChange={logger.bind(this)}
          onFocus={logger.bind(this)}
          onBlur={logger.bind(this)}
        />
        <button onClick={clearLogs.bind(this)}>CLEAR LOG</button>
        <button
          onClick={() => {
            const el: HTMLElement | null = document.querySelector('.ContentEditableComponent');
            if (el) {
              el.focus();
            }
          }}
        >
          FORCE FOCUS
        </button>
        <LogTable logs={this.state.logs} />
      </>
    );
  }
}

class WrappedContentEditableComponent extends React.Component<any, any> {
  private tmp: any;

  constructor(props: any) {
    super(props);

    this.state = {
      value: '',
      logs: [],
    };

    this.tmp = {
      ref: React.createRef(),
      isPressing: false,
    };
  }

  public componentDidUpdate(prevProps: any, prevState: any): void {
    console.log('componentDidUpdate');
    console.log(prevState, this.state);
  }

  public shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    console.log('shouldComponentUpdate');
    console.log(this.state, nextState);

    if (this.tmp.isPressing) {
      return false;
    }

    console.log(this.state.value, this.tmp.ref.current.innerHTML);

    return true;
  }

  public render(): JSX.Element {
    return (
      <>
        <div
          className="WrappedContentEditableComponent"
          contentEditable
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: this.state.value }}
          ref={this.tmp.ref}
          onKeyDown={(event: any) => {
            logger.bind(this)(event);
            this.tmp.isPressing = true;
          }}
          onKeyPress={logger.bind(this)}
          onInput={(event: any) => {
            logger.bind(this)(event);
            this.setState({
              value: event.currentTarget.innerHTML,
            });
          }}
          onKeyUp={(event: any) => {
            logger.bind(this)(event);
            this.tmp.isPressing = false;
          }}
          onChange={logger.bind(this)}
          onFocus={logger.bind(this)}
          onBlur={logger.bind(this)}
        />
        <button onClick={clearLogs.bind(this)}>CLEAR LOG</button>
        <button
          onClick={() => {
            const el: HTMLElement | null = document.querySelector('.WrappedContentEditableComponent');
            if (el) {
              el.focus();
            }
          }}
        >
          FORCE FOCUS
        </button>
        <LogTable logs={this.state.logs} />
      </>
    );
  }
}

class InputComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      logs: [],
    };
  }

  public render(): JSX.Element {
    return (
      <>
        <input
          className="InputComponent"
          onKeyDown={logger.bind(this)}
          onKeyPress={logger.bind(this)}
          onKeyUp={logger.bind(this)}
          onInput={logger.bind(this)}
          onChange={logger.bind(this)}
          onFocus={logger.bind(this)}
          onBlur={logger.bind(this)}
        />
        <button onClick={clearLogs.bind(this)}>CLEAR LOG</button>
        <button
          onClick={() => {
            const el: HTMLElement | null = document.querySelector('.InputComponent');
            if (el) {
              el.focus();
            }
          }}
        >
          FORCE FOCUS
        </button>
        <LogTable logs={this.state.logs} />
      </>
    );
  }
}

class WrappedInputComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: '',
      logs: [],
    };
  }

  public render(): JSX.Element {
    return (
      <>
        <input
          className="WrappedInputComponent"
          onKeyDown={logger.bind(this)}
          onKeyPress={logger.bind(this)}
          onKeyUp={logger.bind(this)}
          onInput={(event: any) => {
            logger.bind(this)(event);
            this.setState({
              value: event.currentTarget.value,
            });
          }}
          onChange={logger.bind(this)}
          onFocus={logger.bind(this)}
          onBlur={logger.bind(this)}
          value={this.state.value}
        />
        <button onClick={clearLogs.bind(this)}>CLEAR LOG</button>
        <button
          onClick={() => {
            const el: HTMLElement | null = document.querySelector('.WrappedInputComponent');
            if (el) {
              el.focus();
            }
          }}
        >
          FORCE FOCUS
        </button>
        <LogTable logs={this.state.logs} />
      </>
    );
  }
}

export class WorkaroundPage extends Container<{}, IState> {
  public render(): JSX.Element {
    return (
      <div className="WorkaroundPage">
        <h2>WORKAROUND - Pure ContentEditable and Input</h2>
        <div className="WorkaroundPage--Column">
          <ContentEditableComponent />
        </div>
        <div className="WorkaroundPage--Column">
          <InputComponent />
        </div>
        <h2>WORKAROUND - Wrapped ContentEditable and Input</h2>
        <div className="WorkaroundPage--Column">
          <WrappedContentEditableComponent />
        </div>
        <div className="WorkaroundPage--Column">
          <WrappedInputComponent />
        </div>
      </div>
    );
  }
}
