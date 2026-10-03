/*@module
id: community.hello
title: Hello (example)
description: A tiny example Module that shows how one is written. Safe to remove.
version: 1.0.0
engine: ^0.2
rights: ui.notify
*/
import { h } from 'stme:ui/tree';
import { signal } from 'stme:ui/reactive';
import { Button } from 'stme:widgets';
import { request } from 'stme:request';

/**
 * Пример Модуля каталога. Правила:
 *  - один файл `index.js`, шапка `@module` первой;
 *  - импорты только `stme:<путь>` (ui/tree, ui/reactive, widgets, request);
 *  - всё, что нужно от движка, — через `host` и контракты; права перечислены в `rights` шапки;
 *  - `export default` — фабрика: получает `host`, возвращает { load, tree, stop }.
 */
export default function create(host) {
    const clicks = signal(0);

    async function sayHello() {
        clicks.set(clicks.peek() + 1);
        await request(host.cores, 'ui.notify', { params: { tone: 'ok', text: `Hello! (${clicks.peek()})` } });
    }

    return {
        async load() {},
        tree: () => h('div', {}, Button('Say hello', sayHello)),
        stop() {},
    };
}
