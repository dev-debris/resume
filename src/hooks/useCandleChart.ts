import {useTheme} from '@emotion/react';
import {useRecoilValue} from 'recoil';
import {CandlestickData} from '@/components/CoinDetail/Chart/CandlestickChart';
import {selectedCoinState} from '@/recoil/atoms';

const useCandleChart = (data: Candle[]) => {
  const coin = useRecoilValue(selectedCoinState);
  const {colors} = useTheme();
  const candleSeries = data.map(({opening_price, high_price, low_price, trade_price, timestamp}) => ({
    x: timestamp + 9 * 1000 * 60 * 60,
    y: [opening_price, high_price, low_price, trade_price],
  }));

  const chartData: CandlestickData[] = candleSeries.map(({x, y}) => ({
    time: new Date(x).toLocaleString(),
    open: y[0],
    high: y[1],
    low: y[2],
    close: y[3],
  }));

  return {chartData};
};

export default useCandleChart;
