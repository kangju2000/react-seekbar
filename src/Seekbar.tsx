import styled from '@emotion/styled';
import { useState } from 'react';

interface SeekbarProps {
  width?: number;
  height?: number;
  outerColor?: string;
  innerColor?: string;
  min?: number;
  max?: number;
  radius?: number;
  onSeek?: (position: number) => void;
}
type ContainerStyleType = Pick<SeekbarProps, 'height'> & {
  percentage: number;
};
type OuterSeekbarStyleType = Pick<SeekbarProps, 'width' | 'height' | 'outerColor' | 'radius'>;
type InnerSeekbarStyleType = Pick<SeekbarProps, 'innerColor' | 'radius'> & {
  percentage: number;
};
type HandleStyleType = ContainerStyleType;

function getPosition(e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) {
  const obj = 'touches' in e ? e.touches[0] : e;

  return { pageX: obj.pageX, pageY: obj.pageY };
}

const Seekbar = ({
  width = 300,
  height = 10,
  outerColor = '#a1a1a1',
  innerColor = '#eee',
  min = 0,
  max = 100,
  radius = 5,
  onSeek = () => undefined,
}: SeekbarProps) => {
  const [mousePosition, setMousePosition] = useState(null);

  const currentPosition = min / max;
  const percentage = mousePosition ? mousePosition * 100 : currentPosition * 100;

  const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      const { pageX: moveX } = getPosition(event);
      const offsetX = moveX - rect.left;
      const position = offsetX / width;
      if (position < 0 || position > 1) return;
      setMousePosition(position);
    };

    const handleMouseUp = () => {
      onSeek(mousePosition);
      setMousePosition(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <Container height={height} percentage={percentage} onMouseDown={handleMouseDown}>
      <OuterSeekbar width={width} height={height} outerColor={outerColor} radius={radius}>
        <InnerSeekbar innerColor={innerColor} percentage={percentage} radius={radius} />
      </OuterSeekbar>
      <Handle height={height} percentage={percentage} />
    </Container>
  );
};

const Container = styled.div<ContainerStyleType>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height + 10}px;
  &:hover,
  &:active {
    cursor: pointer;
    div:nth-of-type(1) > div {
      background-color: green;
    }
    div:nth-of-type(2) {
      display: block;
    }
  }
`;

const OuterSeekbar = styled.div<OuterSeekbarStyleType>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ outerColor }) => outerColor};
  border-radius: ${({ radius }) => radius}px;
  overflow: hidden;
`;

const InnerSeekbar = styled.div<InnerSeekbarStyleType>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${({ radius }) => radius}px;
  background-color: ${({ innerColor }) => innerColor};
  transform: translateX(calc(-100% + ${({ percentage }) => percentage}%));
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
`;

const Handle = styled.div<HandleStyleType>`
  position: absolute;
  display: none;
  top: 50%;
  left: ${({ percentage }) => percentage}%;
  transform: translateY(-50%);
  width: ${({ height }) => height + 5}px;
  height: ${({ height }) => height + 5}px;
  margin-left: ${({ height }) => -(height + 5) / 2}px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

export default Seekbar;
