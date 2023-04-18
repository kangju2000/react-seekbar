<div style="border: 1px solid gray; border-radius: 10px; text-align: center">
<p style="font-size: 30px; font-weight: bold; margin-bottom: -5px;">react-seekbar</p>
<p>UI component for selecting values by dragging a bar</p>
</div>
<br>

# Preview

![](https://user-images.githubusercontent.com/23312485/232731418-940e36ef-5517-4ea6-955c-97e5f86628ac.gif)

[Storybook](https://6434e787cec6a786dfbadf52-ibqpiyyfop.chromatic.com/?path=/docs/example-seekbar--docs)

# Usage

install

```bash
  npm install react-seekbar
  yarn add react-seekbar
```

```typescript
import { useState } from 'react';
import { Seekbar } from 'react-seekbar';

export default function YourComponent() {
  const [position, setPosition] = useState(0);

  const handleSeek = (position) => {
    setPosition(position);
  };

  return <Seekbar position={position} duration={100000} onSeek={handleSeek} />;
}
```
