declare var SimpleMDE: any;
declare var marked: any;
declare var Prism: any;

namespace duice.plugin {

    export class Simplemde extends duice.ObjectElement<HTMLElement> {

        simpleMde: any;

        constructor(element: HTMLElement, bindData: object, context: object) {
            super(element, bindData, context);

            // textarea
            let textarea = document.createElement('textarea');
            this.getHtmlElement().appendChild(textarea);

            // setting default config
            let config = {
                element: textarea,
                // autoDownloadFontAwesome: false,
                // previewRender: function(plainText:string):string {
                // 	return marked(plainText); // Returns HTML from a custom parser
                // },
                previewRender: function(plainText:string, preview:any):string { // Async method
                    preview.innerHTML = marked.parse(plainText);
                    preview.querySelectorAll('[class^=language-]').forEach(function(pre:HTMLElement){
                        console.debug(pre);
                        pre.classList.add('line-numbers');
                    });
                    // highlight
                    Prism.highlightAll();
                    return preview.innerHTML;
                },
                tabSize: 4,
                status: false,
                hideIcons: ['fullscreen','side-by-side'],
                renderingConfig: {
                    insertTexts: {
                        horizontalRule: ["", "\n\n-----\n\n"],
                        image: ["![](http://", ")"],
                        link: ["[", "](http://)"],
                        table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
                    },
                }
            }

            // creates simpleMDE
            this.simpleMde = new SimpleMDE(config);

            // add change listener
            this.simpleMde.codemirror.on('blur', () => {
                let event = new duice.event.PropertyChangeEvent(this, this.getProperty(), this.getValue(), this.getIndex());
                this.notifyObservers(event);
            }, true);
        }

        /**
         * set value
         * @param value
         */
        override setValue(value: any): void {
            if(!value) {
                value = '';
            }
            // checks value is changed
            if(value !== this.simpleMde.value()){
                // sets value
                this.simpleMde.value(value);
                // Fixes CodeMirror bug (#344) - refresh not working after value changed.
                let codemirror = this.simpleMde.codemirror;
                setTimeout(function() {
                    codemirror.refresh();
                }.bind(codemirror), 0);
            }
        }

        /**
         * return value
         */
        override getValue(): any {
            return this.simpleMde.value();
        }

    }

}

