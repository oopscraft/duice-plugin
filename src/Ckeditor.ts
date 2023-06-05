declare var CKEDITOR:any;

namespace duice.plugin {

    export class Ckeditor extends duice.ObjectElement<HTMLElement> {

        ckeditor: any;

        constructor(htmlElement: HTMLElement, bindData: object, context: object) {
            super(htmlElement, bindData, context);

            // config
            let config = {};
            if(hasElementAttribute(htmlElement,'config')){
                config = JSON.parse(getElementAttribute(htmlElement,'config').replace(/'/g, '"'));
            }

            // create ckeditor
            let textarea = document.createElement('textarea');
            this.getHtmlElement().appendChild(textarea);
            this.ckeditor = CKEDITOR.replace(textarea, config);

            // adds change event listener
            this.ckeditor.on('blur', () => {
                let event = new duice.event.PropertyChangeEvent(this, this.getProperty(), this.getValue(), this.getIndex());
                this.notifyObservers(event);
            }, true);
        }

        /**
         * set value
         * @param value
         */
        override setValue(value: any): void {
            value = value ? value : '';
            this.ckeditor.setData(value);
        }

        /**
         * return value
         */
        override getValue(): any {
            return this.ckeditor.getData();
        }

    }

}
