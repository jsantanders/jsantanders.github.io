---
title: Unicidad de correo electrónico en Azure AD B2C
date: '2020-08-02'
spoiler: un único correo electrónico para gobernarlos a todos.
layout: post
draft: false
category: "Azure"
tags:
  - "AD B2C"
  - "Authentication providers"
  - "Cloud"
description: "Una característica importante que no está implementada en Azure AD B2C es 
garantizar la unicidad del correo electrónico a través de todos los proveedores de identidad 
de nuestros clientes. En este artículo se explora un método para garantizarlo."
---

Azure AD B2C tiene el potencial de ser un producto excelente, pero todavía le quedan muchas cosas por mejorar,
algunas pueden ser determinantes a la hora de decantarse por otra solución. A continuación, enumero las que yo
considero son las que más pueden hacerte reconsiderar B2C:

- A la fecha de hoy no es posible utilizar dominios personalizados, y tus clientes tienen que seguir el flujo
de autenticación a través de **subdominio**.b2clogin.com. Lo cual me parece que genera desconfianza,
puesto que muchos usuarios han aprendido a evitar el phishing fijándose en la URL de la aplicación.

- Los flujos de autenticación preconstruidos no son óptimos para integrarse con aplicaciones reales, a mi parecer
solo sirven para pruebas de concepto y primer contacto con el producto. Pero una vez que empiezas a hacer uso intensivo
dentro de tu aplicación es necesario pasar por los flujos personalizados, lo cual requiere de mucha más experticia por
parte del equipo de desarrolladores.

- La documentación es muy dispersa y en algunos casos incompleta, en comparación, proveedores como Auth0 tienen ejemplos 
en GitHub para todos los frameworks y cuentan con documentación muy detallada.

Si lo anterior no te desanima, o estás dispuesto a esperar a que el equipo de Microsoft encargado de AD B2C resuelva estos 
desperfectos (el primer punto tiene desde el 2017), entonces tienes frente de ti un proveedor de identidad con un precio muy competitivo (primeros 50000 usuarios gratuitos) y que si el resto de la infraestructura de tu aplicación está en Azure resulta práctico.

Un escenario que enfrentarás a la hora de desarrollar tus políticas personalizadas es garantizar unicidad del correo electrónico con el que se registran tus usuarios. Ya sea a través de un proveedor externo (Google, Facebook, etc.) o una cuenta local. Puesto que de permitir registrar usuarios con el mismo correo, pero diferentes proveedores tus usuarios se pueden confundir, pensando que las cuentas que han creado están enlazadas (te adelanto que enlazar cuentas se puede hacer y será tema para otro [post](/link-b2c-local-accounts/)).

