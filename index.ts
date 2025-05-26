import { generate, GenerateOptions, Transpiled } from './static/component.js';

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

export function onNewComponent(component: Uint8Array) {
    const options: GenerateOptions = {
        name: "mendy",
        noNodejsCompat: false,
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
    }
    let transpiled = generate(component, options);
    createIFrame(transpiled);
}

function generateHTML(transpiled: Transpiled) {
    const urls = new Map<string, string>();
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
                        "gfx.js": "/gfx.js",
                        "./mendy.core.wasm": "${ urls.get('mendy.core.wasm') }",
                        ${
                            Array.from(urls.entries()).map(([key, value]) => {
                                return `"${key}": "${value}"`
                            }).join(',\n')
                        }
                    }
                }
            </script>
            <script type="module">
                import { "wasi:cli/run@0.2.0" as wasiCliRun } from 'mendy.js';
                wasiCliRun.run();
                // import * as e from 'mendy.js';
                // console.log(e);
                // console.log(e.instantiate());
            </script>
        </head>
        <body>
        </body>
    </html>
    `;
}

function createIFrame(transpiled: Transpiled) {
    const iframe = document.createElement('iframe') as HTMLIFrameElement;
    iframe.srcdoc = generateHTML(transpiled);
    const dialog = document.getElementById('dialog') as HTMLDialogElement;
    dialog.appendChild(iframe);
    dialog.showModal();
}

async function start() {
    const component = await fetch('./breakout.wasm').then(res => res.arrayBuffer());
    onNewComponent(new Uint8Array(component));
}

start();
