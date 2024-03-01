import './footer.scss';

import logo_icon from '../../../../Assets/logo-header.png'
import logo_twitter from '../../../../Assets/twitter.png'
import logo_instagram from '../../../../Assets/instagram.png'
import logo_youtube from '../../../../Assets/youtube.png'
import logo_facebook from '../../../../Assets/facebook.png'

const Footer = () => {
  return (
    <div className="container-footer">
      <div className='footer'>
        <div className='footer-left'>
          <div className='footer-left-item'>
          <div className="footer-left-item-logo">
            <img src={logo_icon} alt="" />
          </div>

          <div className='footer-icon'>
          <img id='icon-facebook' src={logo_facebook}/>
          <img id='icon-youtube' src={logo_youtube}/>
          <img id='icon-instagram' src={logo_instagram}/>
          <img id='icon-twitter' src={logo_twitter}/>
          </div>

          </div>
          
        </div>

        <div className='footer-support'>
          <div className='footer-support-item'><i id='footer-icon' class="fa-solid fa-phone"></i>0966688899</div>
          <div className='footer-support-item'><i id='footer-icon' class="fa-regular fa-envelope"></i>TeamG84@fpt.edu.vn</div>
          <div className='footer-support-item'><i id='footer-icon' class="fa-solid fa-location-dot"></i>Đại học FPT</div>
          <div className='footer-support-item'><i id='footer-icon' class="fa-regular fa-circle-check"></i>Sản phẩm nhóm đồ án G84</div>
        </div>

        <div className='footer-right'>
          <div className='footer-title'>Về việc làm part-time</div>
          <div className='footer-content'>
            <div className='footer-item'><i id='footer-icon' class="fa-solid fa-house"></i>Trang chủ</div>
            <div className='footer-item'><i id='footer-icon' class="fa-solid fa-layer-group"></i>Giới thiệu</div>
            <div className='footer-item'><i id='footer-icon' class="fa-solid fa-bolt"></i>Quy định sử dụng</div>
            <div className='footer-item'><i id='footer-icon' class="fa-solid fa-gear"></i>Quy chế hoạt động</div>
            <div className='footer-item'><i id='footer-icon' class="fa-regular fa-address-book"></i>Liên hệ</div>
          </div>
        </div>

        <div className='footer-right'>
          <div className='footer-title'>Hỗ trợ khách hàng</div>
          <div className='footer-content'>
            <div className='footer-item'><i id='footer-icon' class="fa-solid fa-circle-question"></i>Câu hỏi thường gặp</div>
            <div className='footer-item'><i id='footer-icon' class="fa-regular fa-clipboard"></i>Hướng dẫn đăng tin</div>
            <div className='footer-item'><i id='footer-icon' class="fa-solid fa-headset"></i>Giải quyết khiếu nại</div>
          </div>
        </div>

        <div className='footer-right'>
          <div className='footer-title'>Blog</div>
          <div className='footer-content'>
            <div className='footer-item'><i id='footer-icon' class="fa-solid fa-building-user"></i>Cho ứng viên</div>
            <div className='footer-item'><i id='footer-icon' class="fa-solid fa-warehouse"></i>Cho nhà tuyển dụng</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;