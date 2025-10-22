import '../style/NotFound.css';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const nav = useNavigate();

  return (
    <div className="NotFound">
      <div className="NotFound-container inner">
        <div className="text-contents">
          <h1 className="notfoundNum">404</h1>
          <h1>페이지를 찾을 수 없습니다.</h1>
          <p>페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.</p>
        </div>
        <div className="img-box">
          <img src="/NotFound-img.png" alt="NotFound-img" />
        </div>
        <div className="HomgMove-btn">
          <Button
            text={'홈으로'}
            type={'Square_lg'}
            onClick={() => {
              nav('/');
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default NotFound;
