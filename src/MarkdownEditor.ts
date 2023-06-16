declare var CodeMirror: any;

namespace duice.extension {

    export class MarkdownEditor extends duice.ObjectElement<HTMLElement> {

        codeMirror: any;

        toolbar: HTMLDivElement;

        /**
         * constructor
         * @param element
         * @param bindData
         * @param context
         */
        constructor(element: HTMLElement, bindData: object, context: object) {
            super(element, bindData, context);
            this.getHtmlElement().style.display = 'block';

            // config
            let config = {
                mode: 'markdown',
                lineNumbers: true,
                theme: "default",
                extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
            };

            // textarea
            let textarea = document.createElement('textarea');
            this.getHtmlElement().appendChild(textarea);

            // create code mirror
            this.codeMirror = CodeMirror.fromTextArea(textarea, config);

            // add change event listener
            this.codeMirror.on("blur",() => {
                let event = new duice.event.PropertyChangeEvent(this, this.getProperty(), this.getValue(), this.getIndex());
                this.notifyObservers(event);
            });
        }

        /**
         * create toolbar
         */
        createToolbar(): void {

        }

        /**
         * set value
         * @param value
         */
        override setValue(value: any): void {
            if(!value) {
                value = '';
            }
            this.codeMirror.doc.setValue(value);
        }

        /**
         * return value
         */
        override getValue(): any {
            let value = this.codeMirror.doc.getValue();
            if(!value) {
                return null;
            }
            return value;
        }

    }

    /**
     * MarkdownEditorFactory
     */
    export class MarkdownEditorFactory extends ObjectElementFactory<HTMLElement> {

        /**
         * create element
         * @param htmlElement
         * @param bindData
         * @param context
         */
        override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): MarkdownEditor {
            return new MarkdownEditor(htmlElement, bindData, context);
        }

    }

    // register
    DataElementRegistry.register(`${duice.getNamespace()}-markdown-editor`, new MarkdownEditorFactory());

}

