// tslint:disable:no-any
import * as React from 'react';

export class EditableText extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  public render(): JSX.Element {
    const style: any = {
      userSelect: 'text',
      WebkitUserSelect: 'text',
    };

    return (
      <div
        className="EditableText"
        style={style}
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={this.props.Blur || this.onBlur}
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
