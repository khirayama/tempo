import * as React from 'react';

interface IProps {
  value: string;
  placeholder?: string;
  onBlur?(event: React.FormEvent<HTMLElement>): void;
  onFocus?(event: React.FormEvent<HTMLElement>): void;
  onChange?(event: React.FormEvent<HTMLElement>): void;
  onKeyDown?(event: React.KeyboardEvent<HTMLElement>): void;
  onKeyUp?(event: React.KeyboardEvent<HTMLElement>): void;
}

// TODO: 作り込む必要あり。shouldComponentUpdateが必要かも。キャレット位置問題

export class EditableText extends React.Component<IProps, { value: string }> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: this.props.value,
    };

    this.setValueToEvent = this.setValueToEvent.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className="EditableText">
        <div
          {...this.props}
          key="input"
          className="EditableText--Input"
          contentEditable
          suppressContentEditableWarning={true}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onBlur={this.props.onBlur || this.onBlur}
          onInput={this.onInput}
        >
          {this.state.value ? <span>{this.state.value}</span> : null}
        </div>
        {!this.state.value && this.props.placeholder ? (
          <span className="EditableText--Placeholder">{this.props.placeholder}</span>
        ) : null}
      </div>
    );
  }

  private onKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    this.setValueToEvent(event);
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  private onKeyUp(event: React.KeyboardEvent<HTMLElement>): void {
    this.setValueToEvent(event);
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  }

  private onBlur(event: React.FormEvent<HTMLElement>): void {
    const value: string = event.currentTarget.innerText;
    if (value !== this.props.value) {
      this.setValueToEvent(event);
      this.emitChange(event);
    }
  }

  private onInput(event: React.FormEvent<HTMLElement>): void {
    const value: string = event.currentTarget.innerText;
    this.setState({ value });
    if (value !== this.props.value) {
      this.setValueToEvent(event);
      this.emitChange(event);
    }
  }

  private emitChange(event: React.FormEvent<HTMLElement>): void {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  private setValueToEvent(event: React.SyntheticEvent<HTMLElement>): void {
    const value: string = event.currentTarget.innerText;
    (event.target as HTMLInputElement).value = value;
    (event.currentTarget as HTMLInputElement).value = value;
  }
}
