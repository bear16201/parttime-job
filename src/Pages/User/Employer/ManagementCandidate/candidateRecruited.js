import HeaderEmployer from "../../Themes/Header/headerEmployer";
import SideBar from "../MangementPage/sidebar";
import Button from 'react-bootstrap/Button';
import logo_job from '../../../../Assets/logo-job.png'
import './candidateManage.scss'
import Rating from '@mui/material/Rating'

function CandidateRecruited() {
    return (
        <>
            <HeaderEmployer />
            <div className="employer-page">
                <div className="employer-page-sidebar">
                    <SideBar />
                </div>

                <div className="employer-page-content">
                    <div className="post-btn-control">
                        <div className="post-btn-control-item">
                            <Button href="/candidate-manage" id="post-btn" variant="primary">Chờ duyệt</Button>
                            <Button href="/candidate-recruited" id="post-btn" variant="primary">Đã tuyển</Button>
                            <Button href="/candidate-cancel" id="post-btn" variant="primary">Từ chối</Button>
                            <Button href="/candidate-save" id="post-btn" variant="primary">Hẹn phỏng vấn</Button>
                            <Button href="/candidate-reject" id="post-btn" variant="primary">Ứng viên hủy</Button>
                        </div>
                    </div>

                    <div className="candidate-manage-item">
                        <div className="candidate-manage-item-job">
                            <div className="candidate-manage-item-job-name">
                                Tuyển nhân viên bán hàng
                            </div>

                            <div className="candidate-manage-list-cv">
                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="candidate-manage-item-job">
                            <div className="candidate-manage-item-job-name">
                                Tuyển shipper
                            </div>

                            <div className="candidate-manage-list-cv">
                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="candidate-manage-item-job">
                            <div className="candidate-manage-item-job-name">
                                Tuyển nhân viên rửa bát
                            </div>

                            <div className="candidate-manage-list-cv">
                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="candidate-manage-item-job-cv">
                                    <div className='job-list-item'>
                                        <div className='candidate-manage-item-left'>
                                            <div className="job-list-logo">
                                                <img id='company-logo' src={logo_job} alt="" />
                                            </div>
                                            <div className='job-list-item-left-content'>
                                                <div className='candidate-manage-item-job-cv-name'><a>Đào Xuân Phúc</a></div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Hà Nội</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Vị trí mong muốn: Quản lý</div>
                                                </div>
                                                <div className='job-list-des'>
                                                    <div className='job-list-company'>Liên hệ: 0985967236</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='candidate-manage-item-right'>
                                            <div className='candidate-manage-item-right-content'>
                                                <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CandidateRecruited;