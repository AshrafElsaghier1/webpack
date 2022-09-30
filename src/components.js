const elemeGenerator = (ele, text) => {
    const element = document.createElement(ele);
    element.innerText = text;
    document.body.appendChild(element);
};
export default elemeGenerator;