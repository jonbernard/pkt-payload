import escapeHTML from 'escape-html';
import { IS_BOLD, IS_ITALIC, IS_STRIKETHROUGH, IS_UNDERLINE, IS_CODE, IS_SUBSCRIPT, IS_SUPERSCRIPT } from './RichTextNodeFormat';
import type { SerializedLexicalNode } from './types';
import { isNumber } from 'lodash';

function getLinkForPage(doc?: { relationTo: string; value: { slug: string } }) {
  if (!doc) {
    return;
  }
  if (doc.relationTo === 'posts') {
    return `/posts/${doc.value.slug}`;
  }
  return;
}

export function serialize(children: SerializedLexicalNode[], parentType?: string): string[] {
  return children
    .map((node): string | null => {
      if (node.type === 'text') {
        //isText
        let text = `${escapeHTML(node.text)}`;

        if (isNumber(node.format) && node.format & IS_BOLD) {
          text = `<strong>${text}</strong>`;
        }
        if (isNumber(node.format) && node.format & IS_ITALIC) {
          text = `<em>${text}</em>`;
        }

        if (isNumber(node.format) && node.format & IS_STRIKETHROUGH) {
          text = `<span class="line-through">${text}</span>`;
        }

        if (isNumber(node.format) && node.format & IS_UNDERLINE) {
          text = `<span class="underline">${text}</span>`;
        }

        if (isNumber(node.format) && node.format & IS_CODE) {
          text = `<code>${text}</code>`;
        }

        if (isNumber(node.format) && node.format & IS_SUBSCRIPT) {
          text = `<sub>${text}</sub>`;
        }

        if (isNumber(node.format) && node.format & IS_SUPERSCRIPT) {
          text = `<sup>${text}</sup>`;
        }

        return `${text}`;
      }

      if (!node) {
        return null;
      }

      const serializedChildren = node.children ? serialize(node.children, node.listType || node.type).join('') : null;

      switch (node.type) {
        case 'linebreak':
          return `<br>`;
        case 'link':
          // eslint-disable-next-line no-case-declarations
          const attributes: {
            doc?: { relationTo: string; value: { slug: string } };
            linkType?: 'custom' | 'internal';
            newTab?: boolean;
            nofollow?: boolean;
            rel?: string;
            sponsored?: boolean;
            url?: string;
          } = node.fields;

          if (!attributes) return '';

          if (attributes?.linkType === 'custom') {
            return `<a href="${attributes.url}"${attributes.newTab ? ' target=_"blank"' : ''} rel="${attributes?.rel ?? ''}${
              attributes?.sponsored ? ' sponsored' : ''
            }${attributes?.nofollow ? ' nofollow' : ''}">${serializedChildren}</a>`;
          }

          return `<a href="${getLinkForPage(attributes.doc)}"${attributes.newTab ? ' target=_"blank"' : ''} rel="${attributes?.rel ?? ''}${
            attributes?.sponsored ? ' sponsored' : ''
          }${attributes?.nofollow ? ' nofollow' : ''}">${serializedChildren}</a>`; //TODO: Check doc link handling
        case 'list': //TODO handle properly, especially nested lists
          if (node.listType === 'check') {
            return `
						<ul class="mb-4">
              ${serializedChildren}
						</ul>`;
          }
          if (node.listType === 'bullet') {
            return `
						<ul class="list-disc mb-4 pl-8">
              ${serializedChildren}
						</ul>`;
          }

          return `
          <ol class="list-disc mb-4 pl-8">
            ${serializedChildren}
          </ol>`;
        case 'listitem':
          if (parentType === 'check') {
            return `
            <li>
              <input type="checkbox" id="${serializedChildren}" ${node.checked ? 'checked' : ''} />
              <label for="${serializedChildren}">${serializedChildren}</label>
            </li>`;
          }
          return `
						<li>
              ${serializedChildren}
						</li>`;
        case 'heading':
          return `
								<${node.tag}>
                  ${serializedChildren}
								</${node.tag}>`;
        default: //Probably just a normal paragraph
          return `<p>${serializedChildren ? serializedChildren : '<br>'}</p>`;
      }
    })
    .filter((node) => node !== null) as string[];
}
