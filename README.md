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

Vanilla JavaScript/TypeScript

```shell
import Messenger, { MessangerConfig } from './component/index';

const config: MessangerConfig = {
  holder: 'messenger',
  title: "Open Ai"
};

const messengerElement = document.createElement('div');
messengerElement.id = config.holder;

document.getElementById('app')!.appendChild(messengerElement);

new Messenger(config);

```

Vue JS

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
    const options = {
      title: 'Messenger Title Vue',
      holder: 'messanger',
    };
    new Messenger(options);
});
</script>

```

React JS

```shell
import React, { useEffect } from 'react';
import {Messenger } from 'messanger-ai';
import 'messanger-ai/style.css';

const App = () => {
  useEffect(() => {
    const config = {
      holder: 'messanger',
      title: 'React App Ai',
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