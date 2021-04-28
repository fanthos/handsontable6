---
title: Custom editor example
permalink: /next/vue-custom-editor-example
canonicalUrl: /vue-custom-editor-example
---

# Custom editor example

[[toc]]

You can declare a custom editor for the `HotTable` component either by declaring it as a class and passing it to the Handsontable options, or create an editor component. You can use it many times and with different props. To differenciate between editor instances pass a `key` attribute.

## Declaring an editor as a class

An implementation of the `@handsontable/vue` component with a custom editor added. It utilizes the `placeholder` attribute in the editor's `input` element.

::: example #example1 :vue --html 1 --js 2
```html
<div id="example1" class="hot">
  <hot-table :settings="hotSettings"></hot-table>
</div>
```
```js
import Vue from 'vue';
import { HotTable } from '@handsontable/vue';
import Handsontable from 'handsontable';

```
:::