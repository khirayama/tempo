import * as React from 'react';

interface IProps {
  value: string;
  onBlur?(event: React.FormEvent<HTMLElement>): void;
  onChange?(event: React.FormEvent<HTMLElement>): void;
  onKeyUp?(event: React.KeyboardEvent<HTMLElement>): void;
}

export class EditableText extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div
        {...this.props}
        className="EditableText"
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={this.props.onBlur || this.onBlur}
        onInput={this.onInput}
      >
        {this.props.value}
      </div>
    );
  }

  public shouldComponentUpdate(): boolean {
    return false;
  }

  private onBlur(event: React.FormEvent<HTMLElement>): void {
    const value: string = event.currentTarget.innerText;
    if (value !== this.props.value) {
      this.emitChange(event);
    }
  }

  private onInput(event: React.FormEvent<HTMLElement>): void {
    const value: string = event.currentTarget.innerText;
    if (value !== this.props.value) {
      this.emitChange(event);
    }
  }

  private emitChange(event: React.FormEvent<HTMLElement>): void {
    const value: string = event.currentTarget.innerText;

    if (this.props.onChange) {
      (event.target as HTMLInputElement).value = value;
      (event.currentTarget as HTMLInputElement).value = value;
      this.props.onChange(event);
    }
  }
}