Para este ejercicio voy a asumir que estás familiarizado con los detalles básicos de las políticas personalizadas y que conoces este [set](https://github.com/Azure-Samples/active-directory-b2c-custom-policy-starterpack) propuesto por Microsoft, sino te recomiendo empezar por este [enlace](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-get-started). Lo primero que haré es identificar un posible flujo no deseado, y de ahí partiremos a la solución.

- Un usuario se registra con correo y contraseña.

- Ese usuario al iniciar sesión decide usar Google, piensa que su cuenta será enlazada.

- Nuestro flujo, al no tener registro del usuario con ese correo y como proveedor Google lo invita a registrarse.

- El usuario sigue el flujo de registro con Google.

- Existen dos cuentas independientes con el mismo correo electrónico, pero con distintos proveedores.

- Caos.

Para solventar este inconveniente hay que crear un `OrchestrationStep` que valide a través de un `TechnicalProfile` que el correo electrónico no se encuentre registrado localmente o con otro proveedor de identidad. Para ello lo primero que tenemos que crear los siguientes `ClaimType`.

```xml
<ClaimsSchema>
  <ClaimType Id="tempObjectId">
    <DisplayName>User's Object ID</DisplayName>
    <DataType>string</DataType>
    <UserHelpText>Object identifier (ID) of the user object in Azure AD.</UserHelpText>
  </ClaimType>

  <ClaimType Id="userMessage">
    <DisplayName>Error</DisplayName>
    <DataType>string</DataType>
    <UserInputType>Paragraph</UserInputType>
  </ClaimType>
</ClaimsSchema>
```
Estos `ClaimTypes` puedes agregarlos en el archivo `TrustFrameworkExtensions.xml` o directamente en tu política, si lo agregas en el primero tendrás la ventaja de que podrás reutilizarlo en tus otras políticas, pero piénsalo bien porque puedes terminar con un archivo `TrustFrameworkExtensions.xml` muy extenso y complicado de mantener. 

Lo siguiente que necesitamos crear es un `ClaimTransformation` que cree el mensaje de error con el email que está tratando de registrar el usuario.

```xml
<ClaimsTransformations>
    <!--Demo: this claims transformation populates the userMessage with the text we want to show to the end user-->
  <ClaimsTransformation Id="CreateTheUniqueEmailErrorMessage" TransformationMethod="FormatStringClaim">
    <InputClaims>
      <InputClaim ClaimTypeReferenceId="email" TransformationClaimType="inputClaim" />
    </InputClaims>
    <InputParameters>
      <InputParameter Id="stringFormat" DataType="string" Value="You aleady have an account with {0} email address" />
    </InputParameters>
    <OutputClaims>
      <OutputClaim ClaimTypeReferenceId="userMessage" TransformationClaimType="outputClaim" />
    </OutputClaims>
  </ClaimsTransformation>
</ClaimsTransformations>   
```

Con esto listo, es momento de crear el `TechnicalProfile` que validará que el correo no esté ya registrado.

```xml
<ClaimsProvider>
  <DisplayName>Self Asserted</DisplayName>
  <TechnicalProfiles>
    <!--Demo: this technical profile displays the message to the user-->
    <TechnicalProfile Id="SelfAsserted-UniqueUserMessage">
      <DisplayName>Password reset</DisplayName>
      <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.SelfAssertedAttributeProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
      <Metadata>
        <Item Key="ContentDefinitionReferenceId">api.selfasserted</Item>
        <!--Demo: hide the continue and cancel buttons -->
        <Item Key="setting.showContinueButton">false</Item>
        <Item Key="setting.showCancelButton">false</Item>
      </Metadata>
      <InputClaimsTransformations>
        <InputClaimsTransformation ReferenceId="CreateTheUniqueEmailErrorMessage" />
      </InputClaimsTransformations>
      <InputClaims>
          <InputClaim ClaimTypeReferenceId="userMessage" />
      </InputClaims>
      <OutputClaims>
        <!--Demo: Show the paragraph claim with the message to the user -->
        <OutputClaim ClaimTypeReferenceId="userMessage" />
      </OutputClaims>
      <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop" />
    </TechnicalProfile>
  </TechnicalProfiles>
</ClaimsProvider>
```

Y ahora solo nos resta incluirlo en el `UserJourneys` como un `OrchestrationStep` y tendremos listo nuestro flujo de registro y autenticación que garantiza la unicidad del correo electrónico. 

```xml
<!-- Demo:  Run this step only if email address is empty and new user.
			      The technical profile checks if there is another local account with same email address.-->
<OrchestrationStep Order="6" Type="ClaimsExchange">
  <Preconditions>
    <Precondition Type="ClaimsExist" ExecuteActionsIf="true">
      <Value>objectId</Value>
      <Action>SkipThisOrchestrationStep</Action>
    </Precondition>          
    <Precondition Type="ClaimsExist" ExecuteActionsIf="false">
      <Value>tempObjectId</Value>
      <Action>SkipThisOrchestrationStep</Action>
    </Precondition>
  </Preconditions>
  <ClaimsExchanges>
    <ClaimsExchange Id="SelfAsserted-UniqueUserMessage" TechnicalProfileReferenceId="SelfAsserted-UniqueUserMessage" />
  </ClaimsExchanges>
</OrchestrationStep>
```
Para que el post no resultara tedioso me tomé la libertad de solo incluir las partes más relevantes, pero puedes examinar el código con más detalle desde el siguiente [repositorio](https://github.com/azure-ad-b2c/samples/tree/master/policies/force-unique-email-across-social-identities). Aunque el escenario optimo hubiese sido permitirles a los usuarios enlazar su cuenta local con proveedores externos, con esto garantizamos que no exista confusión entre los usuarios a la hora de registrarse.
