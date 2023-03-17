import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {getTicker} from '@/http';
import * as S from './StockListItem.style';

function StockListItem({ticker}: StockListItemProp) {
  const [isFavorite, setFavortie] = useState(false);

  const {data} = useQuery([ticker.market], {
    queryFn: () => getTicker({queries: {markets: ticker.market}}),
  });

  if (!data) {
    return (
      <tbody>
        <tr>
          <td>
            <span>loading</span>
          </td>
        </tr>
      </tbody>
    );
  }

  const fixedAccTradePrice = Math.floor(data[0].acc_trade_price_24h / 1000000);
  const fixedChangeRate = Math.round(data[0].signed_change_rate * 1000) / 1000;
  function toggleFavorite() {
    isFavorite ? setFavortie(false) : setFavortie(true);
  }

  return (
    <S.StockListBody>
      <tr>
        <td rowSpan={2}>
          <S.Favorites onClick={toggleFavorite}>{isFavorite ? '★' : '☆'}</S.Favorites>
        </td>
        <S.StockName>{ticker.korean_name}</S.StockName>
        <S.StockPrice fixedChangeRate={fixedChangeRate}>{data[0].trade_price}</S.StockPrice>
      </tr>
      <tr>
        <S.StockChangeRate fixedChangeRate={fixedChangeRate}>{fixedChangeRate}%</S.StockChangeRate>
        <S.StockAccTradePrice>{fixedAccTradePrice}백만</S.StockAccTradePrice>
      </tr>
    </S.StockListBody>
  );
}

export default StockListItem;
