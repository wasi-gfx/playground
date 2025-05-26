// world root:component/root
export type Files = Array<[string, Uint8Array]>;
export type Maps = Array<[string, string]>;
export type InstantiationMode = InstantiationModeAsync | InstantiationModeSync;
export interface InstantiationModeAsync {
  tag: 'async',
}
export interface InstantiationModeSync {
  tag: 'sync',
}
export type BindingsMode = BindingsModeJs | BindingsModeHybrid | BindingsModeOptimized | BindingsModeDirectOptimized;
export interface BindingsModeJs {
  tag: 'js',
}
export interface BindingsModeHybrid {
  tag: 'hybrid',
}
export interface BindingsModeOptimized {
  tag: 'optimized',
}
export interface BindingsModeDirectOptimized {
  tag: 'direct-optimized',
}
export interface AsyncImportsExports {
  imports: Array<string>,
  exports: Array<string>,
}
export type AsyncMode = AsyncModeSync | AsyncModeJspi;
export interface AsyncModeSync {
  tag: 'sync',
}
export interface AsyncModeJspi {
  tag: 'jspi',
  val: AsyncImportsExports,
}
export interface GenerateOptions {
  name: string,
  noTypescript?: boolean,
  instantiation?: InstantiationMode,
  importBindings?: BindingsMode,
  map?: Maps,
  compat?: boolean,
  noNodejsCompat?: boolean,
  base64Cutoff?: number,
  tlaCompat?: boolean,
  validLiftingOptimization?: boolean,
  tracing?: boolean,
  noNamespacedExports?: boolean,
  guest?: boolean,
  multiMemory?: boolean,
  asyncMode?: AsyncMode,
}
export type Wit = WitSource | WitBinary | WitPath;
export interface WitSource {
  tag: 'source',
  val: string,
}
export interface WitBinary {
  tag: 'binary',
  val: Uint8Array,
}
export interface WitPath {
  tag: 'path',
  val: string,
}
export type EnabledFeatureSet = EnabledFeatureSetList | EnabledFeatureSetAll;
export interface EnabledFeatureSetList {
  tag: 'list',
  val: Array<string>,
}
export interface EnabledFeatureSetAll {
  tag: 'all',
}
export interface TypeGenerationOptions {
  wit: Wit,
  world?: string,
  tlaCompat?: boolean,
  instantiation?: InstantiationMode,
  map?: Maps,
  features?: EnabledFeatureSet,
  guest?: boolean,
  asyncMode?: AsyncMode,
}
/**
* # Variants
* 
* ## `"function"`
* 
* ## `"instance"`
*/
export type ExportType = 'function' | 'instance';
export interface Transpiled {
  files: Files,
  imports: Array<string>,
  exports: Array<[string, ExportType]>,
}
export function generate(component: Uint8Array, options: GenerateOptions): Transpiled;
export function generateTypes(name: string, options: TypeGenerationOptions): Files;
