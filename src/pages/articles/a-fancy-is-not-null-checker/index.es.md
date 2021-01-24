---
title: "Una elegante forma de comprobar no nulos en C#"
date: '2021-01-23'
layout: post
draft: false
category: "Development"
tags:
  - "C#"
description: "Revisar si una referencia es no nula no volverá a ser lo mismo."
---

La forma clásica de comprobar que un objeto no es nulo es la siguiente:

```csharp
if (thing != null)
```

Pero ¿Qué ocurriría si alguien sobrecarga el operador `!=`? Ya no tendríamos certeza si la referencia es un objeto. Pero, podemos usar la siguiente forma y ya no importaría si el operador ha sido sobrecargado:

```csharp
if (thing is object)
```

También podemos usarlo para verificar si una referencia es nula

```csharp
if (thing is null)
```

Hay desarrolladores que pueden argumentar que de esta forma (primer caso) se está ofuscando la intención de comprobar si la variable tiene una instancia no nula. Pero yo creo que lo suficientemente idiomático una vez que te acostumbras y acostumbras a tus colegas a usarlo. ¿Tú que opinas?
