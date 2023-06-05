namespace duice.plugin {

    export class CkeditorFactory extends ObjectElementFactory<HTMLElement> {

        /**
         * create element
         * @param htmlElement
         * @param bindData
         * @param context
         */
        override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): Ckeditor {
            return new Ckeditor(htmlElement, bindData, context);
        }

    }

    // register
    DataElementRegistry.register(`${duice.getNamespace()}-ckeditor`, new CkeditorFactory());

}