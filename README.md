# Messenger AI

Messenger AI is a package that provides a simple messenger component for web applications. It allows you to easily add a messenger feature to your projects.

## Installation

You can install the package via npm or yarn:

```shell
npm install messanger-ai

or

yarn add messanger-ai

```
## Usage

Vanilla TypeScript

```shell
import Messenger, { MessangerConfig } from './component/index';

const config: MessangerConfig = {
  holder: 'messenger',
  name: "Open Ai",
  token: 'GPT TOKEN'

};

const messengerElement = document.createElement('div');
messengerElement.id = config.holder;

document.getElementById('app')!.appendChild(messengerElement);

new Messenger(config);

```

## Vue JS

```shell
<template>
  <div>
    <div id="messanger"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Messenger } from 'messanger-ai';
import 'messanger-ai/style.css';


onMounted(() => {
    const config = {
      holder: 'messanger',
      name: 'Open Ai',
      token: 'GPT TOKEN'

    };
    new Messenger(options);
});
</script>

```

## React JS

```shell
import React, { useEffect } from 'react';
import {Messenger } from 'messanger-ai';
import 'messanger-ai/style.css';

const App = () => {
  useEffect(() => {
    const config = {
      holder: 'messanger',
      name: 'Open Ai',
      token: 'GPT TOKEN'
    };
    const messenger = new Messenger(config); // Use the correct path to the default object
    
    return () => {
      // Clean up on component unmount, if necessary
      // For example: messenger.destroy();
    };
  }, []);

  return (
    <div>
      <div id="messanger"></div>
    </div>
  );
};

export default App;
```

## Config
```shell
It is an object containing information about an AI profile. It has the following properties:
- holder: 'element_id', // ID of the HTML element that should contain the AI messenger
- name: 'AI Name', // The name of the AI
- picture: 'URL_to_picture', // The URL to the AI's picture
- token: 'CHATGPT_TOKEN' // The token required for interacting with the ChatGPT
- socials: [{link:'',type:''}] // your social medias

The socials property is an array that contains objects representing different social media platforms associated with the AI. Each object has two properties:

- link (string): The link to the  profile on a specific social media platform.
- type (string): The type of social media platform. It can be one of the following values: "instagram", "telegram", "facebook", or "twitter".

Here's an example of how to use the `options` object:


```
## Example of Socials

```javascript
  socials: [
    { link: "https://instagram.com/name_of_account", type: "instagram" },
    { link: "https://t.me/name_of_account", type: "telegram" },
    { link: "https://facebook.com/name_of_account", type: "facebook" },
    { link: "https://twitter.com/name_of_account", type: "twitter" }
  ]
```
