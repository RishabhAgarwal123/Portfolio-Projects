// Create DOM (DOM API)

function createDom(root) {
    let rootDom = null;
    if (typeof root === 'string') {
        // create a new DOM node for the root string
        const node = document.createElement('p');
        node.textContent = root;
        // if rootDom is null, assign it to the new node, otherwise append the node to the existing rootDom
        if (!rootDom) rootDom = node
        else rootDom.append(node);
        return node;
    } else {
        // create a new DOM node for the root object
        rootDom = document.createElement(root.type);
        // add attributes to the node, if any
        if (root.attributes) {
            for (const key in root.attributes) {
                const val = root.attributes[key];
                rootDom.setAttribute(key, val);
            }
        }
        // add children to the node, if any
        if (root.children) {
            root.children.forEach(child => {
                if (typeof child === 'object') {
                    // if the child is an object, create a new DOM node and append it to the root node
                    const node = createDom(child);
                    rootDom.append(node);
                } else {
                    // if the child is not an object, append it as text to the root node
                    rootDom.append(child);
                }
            });
        }
        // return the fully created root DOM node
        return rootDom;
    }
}

// The createDom function is used to create a new DOM element or a tree of elements based on a given root object. The root object 
// can either be a string or an object, representing a single element or a tree of elements, respectively.

// If the root is a string, it is wrapped inside a paragraph tag using the document.createElement method, and the resulting DOM node 
// is returned.

// If the root is an object, a new DOM element is created using the root.type property, which specifies the tag name of the element. 
// If the root object also has an attributes property, its key-value pairs are used to set corresponding HTML attributes on the 
// created DOM element using the setAttribute method.

// If the root object has a children property, which is an array of child elements, each child is recursively processed by calling 
// createDom on it. If the child is a string, it is added as a text node to the parent DOM element using the append method. If it's 
// an object, the resulting DOM element is added as a child to the parent DOM element using the append method.

// The function returns the root DOM element that was created, which may include all its child elements recursively added.

// Define test cases
const testCases = [
    // Test case 1: String input
    {
        input: 'Hello, world!',
        expectedOutput: '<p>Hello, world!</p>'
    },
    // Test case 2: Object input
    {
        input: {
            type: 'div',
            attributes: {
                id: 'myDiv',
                class: 'container'
            },
            children: ['This is a div element']
        },
        expectedOutput: '<div id="myDiv" class="container">This is a div element</div>'
    },
    // Test case 3: Nested Object input
    {
        input: {
            type: 'div',
            attributes: {
                id: 'myDiv',
                class: 'container'
            },
            children: ['This is a div element',
                {
                    type: 'p',
                    attributes: {},
                    children: ['Hello, world!']
                }
            ],
        },
        expectedOutput: '<div id="myDiv" class="container">This is a div element</div>'
    }
    // Add more test cases as needed
];

// Test the createDom function
function createDomApi() {
    testCases.forEach((testCase, index) => {
        const { input, expectedOutput } = testCase;
        const result = createDom(input);
        const resultHtml = result.outerHTML;
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input:`, input);
        console.log(`Expected Output:`, expectedOutput);
        console.log(`Result:`, resultHtml);
        console.log(`Test Passed:`, resultHtml === expectedOutput);
        console.log('-----------------------------');
    });
}

document.getElementById('createDom').addEventListener('click', () => createDomApi());