namespace duice.plugin {

    export class MarkedFactory extends ObjectElementFactory<HTMLElement> {

        /**
         * create element
         * @param htmlElement
         * @param bindData
         * @param context
         */
        override doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): Marked {
            return new Marked(htmlElement, bindData, context);
        }

    }

    // register
    DataElementRegistry.register(`${duice.getNamespace()}-marked`, new MarkedFactory());

}