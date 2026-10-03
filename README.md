# Module Engine — каталог Модулей

Каталог для [ST Module Engine (Beta)](https://github.com/IAmiGOI/Module-Engine). В движке: **Modules → Install a module → Catalog repository**
→ `IAmiGOI/Module-Engine-Modules` → **Browse catalog**.

## Устройство

```
modules/<имя>/index.js   подтверждённые Модули — по папке на Модуль, ОДНИМ файлом
third-party.txt          ссылки на сторонние Модули (не проверены каталогом)
```

## Как написан Модуль

Первым в `index.js` идёт блок-комментарий `@module` со строками `ключ: значение` (смотри [modules/hello/index.js](modules/hello/index.js)):

| ключ | обязателен | что это |
|---|---|---|
| `id` | да | `community.<имя>` — другие префиксы занять нельзя |
| `version` | да | `MAJOR.MINOR.PATCH` |
| `title`, `description` | нет | как показывается в списке |
| `engine` | нет | диапазон версии движка, например `^0.2` |
| `requires` | нет | `module.tracker@^1.0, core.map` — зависимости |
| `rights` | нет | какие контракты Модуль просит (через запятую; длинный список можно переносить после запятой) |
| `network` | нет | `true`, если нужна сеть — это только запрос, сам доступ движок не выдаёт |

Правила кода:

- один файл, до 512 КБ;
- импорты только `stme:<путь>` — `ui/tree`, `ui/reactive`, `widgets`, `request`; любой другой импорт отклоняется;
- `eval`, `new Function`, `import()`, доступ к глобалам через `window[...]` — отклоняются; `fetch`/`localStorage`/прямой SillyTavern
  понижают уровень доверия до `scanned-unsafe`;
- `export default function create(host)` возвращает `{ load, tree, stop }`.

Любое обращение за пределы заявленных прав ставит Модуль в карантин, пока пользователь сам не разрешит его снова.

## Как добавить Модуль

- **Подтверждённый:** pull request с папкой `modules/<имя>/index.js`.
- **Сторонний:** добавить ссылку в `third-party.txt`.
