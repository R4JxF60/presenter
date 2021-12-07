const getFragment = dom => dom.body.firstChild;

const createDOM = htmlStr => {
    const dom = new DOMParser();
    return dom.parseFromString(htmlStr, "text/html");
}

const setRefs = (component, elements) => {
    elements.forEach(element => {
        let ref = element.getAttribute("data-ref");
        if(ref) {
            component.refs[ref] = element;
        }
    });
}

const setChildComponents = (component, childs, elements) => {
    childs.forEach(child => {
        let childComponent = component.childComponents[child];
        elements.forEach(element => {
            if(element.getAttribute("data-child") === child) {
                element.parentNode.replaceChild(childComponent, element);
            }
        })
    })
}

const createComponent = component => {
    const DOM = createDOM(component.render());
    let elements = DOM.querySelectorAll("[data-ref], [data-child]");
    let childs = Object.keys(component.childComponents);
    setRefs(component, elements);
    setChildComponents(component, childs, elements);
    if(component.onCreate) {
        component.onCreate();
    }
    return DOM.body.firstChild;
}


export default createComponent;
