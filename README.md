<div align="center">
<h1>react-seekbar</h1>
UI component for selecting values by dragging a bar
</div>
<br>

## Preview
![](https://user-images.githubusercontent.com/23312485/232731418-940e36ef-5517-4ea6-955c-97e5f86628ac.gif)

### installation
```bash
  npm install react-seekbar
  
  yarn add react-seekbar
```

## Usage
docs and example usage can be found [here](https://6434e787cec6a786dfbadf52-btnfbflrxt.chromatic.com/?path=/docs/example-seekbar--docs)
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
