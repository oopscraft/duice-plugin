declare namespace duice.extension {
}
declare var CodeMirror: any;
declare namespace duice.extension {
    class MarkdownEditor extends duice.ObjectElement<HTMLElement> {
        codeMirror: any;
        toolbar: HTMLDivElement;
        /**
         * constructor
         * @param element
         * @param bindData
         * @param context
         */
        constructor(element: HTMLElement, bindData: object, context: object);
        /**
         * create toolbar
         */
        createToolbar(): void;
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
    /**
     * MarkdownEditorFactory
     */
    class MarkdownEditorFactory extends ObjectElementFactory<HTMLElement> {
        /**
         * create element
         * @param htmlElement
         * @param bindData
         * @param context
         */
        doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): MarkdownEditor;
    }
}
declare var SimpleMDE: any;
declare var marked: any;
declare var Prism: any;
declare namespace duice.extension {
    class MarkdownViewer extends duice.ObjectElement<HTMLElement> {
        div: HTMLDivElement;
        config: object;
        /**
         * constructor
         * @param element
         * @param bindData
         * @param context
         */
        constructor(element: HTMLElement, bindData: object, context: object);
        /**
         * set value
         * @param value
         */
        setValue(value: any): void;
    }
    class MarkdownViewerFactory extends ObjectElementFactory<HTMLElement> {
        /**
         * create element
         * @param htmlElement
         * @param bindData
         * @param context
         */
        doCreateElement(htmlElement: HTMLElement, bindData: object, context: object): MarkdownViewer;
    }
}
declare namespace duice.extension {
    class Pagination extends duice.CustomElement<object> {
        doRender(object: object): HTMLElement;
        doUpdate(object: object): void;
        doStyle(object: object): string;
    }
}
