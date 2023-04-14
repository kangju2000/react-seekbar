import styled from '@emotion/styled';
import { useRef } from 'react';

interface SeekbarProps {
  width?: number;
  height?: number;
  fullWidth?: boolean; //TODO: implement
  outerColor?: string;
  innerColor?: string;
  hoverColor?: string;
  position?: number;
  duration?: number;
  radius?: number;
  onSeek?: (position: number) => void;
}
type ContainerStyleType = Pick<SeekbarProps, 'width' | 'height' | 'hoverColor'> & {
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
  hoverColor = '#006400',
  position = 0,
  duration = 100,
  radius = 5,
  onSeek = () => undefined,
}: SeekbarProps) => {
  const seekRef = useRef(null);
  const handleRef = useRef(null);

  const percentage = (position / duration) * 100;

  const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    let _needForRAF = true;
    let _percentage = percentage;
    const rect = event.currentTarget.getBoundingClientRect();

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
      console.log('mousemove');
      event.preventDefault();
      const { pageX: moveX } = getPosition(event);
      const offsetX = moveX - rect.left;
      if (offsetX < 0) _percentage = 0;
      else if (offsetX > width) _percentage = 100;
      else _percentage = (offsetX / width) * 100;

      if (_needForRAF) {
        _needForRAF = false;
        requestAnimationFrame(() => {
          seekRef.current.style.transform = `translateX(calc(-100% + ${_percentage}%))`;
          handleRef.current.style.left = `${_percentage}%`;
          _needForRAF = true;
        });
      }
    };
    const handleMouseUp = () => {
      onSeek((_percentage / 100) * duration);
      seekRef.current.style = '';
      handleRef.current.style = '';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <Container
      width={width}
      height={height}
      hoverColor={hoverColor}
      percentage={percentage}
      onMouseDown={handleMouseDown}
    >
      <OuterSeekbar width={width} height={height} outerColor={outerColor} radius={radius}>
        <InnerSeekbar
          ref={seekRef}
          innerColor={innerColor}
          percentage={percentage}
          radius={radius}
        />
      </OuterSeekbar>
      <Handle ref={handleRef} height={height} percentage={percentage} />
    </Container>
  );
};

const Container = styled.div<ContainerStyleType>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height + 10}px;
  &:hover,
  &:active {
    cursor: pointer;
    div:nth-of-type(1) > div {
      background-color: ${({ hoverColor }) => hoverColor};
    }
    div:nth-of-type(2) {
      display: block;
    }
  }
`;

const OuterSeekbar = styled.div<OuterSeekbarStyleType>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ outerColor }) => outerColor};
  border-radius: ${({ radius }) => radius}px;
  overflow: hidden;
`;

const InnerSeekbar = styled.div<InnerSeekbarStyleType>`
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
