---
title: "Probando APIs HTTP con gRPC para ASP.NET Core"
date: '2021-01-09'
layout: post
draft: false
category: "Development"
tags:
  - ".NET"
  - "ASP.NET"
  - "gRPC"
description: "Creación de APIs HTTP a través de servicios gRPC."
---

Hasta ahora gRPC representa una alternativa que sigue ganando peso entre las comunicaciones de microservicios y backend-to-backend. A mi me recuerda a WFC (salvando las distancias) pero de código abierto y sin la complejidad añadida del protocolo SOAP. Y es que al utilizar HTTP/2 y Protobuf proporciona soporte directo para autenticación, streaming bidireccional, serialización binaria, cancelación o timeouts, además de otras características. Y es esto su mayor virtud, pero también su mayor condicionante a la hora de implementarlo en la web, debido  a que los exploradores web aún no soportan completamente HTTP/2.

Existen diversas soluciones que buscan llevar gRPC a la web tradicional, algunas implementan proxies que van entre el servicio y el cliente web.

![gRPC with proxy. Caption: “proxy example.”](./proxy.png)

Pero la solución que ofrece el paquete gRPC HTTP API está alojada directamente por ASP y junto a los servicios gRPC. Resulta muy útil cuando queremos ofrecer una RESTful API utilizando los servicios gRPC que ya tenemos configurados.

## Primeros pasos

- Sino tienes un proyecto con gRPC puedes crear uno mediante la plantilla de Visual Studio o directamente desde la consola (net5) `dotnet new grpc` También puedes seguir este [tutorial](https://docs.microsoft.com/en-us/aspnet/core/tutorials/grpc/grpc-start?view=aspnetcore-5.0&tabs=visual-studio).
- Ahora tienes que añadir los paquetes *Microsoft.AspNetCore.Grpc.HttpApi*  y registrarlo en el Startup.cs con *services.AddGrpcHttpApi()*.
- El último paso es anotar tus archivos `.proto` con las rutas y los prefijos HTTP.

**Nota**: Las anotaciones definen como los servicios gRPC se mapean con las peticiones y respuestas JSON. Vas necesitar añadir e importar "google/api/annotations.proto"; al archivo .proto y tener una copia de [annotations.proto](https://github.com/aspnet/AspLabs/blob/12d388c1964c8844dcbbdcd643f8bd7c6423a4c4/src/GrpcHttpApi/sample/Proto/google/api/annotations.proto) and [http.proto](https://github.com/aspnet/AspLabs/blob/12d388c1964c8844dcbbdcd643f8bd7c6423a4c4/src/GrpcHttpApi/sample/Proto/google/api/http.proto) in your project.

```csharp
syntax = "proto3";

import "google/api/annotations.proto";

package greet;

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply) {
    option (google.api.http) = {
      get: "/v1/greeter/{name}"
    };
  }
  rpc SayHelloFrom (HelloRequestFrom) returns (HelloReply) {
    option (google.api.http) = {
      post: "/v1/greeter"
      body: "*"
    };
  }
}

message HelloRequest {
  string name = 1;
}

message HelloRequestFrom {
  string name = 1;
  string from = 2;
}

message HelloReply {
  string message = 1;
}
```

## Enlaces de interés

- [Github del paquete](https://github.com/aspnet/AspLabs/tree/master/src/GrpcHttpApi).
- [Nuget](https://www.nuget.org/packages/Microsoft.AspNetCore.Grpc.HttpApi).
- [Post del autor](http://james.newtonking.com/archive/2020/03/31/introducing-grpc-http-api).
- [Documentación oficial](https://docs.microsoft.com/en-us/aspnet/core/grpc/httpapi?view=aspnetcore-5.0).

He creado un proyecto donde incluyo además de este paquete, Docker, frontend con React usando los mismos protos para la generación de los modelos, SQL Server y Entity Framework. Puedes verlo en este [enlace](https://github.com/jsantanders/todoapp).
