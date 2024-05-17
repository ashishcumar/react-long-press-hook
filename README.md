# 📱 react-long-press-hook

Unlock the power of long-press interactions with `react-long-press-hook`! 🚀 This lightweight and highly customizable React hook lets you easily detect and handle long-press events in your applications. Whether you’re looking to enhance your UI with context menus, drag-and-drop functionality, action confirmations, or interactive tutorials, `react-long-press-hook` has got you covered.

## ✨ Features

- 🔧 **Customizable**: Easily configure thresholds, prevent default behavior, and more.
- 🪶 **Lightweight**: Minimal impact on your bundle size.
- 👐 **Accessible**: Works with both touch and mouse events.
- ⚡ **Efficient**: No unnecessary re-renders or performance hits.

## 📦 Installation

```bash
npm install react-long-press-hook
```
or 
```bash
yarn add react-long-press-hook
```

## 📚 Use Cases

### 📜 Context Menus
Enable context menus on long-press to provide users with additional options or actions.

### 🖱️ Drag-and-Drop
Implement drag-and-drop functionality where a long-press initiates the dragging action.

### ✅ Action Confirmations
Use long-press to confirm actions, such as deleting an item, to prevent accidental taps.

### 🎓 Interactive Tutorials
Create interactive tutorials that require users to long-press on elements to reveal tips or further instructions.

### 🕹️ Custom Gesture Controls
Develop custom gesture controls for touch interfaces, enhancing user interaction on mobile devices.

### 🎮 Game Mechanics
Incorporate long-press actions as part of game mechanics, such as charging a power-up or revealing hidden objects.

## 🚀 Usage
Here is a basic example of how to use the useLongPress hook in your React application:

```
import React, { useState } from 'react';
import { useLongPress } from 'react-long-press-hook';

const App = () => {
  const [message, setMessage] = useState('');

  const onLongPress = () => {
    setMessage('Long press detected!');
  };

  const onPressHold = () => {
    setMessage('Press and hold in progress...');
  };

  const onPressRelease = () => {
    setMessage('Press released');
  };

  const longPressEvent = useLongPress(onLongPress, {
    onStart: onPressHold,
    onFinish: onPressRelease,
    threshold: 2000, // milliseconds
    preventDefault: true,
    cancelOnMove: true,
  });

  return (
    <div>
      <button {...longPressEvent}>Long Press Me</button>
      <p>{message}</p>
    </div>
  );
};

export default App;

```

## 📚 API

## `useLongPress(callback, options)`

### Parameters
- `callback` (`function`): The function to call when a long-press is detected.
- `options` (`object`): Configuration options for the hook.
  - `onStart` (`function`): Function to call when the press starts.
  - `onFinish` (`function`): Function to call when the press ends.
  - `threshold` (`number`): Time in milliseconds to detect a long-press. Default is 300.
  - `preventDefault` (`boolean`): Whether to prevent the default context menu on long-press. Default is true.
  - `cancelOnMove` (`boolean`): Whether to cancel the long-press if the pointer moves. Default is false.
  - `stopPropagation` (`boolean`): Whether to stop event propagation. Default is false.

### Returns
`handlers` (`object`): Event handlers to spread on the target element.

## Check Out My Other Packages

Explore more useful packages by visiting [my npm profile](https://www.npmjs.com/~iashish.99). Made with ❤️ by Ashish

