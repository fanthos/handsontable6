import { autocompleteRenderer, RENDERER_TYPE as AUTOCOMPLETE_RENDERER } from './autocompleteRenderer';
import { baseRenderer, RENDERER_TYPE as BASE_RENDERER } from './baseRenderer';
import { checkboxRenderer, RENDERER_TYPE as CHECKBOX_RENDERER } from './checkboxRenderer';
import { htmlRenderer, RENDERER_TYPE as HTML_RENDERER } from './htmlRenderer';
import { numericRenderer, RENDERER_TYPE as NUMERIC_RENDERER } from './numericRenderer';
import { passwordRenderer, RENDERER_TYPE as PASSWORD_RENDERER } from './passwordRenderer';
import { textRenderer, RENDERER_TYPE as TEXT_RENDERER } from './textRenderer';
import {
  registerRenderer,
} from './registry';

/**
 * Registers all available renderers.
 */
export function registerAllRenderers() {
  registerRenderer(autocompleteRenderer);
  registerRenderer(baseRenderer);
  registerRenderer(checkboxRenderer);
  registerRenderer(htmlRenderer);
  registerRenderer(numericRenderer);
  registerRenderer(passwordRenderer);
  registerRenderer(textRenderer);
}

export {
  autocompleteRenderer, AUTOCOMPLETE_RENDERER,
  baseRenderer, BASE_RENDERER,
  checkboxRenderer, CHECKBOX_RENDERER,
  htmlRenderer, HTML_RENDERER,
  numericRenderer, NUMERIC_RENDERER,
  passwordRenderer, PASSWORD_RENDERER,
  textRenderer, TEXT_RENDERER,
}

export {
  getRegisteredRendererNames,
  getRegisteredRenderers,
  getRenderer,
  hasRenderer,
  registerRenderer,
} from './registry';
