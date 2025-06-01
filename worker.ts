import { generate, GenerateOptions, Transpiled } from './static/component.js';

addEventListener('message', e => {
    if (e.data.type === 'generate') {
        const transpiled = generate(e.data.component, e.data.options);
        postMessage({ type: 'generate', transpiled });
    }
});
