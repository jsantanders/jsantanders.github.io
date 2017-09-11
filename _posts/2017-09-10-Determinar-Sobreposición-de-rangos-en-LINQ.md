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
            promocionInsertar.cantMaxima = promocionInsertar.sinCantidadMax ? 
            int.MaxValue : promocionInsertar.cantMaxima;
            
            listaDePromociones.Where(d => d.sinCantidadMax).ToList().ForEach(s => s.cantMaxima = int.MaxValue);
            bool isOverlaps = listaDePromociones.Where(d => d.identificador != promocionInsertar.identificador).Any(x =>
                         (x.cantMinima >= promocionInsertar.cantMinima && x.cantMinima <= promocionInsertar.cantMaxima)
                      || (x.cantMaxima >= promocionInsertar.cantMinima && x.cantMaxima <= promocionInsertar.cantMaxima)
                      || (x.cantMinima < promocionInsertar.cantMinima && x.cantMaxima > promocionInsertar.cantMaxima));

            return isOverlaps;
        }
    }
}
{% endhighlight %}


