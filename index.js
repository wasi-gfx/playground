const ASYNC_WASI_IMPORTS = [
    'wasi:io/poll#poll',
    'wasi:io/poll#[method]pollable.block',
    'wasi:io/streams#[method]input-stream.blocking-read',
    'wasi:io/streams#[method]input-stream.blocking-skip',
    'wasi:io/streams#[method]output-stream.blocking-flush',
    'wasi:io/streams#[method]output-stream.blocking-write-and-flush',
    'wasi:io/streams#[method]output-stream.blocking-write-zeroes-and-flush',
    'wasi:io/streams#[method]output-stream.blocking-splice',
];
const ASYNC_WASI_EXPORTS = [
    'wasi:cli/run#run',
    'wasi:http/incoming-handler#handle',
];
const iframeContainer = document.getElementById('iframe-container');
const dialog = document.getElementById('dialog');
const fileInput = document.getElementById('file-input');
const errorContainer = document.getElementById('errors');
if (!("gpu" in navigator)) {
    error("WebGPU is not supported in this browser");
}
if (!("Suspending" in WebAssembly)) {
    error("JSPI (JavaScript Promise Integration) is not supported in this browser");
}
const worker = new Worker('worker.js', {
    type: 'module'
});
function generate(component, options) {
    return new Promise(res => {
        worker.addEventListener('message', e => {
            res(e.data.transpiled);
        });
        worker.postMessage({
            type: "generate",
            component,
            options,
        });
    });
}
export async function onNewComponent(component) {
    createLoader();
    const options = {
        name: "mendy",
        noNodejsCompat: true,
        noTypescript: true,
        asyncMode: {
            tag: 'jspi',
            val: {
                imports: [
                    'wasi:webgpu/webgpu#[method]gpu.request-adapter',
                    'wasi:webgpu/webgpu#[method]gpu-adapter.request-device',
                    ...ASYNC_WASI_IMPORTS,
                ],
                exports: [
                    'run',
                    ...ASYNC_WASI_EXPORTS,
                ],
            },
        },
        map: [
            ['wasi:filesystem/*', 'https://cdn.jsdelivr.net/npm/@bytecodealliance/preview2-shim/lib/browser/filesystem.js#*'],
            ['wasi:clocks/*', 'https://cdn.jsdelivr.net/npm/@bytecodealliance/preview2-shim/lib/browser/clocks.js#*'],
            ['wasi:io/*', 'https://cdn.jsdelivr.net/npm/@bytecodealliance/preview2-shim/lib/browser/io.js#*'],
            ['wasi:random/*', 'https://cdn.jsdelivr.net/npm/@bytecodealliance/preview2-shim/lib/browser/random.js#*'],
            ['wasi:cli/*', 'https://cdn.jsdelivr.net/npm/@bytecodealliance/preview2-shim/lib/browser/cli.js#*'],
            ['wasi:sockets/*', 'https://cdn.jsdelivr.net/npm/@bytecodealliance/preview2-shim/lib/browser/sockets.js#*'],
            ['wasi:cli/*', 'https://cdn.jsdelivr.net/npm/@bytecodealliance/preview2-shim/lib/browser/cli.js#*'],
            ['wasi:io/poll', 'gfx.js#poll'],
            ['wasi:webgpu/webgpu', 'gfx.js'],
            ['wasi:surface/surface', 'gfx.js'],
            ['wasi:graphics-context/graphics-context', 'gfx.js'],
            ['wasi:frame-buffer/frame-buffer', 'gfx.js'],
        ],
    };
    let transpiled = await generate(component, options);
    createIFrame(transpiled);
}
function generateHTML(transpiled) {
    const urls = new Map();
    for (const [name, contents] of transpiled.files.filter(([name, _]) => name.endsWith('.wasm'))) {
        const type = name.endsWith('.wasm') ? 'application/wasm' : 'text/javascript';
        const url = URL.createObjectURL(new Blob([contents], { type }));
        urls.set(name, url);
    }
    for (let [name, contents] of transpiled.files.filter(([name, _]) => name.endsWith('.js'))) {
        var string = new TextDecoder().decode(contents);
        for (const [key, value] of urls.entries()) {
            string = string.replace(`./${key}`, value);
        }
        contents = new TextEncoder().encode(string);
        const type = name.endsWith('.wasm') ? 'application/wasm' : 'text/javascript';
        const url = URL.createObjectURL(new Blob([contents], { type }));
        urls.set(name, url);
    }
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    body {
                        margin: 0;
                        display: grid;
                    }
                </style>
                <script type="importmap">
                    {
                        "imports": {
                            "gfx.js": "/playground/gfx.js",
                            "./mendy.core.wasm": "${urls.get('mendy.core.wasm')}",
                            ${Array.from(urls.entries()).map(([key, value]) => {
        return `"${key}": "${value}"`;
    }).join(',\n')}
                        }
                    }
                </script>
                <script type="module">
                    import { "wasi:cli/run@0.2.0" as wasiCliRun } from 'mendy.js';
                    wasiCliRun.run();
                </script>
            </head>
            <body>
            </body>
        </html>
    `;
}
function createIFrame(transpiled) {
    const iframe = document.createElement('iframe');
    iframe.srcdoc = generateHTML(transpiled);
    iframeContainer.innerHTML = "";
    iframeContainer.appendChild(iframe);
}
function createLoader() {
    iframeContainer.innerHTML = `<wired-spinner spinning></wired-spinner>`;
    dialog.open = true;
}
window['runFromUrl'] = async function (url) {
    try {
        const component = await fetch(url).then(res => res.arrayBuffer());
        await onNewComponent(new Uint8Array(component));
    }
    catch (e) {
        error(e.message);
    }
};
window['closeDialog'] = function () {
    iframeContainer.innerHTML = "";
    dialog.open = false;
};
document.addEventListener('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
});
document.addEventListener('drop', async function (e) {
    e.stopPropagation();
    e.preventDefault();
    try {
        const files = e.dataTransfer.files;
        if (files.length !== 1) {
            throw new Error('Expected exactly 1 file');
        }
        const file = files[0];
        const arrayBuffer = await file.arrayBuffer();
        await onNewComponent(new Uint8Array(arrayBuffer));
    }
    catch (e) {
        error(e.message);
    }
});
fileInput.addEventListener('change', async () => {
    const files = fileInput.files;
    if (files.length !== 1) {
        error("Expected exactly 1 file");
        throw new Error('Expected exactly 1 file');
    }
    const file = files[0];
    const arrayBuffer = await file.arrayBuffer();
    await onNewComponent(new Uint8Array(arrayBuffer));
});
function error(message) {
    const id = "x" + Math.random().toString().replace('.', '');
    errorContainer.insertAdjacentHTML('beforeend', `
        <wired-card fill="darkred" id="${id}">
            ${message}
            <wired-fab onclick="document.querySelector('#errors #${id}').remove()">
                <span class="material-symbols-rounded">close</span>
            </wired-fab>
        </wired-card>
    `);
}
