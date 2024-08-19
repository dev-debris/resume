import {Group} from '@visx/group';
import {scaleBand, scaleLinear} from '@visx/scale';
import {Bar, Line} from '@visx/shape';
import {useMemo} from 'react';

export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const CandlestickChart = ({
  data,
  width: xMax,
  height: yMax,
}: {
  data: CandlestickData[];
  width: number;
  height: number;
}) => {
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        domain: data.map(d => d.time),
        padding: 0.4,
      }),
    [data, xMax]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        domain: [Math.min(...data.map(d => d.low)), Math.max(...data.map(d => d.high))],
      }),
    [data, yMax]
  );

  return (
    <svg width={xMax} height={yMax}>
      <Group>
        {data.map((d, i) => {
          const barWidth = xScale.bandwidth();
          const candleHeight = Math.abs(yScale(d.open) - yScale(d.close));
          const candleX = xScale(d.time) || 0;
          const candleY = Math.min(yScale(d.open), yScale(d.close));
          const wickY1 = yScale(d.high);
          const wickY2 = yScale(d.low);

          return (
            <Group key={`candle-${i}`}>
              <Line
                from={{x: candleX + barWidth / 2, y: wickY1}}
                to={{x: candleX + barWidth / 2, y: wickY2}}
                stroke="black"
              />
              <Bar
                x={candleX}
                y={candleY}
                width={barWidth}
                height={candleHeight}
                fill={d.open > d.close ? 'red' : 'green'}
              />
            </Group>
          );
        })}
      </Group>
    </svg>
  );
};
export default CandlestickChart;
