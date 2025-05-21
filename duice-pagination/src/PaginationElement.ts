import {Configuration, CustomElement} from "duice";
import {getElementAttribute} from "duice";

/**
 * Pagination Element
 */
export class PaginationElement extends CustomElement<object> {

    pageProperty: string;

    sizeProperty: string;

    totalProperty: string;

    onclick: Function;

    prevContent: string = '<';

    nextContent: string = '>';

    pageNumberSize: number = 10;

    /**
     * Constructor
     * @param htmlElement html element
     * @param bindData bind data
     * @param context context
     */
    constructor(htmlElement: HTMLElement, bindData: object, context: object) {
        super(htmlElement, bindData, context);
        // attributes
        this.pageProperty = getElementAttribute(htmlElement, 'page-property');
        this.sizeProperty = getElementAttribute(htmlElement, 'size-property');
        this.totalProperty = getElementAttribute(htmlElement, 'total-property');
        this.onclick = new Function(getElementAttribute(htmlElement, 'onclick'));
        // optional
        this.pageNumberSize = Number(getElementAttribute(htmlElement, 'page-number-size') || this.pageNumberSize);
        this.prevContent = getElementAttribute(htmlElement, 'prev-content') || this.prevContent;
        this.nextContent = getElementAttribute(htmlElement, 'next-content') || this.nextContent;
    }

    /**
     * Do render
     * @param object
     */
    override doRender(object: object): void {
        // page,size,count
        let page = Number(object[this.pageProperty]);
        let size = Number(object[this.sizeProperty]);
        let total = Number(object[this.totalProperty]);

        // calculate page
        let totalPage = Math.ceil(total/size);
        let startPageIndex = Math.floor(page/this.pageNumberSize)*this.pageNumberSize;
        let endPageIndex = Math.min(startPageIndex + (this.pageNumberSize-1), totalPage - 1);
        endPageIndex = Math.max(endPageIndex, 0);

        // prev
        let prev = document.createElement('span');
        prev.innerHTML = this.prevContent;
        prev.classList.add(`${Configuration.getNamespace()}-pagination__prev`);
        prev.dataset.page = String(Math.max(startPageIndex - this.pageNumberSize, 0));
        prev.addEventListener('click', () => {
            this.onclick.call(prev);
        })
        if(page < this.pageNumberSize) {
            prev.classList.add(`${Configuration.getNamespace()}-pagination__prev--disable`);
        }

        // pages
        let pageable = document.createElement('ul');
        pageable.classList.add(`${Configuration.getNamespace()}-pagination-pageable`);
        for(let index = startPageIndex; index <= endPageIndex; index ++) {
            let item = document.createElement('li');
            item.appendChild(document.createTextNode(String(index + 1)));
            item.dataset.page = String(index);
            item.classList.add(`${Configuration.getNamespace()}-pagination__pageable-item`);
            if(index === page) {
                item.classList.add(`${Configuration.getNamespace()}-pagination__pageable-item--active`);
            }
            item.addEventListener('click', () => {
                this.onclick.call(item);
            });
            pageable.appendChild(item);
        }

        // next
        let next = document.createElement('span');
        next.innerHTML = this.nextContent;
        next.classList.add(`${Configuration.getNamespace()}-pagination__next`);
        next.dataset.page = String(Math.min(endPageIndex + 1, totalPage));
        next.addEventListener('click', () => {
            this.onclick.call(next);
        });
        if(endPageIndex >= (totalPage - 1)) {
            next.classList.add(`${Configuration.getNamespace()}-pagination__next--disable`);
        }

        // appends to container
        this.getHtmlElement().innerHTML = '';
        this.getHtmlElement().appendChild(this.createStyle());
        this.getHtmlElement().appendChild(prev);
        this.getHtmlElement().appendChild(pageable);
        this.getHtmlElement().appendChild(next);

        // moves to current page
        const activeItem = this.getHtmlElement().querySelector('.duice-pagination__pageable-item--active');
        activeItem?.scrollIntoView({
            behavior: 'instant',
            inline: 'center',
            block: 'nearest'
        });
    }

    /**
     * Updates element
     * @param object
     */
    override doUpdate(object: object): void {
        this.render();
    }

    /**
     * Creates style
     */
    createStyle(): HTMLStyleElement {
        let style = document.createElement('style');
        style.innerHTML = `
            ${Configuration.getNamespace()}-pagination {
                display: inline-flex;
                gap: 0.5em;
            }
      
            .${Configuration.getNamespace()}-pagination__prev {
                cursor: pointer;
            }
            .${Configuration.getNamespace()}-pagination__prev--disable {
                pointer-events: none;
            }
            .${Configuration.getNamespace()}-pagination__next {
                cursor: pointer;
            }
            .${Configuration.getNamespace()}-pagination__next--disable {
                pointer-events: none;
            }
            .${Configuration.getNamespace()}-pagination-pageable {
                list-style: none;
                display: flex;
                gap: 0.5em;
                padding-left: 0;
                margin: 0;
                overflow-x: scroll;
            }
            .${Configuration.getNamespace()}-pagination__pageable-item {
                cursor: pointer;
            } 
            .${Configuration.getNamespace()}-pagination__pageable-item--active {
                font-weight: bold;
                text-decoration: underline;
                pointer-events: none;
            }
            .${Configuration.getNamespace()}-pagination__pageable-item--disable {
                pointer-events: none;
            }
        `;
        return style;
    }

}

