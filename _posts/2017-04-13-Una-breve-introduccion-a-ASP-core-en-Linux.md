---
layout: post
title: Introducción a ASP Core utilizando VS Code en Linux
comments: true
tags: [ASP, NET, Espaniol,]
category: Web-development
---

Hace 2 años atrás ¿Quién hubiese imaginado que Microsoft iba a apostar tan fuerte por el Open Source liberando parte de su framework .NET? Esto surgió gracias al cambio de filosofía de la empresa y quienes hemos salido beneficiados en el proceso somos los desarrolladores, porque una de las cosas que se le exijía al de por sí completisimo **C#** era ser multiplataforma, que si bien la gente Mono ha hecho un excelente trabajo hacía falta ese soporte oficial. 

Exploremos ahora como crear un proyecto en ASP Core utilizando el flameante editor Open Source **Visual Studio Code** (¿Tendremos pronto a Visual Studio en Linux?), lo primero que hay que tener en cuenta son las herramientas necesarias:

- [El SDK de .NET Core](https://www.microsoft.com/net/core), en la página web están descritos los pasos para su instalación en los sabores más utilizados de GNU/Linux. En mi caso, utilizo Ubuntu Gnome y el proceso es el típico: Añadimos el PPA, actualizamos e instalamos el paquete dotnet.

- [Visual Studio Code](https://code.visualstudio.com/), no es un requisito pero sí una recomendación, poco a poco iremos explorando las bondades de este editor que nada tiene que envidiarle a editores de código como Atom o Sublime Text.


<div class="main_block">
    <img src="/images/aspcorepost/vscode.png" alt="VS Code">
    <div class='captione'>Interfaz de Visual Studio Code</div>
</div>


Junto con Visual Studio Code también nos van a facilitar el trabajo los siguientes pluggins:

- [OmniSharp](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp): Es un completo IntelliSense y Debugger para C# que se acopla muy bien a .NET Core.

- [C# Extensions](https://marketplace.visualstudio.com/items?itemName=jchannon.csharpextensions): Permite añadir herramientas propias de un IDE a nuestro flujo de trabajo en C#, facilitandonos la vida.

Para instalar los pluggins basta con teclear **Ctrl+Shift+X** en Visual Studio Code, escribir el nombre del pluggin en el cuadro de busqueda y luego seleccionar instalar. Una vez listas nuestras herramientas desde la consola o desde el mismo editor creamos una carpeta que es la que va a contener los archivos de nuestra aplicación Web.

Para crear la carpeta desde el editor tecleamos **Ctrl+`** o nos dirigimos a la pestaña **ver > Terminal Integrado** y en la consola creamos una nueva carperta

<div class="main_block">
    <img src="/images/aspcorepost/console.png" alt="Consola">
    <div class='captione'>Consola de VS code</div>
</div>

Luego, generamos la plantilla inicial de nuestra aplicación web con el comando ```donet new mvc``` Una vez realizado este paso abrimos la carpeta desde **Archivo > Abrir Carpeta** O presionando la combinación de teclas **ctrl+A** y **ctrl+O**. Seleccionamos el archivo StartUp.cs y VS Code mostrará la siguiente imagen, hay que presionar Yes y Restore

<div class="main_block">
    <img src="/images/aspcorepost/restore.png" alt="restore">
    <div class='captione'>Restaurar paquetes</div>
</div>

Para restaurar también podemos ejecutar el comando **donet restore** desde la consola o mediante la combinación de teclas **Ctrl+shift+P** escribiendo .net y seleccionando la opción de restaurar. Con esto ya podemos comenzar a programar nuestra aplicación web. Visual Studio Code viene con debugger incluido, y quizás te estés preguntando ¿Cómo funciona sin IIS? Bueno, lo cierto es que ASP Core incluye Kestrel como servidor, así que como les dije, es un entorno muy completo que en los próximos posts quiero ir detallando y poniendo en marcha varios ejemplos.
