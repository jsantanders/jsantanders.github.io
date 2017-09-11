---
layout: post
title: Determinar intersección de rangos mediante LINQ en C# utilizando expresiones lambda
comments: true
tags: [C#, NET, Espaniol]
category: Web-development
---

Una de las caracteristicas más poderosas que tiene C# es el lenguaje integrado de consultas o LINQ,(que también existe para Visual Basic y F# este último a través de las query expression). Donde podemos facilmente hacer consultas como una construcción del lenguaje en vez de simples cadenas de texto, permitiendonos usar palabras claves del lenguaje y operadodes con los que se están familiarizados. Además de realizar una comprobación de tipos en tiempo de compilación, ayudados con el IntelliSense. <!--break--> 

Una de las cosas más básicas de las múltiples que podemos hacer es filtrar listas de datos. Que pueden ir desde un simple **Where** hasta construcciones avanzadas de filtros. El día de hoy vamos a ver como determinar si dentro de una lista con rangos (cantidad mínima y  cantidad máxima) existe una sobreposición de esos valores, es decir rangos que se intersectan. 

Nuestro ejemplo será sobre una aplicación de descuentos para compras de items, es decir sí una persona se lleva de 1 a 3 items, tendrá un 2% de descuento sobre la compra, si se lleva de 4 a 9 un 3% y de 10 en adelante un 5%, la idea es estos rangos de items no se intersecten para que el cliente solo pueda aplicar en una única promoción. Para ello crearemos una aplicación de consola, vamos al Visual Studio Code, abrimos la términal integrada y tecleamos **dotnet new console**. 

Para ejemplificar mejor sírvase la siguiente figura, lo que queremos hacer es detectar cuando un rango está intersecto a otro.

<div class="main_block">
    <img src="/images/linqpost/rangos.png" alt="Rangos">
    <div class='captione'>Ejemplo de rangos</div>
</div>

Vamos a utilizar una clase, que sirva como modelo de las promociones

{% highlight c# %}
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System;

namespace Modelo
{
    public class Promocion
    {
        public string descripcion { get; set; }
        public DateTime fechaInicio { get; set; }
        public DateTime fechaFin { get; set; }
        public int cantMinima { get; set; }
        public int cantMaxima { get; set; }
        public bool sinCantidadMax { get; set; } = false;
        public string identificador { get; }
        public double descuento { get; set; }

        public Promocion()
        {
            this.identificador =  Guid.NewGuid().ToString();
        }

        public static bool Overlaps(IEnumerable<Promocion> listaDePromociones, Promocion promocionInsertar)
        {
            //Convirtieno a "infinito" si no tiene rango máximo
            promocionInsertar.cantMaxima = promocionInsertar.sinCantidadMax ? int.MaxValue : promocionInsertar.cantMaxima;
            listaDePromociones.Where(d => d.sinCantidadMax).ToList().ForEach(s => s.cantMaxima = int.MaxValue);
            //Comparación de los rango sobrepuestos
            bool isOverlaps = listaDePromociones.Where(d => d.identificador != promocionInsertar.identificador).Any(x =>
                         (x.cantMinima >= promocionInsertar.cantMinima && x.cantMinima <= promocionInsertar.cantMaxima)
                      || (x.cantMaxima >= promocionInsertar.cantMinima && x.cantMaxima <= promocionInsertar.cantMaxima)
                      || (x.cantMinima < promocionInsertar.cantMinima && x.cantMaxima > promocionInsertar.cantMaxima));

            return isOverlaps;
        }
    }
}
{% endhighlight %}

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

Para restaurar también podemos ejecutar el comando ```donet restore``` desde la consola o mediante la combinación de teclas **Ctrl+shift+P** escribiendo .net y seleccionando la opción de restaurar. Con esto ya podemos comenzar a programar nuestra aplicación web. Visual Studio Code viene con debugger incluido, y quizás te estés preguntando ¿Cómo funciona sin IIS? Bueno, lo cierto es que ASP Core incluye Kestrel como servidor, así que como les dije, es un entorno muy completo que en los próximos posts quiero ir detallando y poniendo en marcha varios ejemplos.
