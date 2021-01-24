---
title: Ensuring email uniqueness in Azure AD B2C
date: '2021-01-16'
layout: post
draft: false
category: 'Cloud'
tags:
  - 'AD B2C'
  - 'Authentication providers'
  - 'Azure'
description: "An important feature that isn't implemented in Azure AD B2C is ensuring email uniqueness across all identity providers (Google, Microsoft, Facebook). This article explores a method to ensure this."
---

Azure AD B2C has the potential to be a great product, but it still has a lot to improve, some [drawbacks](https://www.azurefromthetrenches.com/azure-ad-b2c-a-painful-journey-goodbye-for-now/) and you could ending choosing another solution. Below, I list the ones that II think are the ones that can make you reconsider using B2C:

- Until today it is not possible to use [custom domains](https://feedback.azure.com/forums/169401-azure-active-directory/suggestions/15334317-customer-owned-domains), and final users have to follow the authentication flow through **subdomain**. B2clogin.com. This seems to me to generate mistrust since many users have learned to avoid phishing by looking at the application's URL.
- The pre-built authentication flows are not optimal to integrate with real applications, in my opinion, they only serve as proofs of concept and first contact with the product. But once you start to make intensive use of your application it's necessary to go through the custom flows, which requires much more expertise.
- The documentation is very sparse and in some cases incomplete, in comparison, providers like Auth0 have examples on GitHub for all frameworks and have very detailed documentation.

If the above does not discourage you, or you are willing to wait for the Microsoft team in charge of AD B2C to resolve these issues (the first point has since 2017), then you have in front of you an identity provider with a very competitive price (first 50,000 users for free).

One scenario that you will face when developing your personalized policies is guaranteeing the uniqueness of the email with which your users register. Either through an external provider (Google, Facebook, etc.) or a local account. Since it allows users to register with the same email, but different providers, your users can be confused, thinking that the accounts they have created are linked.

I'm going to assume that you are familiar with the basic details of custom policies and that you know this [set](https://github.com/Azure-Samples/active-directory-b2c-custom-policy-starterpack) proposed by Microsoft. If not I recommend you start with this [link](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-get-started). Now, The first thing I will do is identify a possible unwanted flow:

- An user registers with email and password.
- That user when logging in decides to use Google, he thinks that his account will be linked.
- Our flow, by not having user registration with that email with Google as the provider, invites you to register.
- The user follows the registration flow with Google.
- There are two independent accounts with the same email, but with different providers (local, and Google).

To solve this problem, we need to create an `OrchestrationStep` that validates through a`TechnicalProfile` that the email is not registered locally or with another identity provider. To do this, the first thing we have to create the following `ClaimType`:

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

These `ClaimTypes` can be added in the `TrustFrameworkExtensions.xml` file or directly in your policy, if you add it in the first you will have the advantage that you can reuse it in your other policies, but think about it because you can end up with a `TrustFrameworkExtensions. xml` very long and difficult to maintain. The next thing we need to create is a `ClaimTransformation` that creates the error message with the email that the user is trying to register:

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

With this ready, it is time to create the `TechnicalProfile` that will validate that the email is not already registered:

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

And now we only have to include it in the `UserJourneys` as an `OrchestrationStep` and we will have ready our registration and authentication flow that guarantees the uniqueness of the email:

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

To make short this post I only included the most relevant parts, but you can look the code in the following [repository](https://github.com/azure-ad-b2c/samples/tree/master/policies/force-unique-email-across-social-identities).
