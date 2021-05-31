---
title: "Poniendo en practica los conceptos de DDD en nestjs"
date: '2021-01-30'
layout: post
draft: false
category: "Development"
tags:
  - "Node"
  - "Nestjs"
  - "DDD"
description: "Una aplicación modular que sigue los principos del DDD usando Nestjs"
---

Esta mañana, cuando comencé a pensar en esta publicación, me preguntaba acerca de preguntarle a la audiencia las cosas que quieren ver en un proyecto de demostración centrado en el diseño basado en dominios, pero mi blog es demasiado nuevo y tiene pocos visitantes. Quiero tener un blog dinámico, hasta eso, una cosa que puedo hacer y tal vez podría ayudarte (lector ocasional) es crear una lista de las cosas que quiero lograr con este proyecto.

## Cosas que quiero lograr con este proyecto

- Seguir los principios de Domain Drive Design. Quiero emular conversaciones con expertos del dominio, desarrollar un lenguaje ubicuo, delimitar contextos acotados, etc.
- Implementar patrones de referencia para servicios backend, como CQRS, Event Sourcing.
- Construir un monolito, pero modular.
- Aplicar buenas prácticas como KISS, SOLID y desarrollar bajo TDD.

## Tecnologías que quiero usar

- TypeScript + Nestjs + Docker. Creo que va a ser agradable, me preguntaba si usar .NET pero creo que hay muchos buenos ejemplos construidos en este momento.
- API de CosmosDB + Mongo.
- TypeScript + Reaccionar + Siguiente.
- Azure como infraestructura en la nube.

## Dominio

Esta es una aplicación para la gestión de proyectos bajo la metodología Agile. Publicaré regularmente aquí, pero también puedes comprobar los avances en este [repositorio](https://github.com/jsantanders/modular-monolith-nestjs).
