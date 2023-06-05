namespace duice.plugin {

    export class SimplemdeFactory extends ObjectElementFactory<HTMLElement> {

        /**
         * create element
         * @param htmlElement
         * @param bindData
         * @param context
         */
        override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): Simplemde {
            return new Simplemde(htmlElement, bindData, context);
        }

    }

    // register
    DataElementRegistry.register(`${duice.getNamespace()}-simplemde`, new SimplemdeFactory());

}