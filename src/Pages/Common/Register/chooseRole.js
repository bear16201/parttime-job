import Button from 'react-bootstrap/Button';
import './register.scss'

function ChooseRole() {
  return (
    <div className="container" id ='role'>
      <div className="role-choose">Bạn muốn đăng ký với tư cách là</div>
      <div className="mb-3">
        <Button href="/register-candidate" variant="primary" size="lg" id='btn-role'>
          Người tìm việc
        </Button>{' '}
        <Button href="register-employer" variant="secondary" size="lg" id='btn-role'>
          Nhà tuyển dụng
        </Button>
      </div>
      <div className="back-login"><a href="/">Trang chủ</a></div>
    </div>
  );
}

export default ChooseRole;



// const ChooseRole = () => {
//     return (
//       <div className="container">
//         <h1>ChooseRole</h1>
//       </div>
//     )
//   }
  
//   export default ChooseRole;