# WKT Viewer

En statisk GitHub Pages-side, der viser WKT-geometri fra URL-parameteren `wkt`.

## Eksempel

```text
https://DIT-BRUGERNAVN.github.io/wkt-viewer/?wkt=POLYGON%20((9.9679%2056.1708%2C%209.9684%2056.1712%2C%209.9679%2056.1708))
```

WKT forventes i EPSG:4326 med koordinatrækkefølgen `længdegrad breddegrad`.

## Udgiv med GitHub Pages

1. Opret et offentligt repository med navnet `wkt-viewer`.
2. Læg `index.html`, `style.css` og `app.js` i repository-roden.
3. Åbn **Settings → Pages**.
4. Vælg **Deploy from a branch**.
5. Vælg branchen `main` og mappen `/ (root)`.
6. Gem.

## Opret URL i JavaScript

```javascript
const url = new URL('https://DIT-BRUGERNAVN.github.io/wkt-viewer/');
url.searchParams.set('wkt', wkt);
console.log(url.toString());
```

## Opret URL i C#

```csharp
var url = "https://DIT-BRUGERNAVN.github.io/wkt-viewer/?wkt="
          + Uri.EscapeDataString(wkt);
```

## Bemærkninger

- Siden sender ikke WKT til en applikationsserver, men browseren henter kortfliser og JavaScript-biblioteker fra eksterne tjenester.
- Meget store geometrier kan overskride URL-længdegrænser i browser, proxy eller mailsystem.
- Hvis geometrien er følsom, bør løsningen hostes internt, og eksterne afhængigheder bør eventuelt kopieres lokalt.
