declare var CKEDITOR: any;
declare namespace duice.plugin {
    class Ckeditor extends duice.ObjectElement<HTMLElement> {
        ckeditor: any;
        constructor(htmlElement: HTMLElement, bindData: object, context: object);
        /**
         * set value
         * @param value
         */
        setValue(value: any): void;
        /**
         * return value
         */
        getValue(): any;
    }
}
declare namespace duice.plugin {
    class CkeditorFactory extends ObjectElementFactory<HTMLElement> {
        /**
         * create element
         * @param htmlElement
         * @param bindData
         * @param context
         */
        doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): Ckeditor;
    }
}
declare var SimpleMDE: any;
declare var marked: any;
declare var Prism: any;
declare namespace duice.plugin {
    class Marked extends duice.ObjectElement<HTMLElement> {
        div: HTMLDivElement;
        config: object;
        constructor(element: HTMLElement, bindData: object, context: object);
        /**
         * set value
         * @param value
         */
        setValue(value: any): void;
    }
}
declare namespace duice.plugin {
    class MarkedFactory extends ObjectElementFactory<HTMLElement> {
        /**
         * create element
         * @param htmlElement
         * @param bindData
         * @param context
         */
        doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): Marked;
    }
}
declare var SimpleMDE: any;
declare var marked: any;
declare var Prism: any;
declare namespace duice.plugin {
    class Simplemde extends duice.ObjectElement<HTMLElement> {
        simpleMde: any;
        constructor(element: HTMLElement, bindData: object, context: object);
        /**
         * set value
         * @param value
         */
        setValue(value: any): void;
        /**
         * return value
         */
        getValue(): any;
    }
}
declare namespace duice.plugin {
    class SimplemdeFactory extends ObjectElementFactory<HTMLElement> {
        /**
         * create element
         * @param htmlElement
         * @param bindData
         * @param context
         */
        doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): Simplemde;
    }
}
declare namespace duice.plugin {
}
