import styled from '@emotion/styled';
import { useRef, useState } from 'react';

interface SeekbarProps {
  width?: number;
  height?: number;
  outerColor?: string;
  innerColor?: string;
  position_ms?: number;
  duration_ms?: number;
  onSeek?: (position: number) => void;
}
type ContainerStyleType = Pick<SeekbarProps, 'height'> & HandleStyleType;
type OuterSeekbarStyleType = Pick<SeekbarProps, 'width' | 'height' | 'outerColor'>;
type InnerSeekbarStyleType = Pick<SeekbarProps, 'innerColor'> & HandleStyleType;
type HandleStyleType = {
  percentage: number;
};

function getSeekbarPosition(e: React.MouseEvent, width: number) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const position = x / width;
  return position;
}

const Seekbar = ({
  width = 300,
  height = 10,
  outerColor = '#000',
  innerColor = '#eee',
  position_ms = 1,
  duration_ms = 1,
  onSeek = () => undefined,
}: SeekbarProps) => {
  const [mousePosition, setMousePosition] = useState(null);
  const [isDrag, setIsDrag] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const position = position_ms / duration_ms;

  const handleMouseDown = () => {
    setIsDrag(true);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDrag) {
      setMousePosition(getSeekbarPosition(event, width));
    }
  };

  const handleMouseUp = () => {
    setIsDrag(false);
    onSeek(mousePosition);
    setMousePosition(null);
  };

  return (
    <Container
      height={height * 2}
      percentage={mousePosition ? mousePosition * 100 : position * 100}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <OuterSeekbar width={width} height={height} outerColor={outerColor}>
        <InnerSeekbar
          innerColor={innerColor}
          ref={scrollRef}
          percentage={mousePosition ? mousePosition * 100 : position * 100}
        />
      </OuterSeekbar>
      <Handle percentage={mousePosition ? mousePosition * 100 : position * 100} />
    </Container>
  );
};

const Container = styled.div<ContainerStyleType>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height}px;
  &:hover {
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
  border-radius: 5px;
  overflow: hidden;
  background-clip: content-box;
  outline: none;
`;

const InnerSeekbar = styled.div<InnerSeekbarStyleType>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: ${({ innerColor }) => innerColor};
  transform: translateX(calc(-100% + ${({ percentage }) => percentage}%));
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
  outline: none;
`;

const Handle = styled.div<HandleStyleType>`
  position: absolute;
  display: none;
  top: 50%;
  left: ${({ percentage }) => percentage}%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  margin-left: -6px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

export default Seekbar;
