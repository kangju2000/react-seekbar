import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import Seekbar from './Seekbar';

const meta = {
  title: 'Example/Seekbar',
  component: Seekbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Seekbar>;

export default meta;
type Story = StoryObj<typeof meta>;
const ExamplePlayer = () => {
  const [position, setPosition] = useState(0);
  const [duration] = useState(10000);
  const [isPlaying, setIsPlaying] = useState(false);

  const msToTime = (ms: number) => {
    const sec = Math.floor(ms / 1000);
    const min = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    const minStr = String(min);
    const secStr = String(remainingSec).padStart(2, '0');

    return `${minStr}:${secStr}`;
  };

  const handleClick = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (pos: number) => {
    setPosition(pos);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev >= duration) {
          clearInterval(interval);
          return prev;
        }
        return prev + 100;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <button onClick={handleClick}>{isPlaying ? 'pause' : 'play'}</button>
      </div>
      <div style={{ display: 'flex' }}>
        <p>{msToTime(position)}</p>
        <Seekbar position={position} duration={duration} onSeek={handleSeek} />
        <p>{msToTime(duration)}</p>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <Seekbar />,
};

export const Player: Story = {
  render: () => <ExamplePlayer />,
};
