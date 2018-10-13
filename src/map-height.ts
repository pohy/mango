export function mapHeight() {
    const [mainEl] = Array.from(document.getElementsByTagName('main'));
    const [headerEl] = Array.from(document.getElementsByTagName('header'));
    return (
        window.innerWidth - (elementHeight(mainEl) + elementHeight(headerEl))
    );
}

function elementHeight(element: Element) {
    return element.getBoundingClientRect().height;
}
