import CandlestickChart from '@/components/CoinDetail/Chart/CandlestickChart';
import useCandleChart from '@/hooks/useCandleChart';
import useCandleData from '@/hooks/useCandleData';
import * as S from './CoinDetailChart.style';
import CoinDetailChartOptions from './CoinDetailChartOptions';

const CoinDetailChart = () => {
  const {
    candleState: {type, unit},
    data,
    onChange,
  } = useCandleData();
  const {chartData} = useCandleChart(data);

  if (!data.length) {
    return null;
  }

  return (
    <S.ChartWrapper>
      <S.Select onChange={onChange} defaultValue={`${type} ${unit}`}>
        <CoinDetailChartOptions />
      </S.Select>
      <CandlestickChart data={chartData} width={800} height={400} />
    </S.ChartWrapper>
  );
};

export default CoinDetailChart;
