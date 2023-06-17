declare var SimpleMDE: any;
declare var marked: any;
declare var Prism: any;

namespace duice.extension {

    export class MarkdownViewer extends duice.ObjectElement<HTMLElement> {

        div: HTMLDivElement;

        config: object;

        /**
         * constructor
         * @param element
         * @param bindData
         * @param context
         */
        constructor(element: HTMLElement, bindData: object, context: object) {
            super(element, bindData, context);

            // creates child div
            this.div = document.createElement('div');
            this.getHtmlElement().appendChild(this.div);

            // config
            this.config = {
                headerIds: false,
                mangle: false,
                breaks: true,
                gfm: true
            }
        }

        /**
         * set value
         * @param value
         */
        override setValue(value: any): void {
            value = value ? value : '';
            value = marked.parse(value, this.config);
            this.div.innerHTML = value;
            this.div.querySelectorAll('[class^=language-]').forEach(function(pre:Element){
                pre.classList.add('line-numbers');
            });
            // highlight
            Prism.highlightAll();
        }

    }

    export class MarkdownViewerFactory extends ObjectElementFactory<HTMLElement> {

        /**
         * create element
         * @param htmlElement
         * @param bindData
         * @param context
         */
        override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): MarkdownViewer {
            return new MarkdownViewer(htmlElement, bindData, context);
        }

    }

    // register
    DataElementRegistry.register(`${duice.getNamespace()}-markdown-viewer`, new MarkdownViewerFactory());

}

