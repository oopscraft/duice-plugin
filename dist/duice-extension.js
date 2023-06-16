var duice;
(function (duice) {
    var extension;
    (function (extension) {
        class MarkdownEditor extends duice.ObjectElement {
            /**
             * constructor
             * @param element
             * @param bindData
             * @param context
             */
            constructor(element, bindData, context) {
                super(element, bindData, context);
                this.getHtmlElement().style.display = 'block';
                // config
                let config = {
                    mode: 'markdown',
                    lineNumbers: true,
                    theme: "default",
                    extraKeys: { "Enter": "newlineAndIndentContinueMarkdownList" }
                };
                // textarea
                let textarea = document.createElement('textarea');
                this.getHtmlElement().appendChild(textarea);
                // create code mirror
                this.codeMirror = CodeMirror.fromTextArea(textarea, config);
                // add change event listener
                this.codeMirror.on("blur", () => {
                    let event = new duice.event.PropertyChangeEvent(this, this.getProperty(), this.getValue(), this.getIndex());
                    this.notifyObservers(event);
                });
            }
            /**
             * create toolbar
             */
            createToolbar() {
            }
            /**
             * set value
             * @param value
             */
            setValue(value) {
                if (!value) {
                    value = '';
                }
                this.codeMirror.doc.setValue(value);
            }
            /**
             * return value
             */
            getValue() {
                let value = this.codeMirror.doc.getValue();
                if (!value) {
                    return null;
                }
                return value;
            }
        }
        extension.MarkdownEditor = MarkdownEditor;
        /**
         * MarkdownEditorFactory
         */
        class MarkdownEditorFactory extends duice.ObjectElementFactory {
            /**
             * create element
             * @param htmlElement
             * @param bindData
             * @param context
             */
            doCreateElement(htmlElement, bindData, context) {
                return new MarkdownEditor(htmlElement, bindData, context);
            }
        }
        extension.MarkdownEditorFactory = MarkdownEditorFactory;
        // register
        duice.DataElementRegistry.register(`${duice.getNamespace()}-markdown-editor`, new MarkdownEditorFactory());
    })(extension = duice.extension || (duice.extension = {}));
})(duice || (duice = {}));
var duice;
(function (duice) {
    var extension;
    (function (extension) {
        class MarkdownViewer extends duice.ObjectElement {
            /**
             * constructor
             * @param element
             * @param bindData
             * @param context
             */
            constructor(element, bindData, context) {
                super(element, bindData, context);
                // creates child div
                this.div = document.createElement('div');
                this.getHtmlElement().appendChild(this.div);
                // config
                this.config = {
                    headerIds: false,
                    mangle: false,
                    breaks: true
                };
            }
            /**
             * set value
             * @param value
             */
            setValue(value) {
                value = value ? value : '';
                value = marked.parse(value, this.config);
                this.div.innerHTML = value;
                this.div.querySelectorAll('[class^=language-]').forEach(function (pre) {
                    pre.classList.add('line-numbers');
                });
                // highlight
                Prism.highlightAll();
            }
        }
        extension.MarkdownViewer = MarkdownViewer;
        class MarkdownViewerFactory extends duice.ObjectElementFactory {
            /**
             * create element
             * @param htmlElement
             * @param bindData
             * @param context
             */
            doCreateElement(htmlElement, bindData, context) {
                return new MarkdownViewer(htmlElement, bindData, context);
            }
        }
        extension.MarkdownViewerFactory = MarkdownViewerFactory;
        // register
        duice.DataElementRegistry.register(`${duice.getNamespace()}-markdown-viewer`, new MarkdownViewerFactory());
    })(extension = duice.extension || (duice.extension = {}));
})(duice || (duice = {}));
var duice;
(function (duice) {
    var extension;
    (function (extension) {
        class Pagination extends duice.CustomElement {
            doRender(object) {
                // attribute
                let pageProperty = duice.getElementAttribute(this.getHtmlElement(), 'page-property');
                let sizeProperty = duice.getElementAttribute(this.getHtmlElement(), 'size-property');
                let countProperty = duice.getElementAttribute(this.getHtmlElement(), 'count-property');
                let onclick = duice.getElementAttribute(this.getHtmlElement(), 'onclick');
                // optional
                let prevText = duice.getElementAttribute(this.getHtmlElement(), 'prev-text') || '<︎';
                let nextText = duice.getElementAttribute(this.getHtmlElement(), 'next-text') || '>︎';
                // page,size,count
                let page = Number(object[pageProperty]);
                let size = Number(object[sizeProperty]);
                let count = Number(object[countProperty]);
                // calculate page
                let totalPage = Math.ceil(count / size);
                let startPageIndex = Math.floor(page / 10) * 10;
                let endPageIndex = Math.min(startPageIndex + 9, totalPage - 1);
                endPageIndex = Math.max(endPageIndex, 0);
                // template
                let pagination = document.createElement('ul');
                pagination.classList.add(`${duice.getNamespace()}-pagination`);
                // prev
                let prev = document.createElement('li');
                prev.appendChild(document.createTextNode(prevText));
                prev.classList.add(`${duice.getNamespace()}-pagination__item-prev`);
                prev.dataset.page = String(Math.max(startPageIndex - 10, 0));
                prev.addEventListener('click', function () {
                    Function(onclick).call(prev);
                });
                if (page < 10) {
                    prev.classList.add(`${duice.getNamespace()}-pagination__item--disable`);
                }
                pagination.appendChild(prev);
                // pages
                for (let index = startPageIndex; index <= endPageIndex; index++) {
                    let item = document.createElement('li');
                    item.appendChild(document.createTextNode(String(index + 1)));
                    item.dataset.page = String(index);
                    item.classList.add(`${duice.getNamespace()}-pagination__item-page`);
                    if (index === page) {
                        item.classList.add(`${duice.getNamespace()}-pagination__item--active`);
                    }
                    item.addEventListener('click', function () {
                        Function(onclick).call(item);
                    });
                    pagination.appendChild(item);
                }
                // next
                let next = document.createElement('li');
                next.appendChild(document.createTextNode(nextText));
                next.classList.add(`${duice.getNamespace()}-pagination__item-next`);
                next.dataset.page = String(Math.min(endPageIndex + 1, totalPage));
                next.addEventListener('click', function () {
                    Function(onclick).call(next);
                });
                if (endPageIndex >= (totalPage - 1)) {
                    next.classList.add(`${duice.getNamespace()}-pagination__item--disable`);
                }
                pagination.appendChild(next);
                // returns
                return pagination;
            }
            doUpdate(object) {
                this.render();
            }
            doStyle(object) {
                return `
                .${duice.getNamespace()}-pagination {
                    list-style: none;
                    display: flex;
                    padding-left: 0;
                    margin: 0;
                }
                .${duice.getNamespace()}-pagination__item-page {
                    cursor: pointer;
                    padding: 0 0.5rem;
                }
                .${duice.getNamespace()}-pagination__item-prev {
                    cursor: pointer;
                    padding: 0 0.5rem;
                    font-size: smaller;    
                }
                .${duice.getNamespace()}-pagination__item-next {
                    cursor: pointer;
                    padding: 0 0.5rem;
                    font-size: smaller;
                }
                .${duice.getNamespace()}-pagination__item--active {
                    font-weight: bold;
                    text-decoration: underline;
                    pointer-events: none;
                }
                .${duice.getNamespace()}-pagination__item--disable {
                    pointer-events: none;
                }
           `;
            }
        }
        extension.Pagination = Pagination;
        // register
        duice.DataElementRegistry.register(`${duice.getNamespace()}-pagination`, new duice.CustomElementFactory(Pagination));
    })(extension = duice.extension || (duice.extension = {}));
})(duice || (duice = {}));
var duice;
(function (duice) {
    var extension;
    (function (extension) {
        class SideNavigation extends duice.CustomElement {
            constructor() {
                super(...arguments);
                this.uls = [];
            }
            /**
             * doReader
             * @param array
             */
            doRender(array) {
                // get attribute
                this.idProperty = duice.getElementAttribute(this.getHtmlElement(), 'id-property');
                this.parentIdProperty = duice.getElementAttribute(this.getHtmlElement(), 'parent-id-property');
                this.iconProperty = duice.getElementAttribute(this.getHtmlElement(), 'icon-property');
                this.textProperty = duice.getElementAttribute(this.getHtmlElement(), 'text-property');
                this.onclick = duice.getElementAttribute(this.getHtmlElement(), 'onclick');
                // create tree element
                let ulElement = this.arrayToTreeUl(array, null, 0);
                ulElement.classList.add(`${duice.getNamespace()}-side-navigation`);
                // return
                return ulElement;
            }
            /**
             * array to tree ul
             * @param array
             * @param parentId
             * @param depth
             */
            arrayToTreeUl(array, parentId, depth) {
                const ulElement = document.createElement('ul');
                for (const object of array) {
                    if (object[this.parentIdProperty] === parentId) {
                        const liElement = document.createElement('li');
                        liElement.style.listStyle = 'none';
                        // create a element
                        let aElement = document.createElement('a');
                        // onclick
                        if (this.onclick) {
                            liElement.addEventListener('click', event => {
                                Function(this.onclick).call(object);
                            });
                        }
                        // icon
                        if (this.iconProperty) {
                            let iconElement = document.createElement('img');
                            iconElement.src = object[this.iconProperty];
                            aElement.appendChild(iconElement);
                        }
                        // text content
                        let textElement = document.createElement('span');
                        textElement.appendChild(document.createTextNode(object[this.textProperty]));
                        aElement.appendChild(textElement);
                        // adds to ul
                        liElement.append(aElement);
                        ulElement.appendChild(liElement);
                        // recursively child ul element
                        let childUlElement = this.arrayToTreeUl(array, object[this.idProperty], depth + 1);
                        if (childUlElement.childElementCount > 0) {
                            liElement.appendChild(childUlElement);
                            liElement.classList.add('__fold__');
                        }
                        // indent
                        if (depth > 0) {
                            liElement.classList.add('__indent__');
                        }
                        if (depth <= 1) {
                            ulElement.style.paddingLeft = '0';
                        }
                        else {
                            ulElement.style.paddingLeft = '1em';
                        }
                        // toggle fold,unfold
                        liElement.addEventListener('click', event => {
                            if (liElement.querySelector('ul')) {
                                if (liElement.classList.contains('__fold__')) {
                                    liElement.classList.remove('__fold__');
                                    liElement.classList.add('__unfold__');
                                }
                                else {
                                    liElement.classList.add('__fold__');
                                    liElement.classList.remove('__unfold__');
                                }
                            }
                            event.stopPropagation();
                        });
                    }
                }
                // returns
                return ulElement;
            }
            doUpdate(data) {
                this.render();
            }
            /**
             * doStyle
             * @param array
             */
            doStyle(array) {
                return `
                .${duice.getNamespace()}-side-navigation li {
                    line-height: inherit;
                }
                .${duice.getNamespace()}-side-navigation li.__indent__::before {
                    content: '';
                    display: inline-block;
                    width: 1em;
                    height: 1em;
                    vertical-align: middle;
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAJklEQVR42mNgGAXUBA0NDf9HfTDqg1EfQHxALD0KRsEoGAWDBQAAM5IY9y7mNu0AAAAASUVORK5CYII=);
                    background-position-x: center;
                    background-position-y: center;
                    cursor: pointer;
                }
                .${duice.getNamespace()}-side-navigation li.__fold__::before {
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAOUlEQVR42mNgGEygoaHhP8OQBqM+GBgXE8I0DRJaWPB/yFrwHwuGy+OiR1YQ0S4V0TQfjIJRMEIAAEXLZ9KMlg2EAAAAAElFTkSuQmCC);
                }
                .${duice.getNamespace()}-side-navigation li.__fold__ > ul {
                    display: none;
                }
                .${duice.getNamespace()}-side-navigation li.__unfold__::before {
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAANklEQVR42mNgGEygoaHhP8OQBqM+GBgXE8I0DZJRC5AN+I8Fw+Vx0aNxQB0LaJoPRsEoGCEAAGOiY9YrvpoQAAAAAElFTkSuQmCC);
                }
                .${duice.getNamespace()}-side-navigation li.__unfold__ > ul {
                    display: '';
                }
                .${duice.getNamespace()}-side-navigation li > a {
                    display: inline-block;
                    color: inherit;
                    text-decoration: none;
                    cursor: pointer;
                }
                .${duice.getNamespace()}-side-navigation li > a > img {
                    width: 1em;
                    height: 1em;
                    vertical-align: middle;
                }
                .${duice.getNamespace()}-side-navigation li > a > span {
                    margin-left: 0.2em;
                }
            `;
            }
        }
        extension.SideNavigation = SideNavigation;
        // register
        duice.DataElementRegistry.register(`${duice.getNamespace()}-side-navigation`, new duice.CustomElementFactory(SideNavigation));
    })(extension = duice.extension || (duice.extension = {}));
})(duice || (duice = {}));
/// <reference path="../node_modules/duice/dist/duice.d.ts" />
//# sourceMappingURL=duice-extension.js.map