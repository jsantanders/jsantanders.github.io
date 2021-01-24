---
title: Demo
date: '2020-01-10'
layout: post
draft: true
category: "Demo"
tags:
  - "Demo"
description: "Demo"
---


Seit der Veröffentlichung der Alpha-Version der [React Hooks](https://reactjs.org/hooks), steht die folgende Frage bei Diskussionen im Raum: “Warum ist *\<irgendeine andere API\>* kein Hook?”

Nur als Erinnerung: Das *sind* Hooks:

* [`useState()`](https://reactjs.org/docs/hooks-reference.html#usestate) Lässt dich eine State-Variable deklarieren.
* [`useEffect()`](https://reactjs.org/docs/hooks-reference.html#useeffect) Lässt dich eine Nebenerscheinung (side effect) deklarieren.
* [`useContext()`](https://reactjs.org/docs/hooks-reference.html#usecontext) Lässt dich den Context verwenden.

Es gibt jedoch auch noch andere APIs, wie `React.memo()` und `<Context.Provider>`, die *keine* Hooks sind. Bereits vorgeschlagene Hookvarianten dieser APIs wären *nicht kompositionell* oder *antimodulär*. Dieser Artikel erklärt warum das so ist.

**Hinweis: Dieser Post ist ein tiefer Einblick für Leute, die in Diskussionen über APIs interessiert sind. Seht diesen Artikel nicht als produktive Arbeit mit React an!**

---

Es gibt zwei wichtige Eigenschaften die wir bei React APIs beibehalten wollen:

1. **Komposition:** [Eigene Hooks](https://reactjs.org/docs/hooks-custom.html) sind der hauptsächliche Grund warum wir uns so auf die Hook API freuen. Wir glauben, dass viele Leute ihre eigenen Hooks bauen werden und wir müssen auch sicher sein, dass diese sich [nicht widersprechen](/why-do-hooks-rely-on-call-order/#flaw-4-the-diamond-problem). (Sind wir nicht alle ein wenig verwöhnt, dass Komponenten so gut zusammen funktionieren und sich nicht gegenseitig zerstören?)

2. **Debugging:** Wir wollen, dass Bugs [einfach zu finden](/the-bug-o-notation/) sind während die Anwendung größer und größer wird. Eines der besten Features von React ist die Tatsache, dass wenn man sieht das etwas falsch gerendert wird, man einfach den Komponentenbaum heruntergehen kann, bis man das Prop oder den State gefunden, der den Fehler hervorgerufen hat.

Diese beiden Einschränkungen zusammen zeigen uns was ein Hook sein kann und was *nicht*. Lasst uns zusammen ein paar Beispiele anschauen.

---

##  Ein richger Hook: `useState()`

### Komposition

Mehrere selbsterstellte Hooks, die `useState()` verwenden, haben keine Komplikationen:

```js
function useMyCustomHook1() {
  const [value, setValue] = useState(0);
  // Was hier passiert, bleibt hier.
}

function useMyCustomHook2() {
  const [value, setValue] = useState(0);
  // Was hier passiert, bleibt hier.
}

function MyComponent() {
  useMyCustomHook1();
  useMyCustomHook2();
  // ...
}
```

Das Hinzufügen eines neuen Aufrufs von `useState()` ist immer sicher. Du brauchst dir keine Gedanken über andere Hooks, die bereits von einer Komponente verwendet werden, machen um eine neue State-Variable zu erstellen. Außerdem ist es nicht möglich andere State-Variablen zu zerstören, wenn man eine andere updatet.

**Fazit:** ✅ `useState()` beeinflusst selbsterstellte Hooks nicht.
