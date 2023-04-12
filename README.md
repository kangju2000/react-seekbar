# Preview
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

  return (
    <Seekbar
      position={position}
      duration={100000}
      onSeek={handleSeek}
    />
  )
}
```
