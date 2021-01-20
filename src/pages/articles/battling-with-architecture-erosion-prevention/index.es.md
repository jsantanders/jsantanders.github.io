---
title: "Batallando contra la erosión de arquitectura I: Prevención"
date: '2021-01-02'
spoiler: A brief conversation about the importance of software architecture in modern applications.
layout: post
draft: false
category: "Software Sustainability"
tags:
  - "Software Architecture"
description: "A brief conversation about the importance of software architecture in modern applications"
---

Cada vez más las aplicaciones modernas buscan reducir al mínimo o a cero la cantidad de tiempo que pasan no disponibles debido a actualizaciones y despliegues, sin embargo, esto requiere que la aplicación esté preparada para estos procesos, no solo a nivel de infraestructura sino todo el ecosistema que la rodea. En esta publicación, exploro como este objetivo puede verse en dificultades y luego expongo soluciones que pueden ayudar a prevenirlo.

**Contexto**: nuestra vida diaria depende en gran medida de sistemas complejos, que funcionan a gran escala y son intensivos en software. Tales como sistemas para compras y pagos, el suministro de energía y agua, la producción de alimentos y, en estos días de pandemia, aplicaciones de comunicación que nos permiten trabajar de forma remota. Estos sistemas operan en un entorno de disponibilidad continua, que resulta difícil de mantener y evolucionar dados cambios inevitables ya sea en los objetivos de las organizaciones o en los requisitos del sistema. El pilar fundamental detrás de todos estos sistemas es la arquitectura de software [1]. Esta tiene un efecto profundo en la calidad de lo que se construye sobre ella. Podemos ver la arquitectura de software como una serie de decisiones, enlazadas unas con otras. Diversos factores desgastan o empobrecen la arquitectura de un sistema, que pueden terminar en un software tedioso de mantener, incapaz de evolucionar y que le otorgamos la etiqueta de software legado.

**Problema**: El diseño, desarrollo y mantenimiento de software de alta calidad sigue siendo un problema muy desafiante, que exige sincronización y una sólida comunicación entre ingenieros y expertos de dominio en las organizaciones. Un estudio concluyó que aproximadamente entre 50-70% del costo del ciclo de vida de un sistema se gasta en su evolución y mantenimiento [2]. Este problema no es [nuevo] (<https://es.wikipedia.org/wiki/Crisis_del_software>) pero se ve acentuado en esta era donde los despliegues de los sistemas son continuos, donde muchos se reconfiguran varias veces en el lado del cliente (aplicaciones móviles, SPAs, WPAs actualizados en cualquier momento), o en el lado del servidor (servicios desplegados continuamente gracias a proveedores de nube de terceros). Este ciclo continuo de redespliegue se ve afectado por la preparación que tengan los sistemas para integrar nuevos cambios que deben satisfacerse a veces en horas o días. Un sistema que no está preparado para ciclos de integración continua exigirá cada vez más tiempo en corregir fallos que reaparecen en partes estables en lugar de integrar nuevas funcionalidades [2]. Diseñar sistemas de software que sean sostenibles y que perduren es uno de los mayores problemas a resolver en el campo de la ingeniería de software.

## Erosión de la arquitectura de software

Los sistemas de software dependen directamente de su diseño arquitectónico para garantizar su uso a largo plazo, un mantenimiento eficiente y una evolución adecuada. Una arquitectura erosionada surge cuando el código fuente se vuelve subóptimo en comparación con la arquitectura diseñada [3]. Este problema se produce por la adición, eliminación o modificación no sistemática y no intencionada de decisiones de diseño de la arquitectura. Aquí algunas suposiciones en torno a la erosión de las cuales podríamos no ser consientes y valen la pena saber:

- La erosión solo ocurre durante la fase de mantenimiento: la erosión puede ocurrir tan pronto como se elija la arquitectura y antes de que comience el diseño detallado y la implementación.
- La erosión es un efecto lento y gradual durante un tiempo prolongado: la erosión rápida puede ocurrir durante los períodos de sprint donde se están produciendo cambios significativos como actualizaciones, cambios de plataforma o cambios en la interfaz de usuario en intervalos de tiempo cortos.
- La erosión se produce únicamente por efectos no deseados asociados con el mantenimiento: la erosión puede ser intencional e incluso planificada. Puede ocurrir cuando se acepta incurrir en "deuda técnica" en pro de avanzar con los requerimientos a corto plazo y luego "arreglar" la arquitectura más adelante, generalmente cuando el equipo tenga más tiempo.

**Solución:** A pesar de que no sea posible enumerar y detallar todos los requisitos para que un sistema perdure y evolucione a lo largo del tiempo, si podemos seguir unas reglas generales que nos ayudarán a detectar a tiempo y prevenir la erosión en las arquitecturas de nuestros sistemas:

- Ten cuidado con los anti-patrones de las arquitecturas que hayas implementado en tu sistema. Implementa una estrategia clara de revisiones de código y revisión de pares para validar cualquier nuevo bloque de código. Puedes usar [Gerrit] (<https://www.gerritcodereview.com/>) pero hay muchas opciones y muchas de ellas son excelentes.
- Métricas de código y arquitectura: Implementa analizadores estáticos que estimen la complejidad, el acoplamiento, la cohesión y las dependencias entre módulos. Ya que las métricas proporcionan indicadores significativos sobre la calidad del código y sirven para estimar los ratios de deuda técnica.
- Documenta cada decisión de arquitectura. La documentación debe ser clara, seguir los estándares de documentación y estar al alcance de todos.
- Cosas como elementos huérfanos dentro del código fuente, código duplicado o “elementos clonados”, mayor acoplamiento, menor cohesión y exceso de herencia entre clases son señales claras de erosión.
- Adhiérete a los principios de diseño establecidos en arquitecturas de referencia, estas proporcionan un vocabulario común y una solución conocida y soportada por la comunidad. Esto trae beneficios significativos, como por ejemplo una reducción en el costo y el esfuerzo relacionados con el mantenimiento y la evolución del software.

Los anteriores son métodos de prevención que sirven para evitar la erosión, pero cuando el código ya está erosionado necesitamos implementar métodos de recuperación. La recuperación requiere encontrar los elementos del software que ha sufrido erosión y emplear métodos para reparar esos elementos. Los métodos de reparación convencionales implican refactorizar el software, el componente o el módulo.

Dejaré la conversación a detalle de los métodos de recuperación para la siguiente publicación de esta saga. Muchas gracias por leer, espero que te haya sido de provecho y hasta la próxima.👋

## Referencias

[1] Ingeno, J. (2018). Software Architect’s Handbook: Become a successful software architect by implementing effective architecture concepts. Packt Publishing Ltd.

[2] J. Garcia, I. Ivkovic and N. Medvidovic, "A comparative analysis of software architecture recovery techniques," 2013 28th IEEE/ACM International Conference on Automated Software Engineering (ASE), pp. 486-496, 2013.

[3] Andrews, S., & Sheppard, M. (2020). Software architecture erosion: Impacts, causes, and management. International Journal of Computer Science and Security, 14, 82-93.
