// tslint:disable
import * as classNames from 'classnames';
import * as React from 'react';
import * as uuid from 'uuid/v4';

import { Container, IContainerProps } from 'presentations/containers/Container';
import { Link } from 'router/Link';
import { IItem, IPaper, IState, ITextItem, IUI } from 'state/state';

const keyCodes: {[key: string]: number} = {
  DELETE: 8,
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  UP: 38,
  DOWN: 40,
  B: 66,
};

/*
Styles
- Background Color
- Bold
- Color
- Font
- Inline Code
- Italic
- Link
- Size
- Strikethrough
- Underline

Block
- Paragraph
*/

/* Type and Interface */
interface ITextNode {
  key: string;
  object: 'text';
  value: string;
}

interface IInlineNode {
  key: string;
  object: 'inline';
  styles: IStyle[];
  textNode: ITextNode;
}

interface IStyle {
  type: string;
  value?: string;
}

interface IBlockNode {
  key: string;
  object: 'block';
  nodes: (ITextNode|IInlineNode)[];
}

interface IParagraphBlock extends IBlockNode {
  type: 'paragraph';
}

interface IDoc {
  key: string;
  name: string;
  nodes: IParagraphBlock[];
}

/* State */
const state: IDoc = {
  key: uuid(),
  name: 'Sample Doc',
  nodes: [{
    key: uuid(),
    object: 'block',
    type: 'paragraph',
    nodes: [{
      key: uuid(),
      object: 'text',
      value: 'Sample ',
    }, {
      key: uuid(),
      object: 'inline',
      styles: [{
        type: 'bold',
      }],
      textNode: {
        key: uuid(),
        object: 'text',
        value: 'Text ',
      },
    }, {
      key: uuid(),
      object: 'text',
      value: 'paragraph',
    }],
  }],
};

/* Components */
export class TextNode extends React.Component<any, any> {
  public render(): string {
    const node: ITextNode = this.props.node;

    return node.value;
  }
}

export class ParagraphBlock extends React.Component<{ paragraph: IParagraphBlock }, any> {
  private ref: React.RefObject<any>;
  private childRefs: {[key: string]: React.RefObject<any>}

  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.childRefs = {};
  }

  public render(): JSX.Element {
    const paragraph: IParagraphBlock = this.props.paragraph;

    return (
      <p
        data-key={paragraph.key}
        contentEditable
        suppressContentEditableWarning={true}
        ref={this.ref}
        onKeyDown={(event: any) => {
          const keyCode: number = event.keyCode;
          const meta: boolean = event.metaKey;

          if (keyCode === keyCodes.B && meta) {
            event.preventDefault();
            console.log('to bold');
            const selection: Selection = window.getSelection();
            console.log(selection);
            const startElement: any = selection.anchorNode.parentNode;
            const endElement: any = selection.focusNode.parentNode;
            console.log(startElement, endElement);
          }
        }}
      >{paragraph.nodes.map((node: (ITextNode|IInlineNode)) => {
        const ref: React.RefObject<any> = React.createRef();
        this.childRefs[node.key] = ref;

        if (node.object === 'text') {
          return <TextNode ref={ref} key={node.key} node={node} />;
        } else {
          return (
            <span
              ref={ref}
              data-key={node.key}
              key={node.key}
              className={node.styles.map((style: IStyle) => style.type).join(' ')}
            ><TextNode node={node.textNode} /></span>
          );
        }
      })}</p>
    );
  }
}

export class Doc extends React.Component<{ doc: IDoc }, any> {
  public render(): JSX.Element {
    const doc: IDoc = this.props.doc;

    return (
      <div className="Doc">
        {doc.nodes.map((node: IParagraphBlock) => {
          return <ParagraphBlock key={node.key} paragraph={node} />;
        })}
      </div>
    );
  }
}

export class EditorPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      doc: state,
    };
  }
  public render(): JSX.Element {
    return (
      <Doc doc={this.state.doc} />
    );
  }
}
