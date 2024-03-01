import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Button from 'react-bootstrap/Button';
import Header from "../components/adminHeader";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { GetAllJob } from "../../../Service/userService";
import { GetAllJobDetail, accessJobDeatail, creatresoncancel, creatresoncancelclose } from "../../../Service/adminService";
import moment from 'moment';
import { Link } from "react-router-dom";
import PopupAdmin from '../components/popup'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AddNotiForEmployer,AddListNotification } from '../../../Service/notificationService.js';
//var selectedIds = [];
const Contacts = () => {
  var theme = useTheme();
  var colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const [dataaccess, setDataAccess] = useState([]);
  const [btnPopup, setBtnPopup] = useState(false)
  const [btnPopupclose, setBtnPopupClose] = useState(false)
  const [load, setLoad] = useState()
  const [selectedIds, setSelectedIds] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [notification, setNotification] = useState({ accountId: [], fromAccountId: '', title: '', content: '' })
  const [ChuaDuyet, setChuaDuyet] = useState(false);
  const [Xoa, setXoa] = useState(false);
  const [status, setStatus] = useState([]);
  const token =localStorage.getItem("token");
  const [formInputEmp, setFormInput] = useState({
    // "title": "job 4",
    id: selectedIds,
    reasonreject: ""
  });
  useEffect(() => {
    // GetAllPost();
    GetAllPost();
    //console.log("selectedIdshii", selectedIds);
  }, [load]);

  const GetAllPost = async () => {
    let res = await GetAllJobDetail(token);
    if (res) {
      setData(res)
    }
  }
  useEffect(() => {
    const isFormValid =
      formInputEmp.id !== null &&
      formInputEmp.id.length > 0 &&
      formInputEmp.reasonreject !== ""
    setIsFormValid(isFormValid);

  }, [formInputEmp]);

  const handleEmployInput = (name, value) => {
    // Cập nhật giá trị vào đối tượng formInputEmp
    setFormInput((prevFormInputEmp) => ({
      ...prevFormInputEmp,
      [name]: value,
    }));
  };

  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }
  );

  //Call API
  const rows = data.map((item) => ({
    id: item.id,
    title: item.title,
    company: item.company,
    createdAt: moment(item.createdAt).format('DD/MM/yyyy'),
    deadline: moment(item.deadline).format('DD/MM/yyyy'),
    jobTime: item.jobTime,
    salary: VND.format(item.salary),
    typeSalary: item.typeSalary,
    numberApply: item.numberApply,
    status: item.status,
    employerid: item.employerId,
  }));


  //---------------------Access jobdetail---------------------//
  const handleAccessJob = async () => {
    console.log("nhay vao day", selectedIds);
    if (!selectedIds.length > 0) {
      toast.error("Hãy chọn vào bài viết!");
    } else {
      let accessJob = await accessJobDeatail(selectedIds,token);
      setSelectedIds(selectedIds);
      if (accessJob) {
        console.log("selectedIds[0].id", selectedIds[0]);
        setLoad(selectedIds[selectedIds.length-1]);
        notification.accountId = selectedIds;
        notification.fromAccountId =parseInt(sessionStorage.getItem('id'));
        notification.title = "Bạn có thông báo về bài đăng từ Fjob";
        notification.content = `Bài đăng của bạn đã được duyệt với tiêu đề: `;
        console.log("notification", notification);
        let res=await AddListNotification(notification,token);
        console.log("notification res", res);
        toast.success("Tin đã được duyệt!");
        window.location.reload();
      }
      console.log("accessJob", accessJob);
    }
  }
  const handlConfirmClickJobDetail = () => {
    // Hiển thị cảnh báo và xác nhận từ người dùng
    const userConfirmed = window.confirm('Bạn có chắc muốn duyệt bài này không?');

    // Nếu người dùng đồng ý, thực hiện xóa
    if (userConfirmed) {
      handleAccessJob();
    }
  };



  /// reason cansel
  const handleReasoncancel = async () => {
    //const { id } = params.row;
    console.log('selectedIdszz', selectedIds);
    if (!isFormValid) {
      console.log("Invalid form");
      toast.error("Vui lòng điền đầy đủ thông tin và chọn vào bài viết!");
    } else {
      console.log("formInputEmp", formInputEmp);
      let createreson = await creatresoncancel(formInputEmp,token);
      if (createreson) {
        setBtnPopup(false);
        setLoad(selectedIds[selectedIds.length-1]);
        notification.accountId = selectedIds;
        notification.fromAccountId = sessionStorage.getItem('id');
        notification.title = "Bạn có thông báo về bài đăng từ Fjob";
        notification.content = `Bài đăng của bạn đã bị từ chối với lý do: ${formInputEmp.reasonreject} về bài viết: `;
        await AddListNotification(notification,token);
        toast.success("Đã từ chối công việc!");
        window.location.reload();
      }
    }
    formInputEmp.reasonreject = "";
  }

  const handleReasoncancelClose = async () => {
    console.log("tin close");
    if (!isFormValid) {
      console.log("Invalid form");
      toast.error("Vui lòng điền đầy đủ thông tin và chọn vào bài viết!");
    } else {
      console.log("formInputEmp", formInputEmp);
      let createreson = await creatresoncancelclose(formInputEmp,token);
      if (createreson) {
        setBtnPopupClose(false);
        setLoad(selectedIds[selectedIds.length-1]);
        notification.accountId = selectedIds;
        notification.fromAccountId = sessionStorage.getItem('id');
        notification.title = "Bạn có thông báo về bài đăng từ Fjob";
        notification.content = `Bài đăng của bạn đã bị đóng với lý do: ${formInputEmp.reasonreject} về bài viết: `;
        await AddListNotification(notification,token);
        toast.success("Đã tạm đóng công việc!");
        window.location.reload();
      }
    }
    formInputEmp.reasonreject = "";
  }
  const handCellClick = async (params) => {
    console.log("trc",selectedIds);
    console.log("tin params", params);
    // setSelectedIds([]);
    const { value } = params;
    const index = selectedIds.indexOf(params.id);
    if (value === false) {
      if (index === -1) {
        status.push(params.row.status);
        selectedIds.push(params.id);
        console.log("selectedIdszz", selectedIds);
        console.log("params.row.status", status);
        const chuaduyet = status.every(val => val === 0);
        const daxoa = status.every(val => val === 5);
        // const tuchoi = status.every(val => val === 2);
        // Nếu mảng chỉ chứa một loại giá trị, thực hiện hành động
        if (chuaduyet && selectedIds.length>0) {
          setChuaDuyet(true);
        }else{
          setChuaDuyet(false);
        }
        if (selectedIds.length>0 && !daxoa) {
          setXoa(true);
        }else{
          setXoa(false);
        }
        // if (daduyet) {
        //   setDaduyet(true);
        // }else{
        //   setDaduyet(false);
        // }
        // if (tuchoi) {
        //   setTuchoi(true);
        // }else{
        //   setTuchoi(false);
        // }
      }
    } else {
      if (index !== -1) {
        console.log("index", index);
        selectedIds.splice(index, 1);
        status.splice(index, 1);
        // Nếu mảng chỉ chứa một loại giá trị, thực hiện hành động
        const chuaduyet = status.every(val => val === 0);
        // const daduyet = status.every(val => val === 1);
        // const tuchoi = status.every(val => val === 2);
        // Nếu mảng chỉ chứa một loại giá trị, thực hiện hành động
        if (chuaduyet && selectedIds.length>0) {
          setChuaDuyet(true);
        }else{
          setChuaDuyet(false);
        }
        if (selectedIds.length>0) {
          setXoa(true);
        }else{
          setXoa(false);
        }
        // if (daduyet) {
        //   setDaduyet(true);
        // }else{
        //   setDaduyet(false);
        // }
        // if (tuchoi) {
        //   setTuchoi(true);
        // }else{
        //   setTuchoi(false);
        // }
      }
    }
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
      renderCell: (params) => (
        <Link style={{ color: "#fff" }} to={`/post-detail-for-admin?jobid=${params.id}`}>{params.value}</Link>
      )
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      flex: 2.5,
    },
    {
      field: "company",
      headerName: "Công ty / Cá nhân",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "createdAt",
      headerName: "Ngày tuyển dụng",
      type: "datetime",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "deadline",
      headerName: "Hạn tuyển dụng",
      type: "datetime",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "jobTime",
      headerName: "Thời gian",
      flex: 1,
    },
    {
      field: "salary",
      headerName: "Lương",
      flex: 1,
    },
    {
      field: "typeSalary",
      headerName: "Loại lương",
      flex: 0.8,
    },
    {
      field: "numberApply",
      headerName: "Số lượng người tuyển",
      flex: 0.8,
      align: "center",
    },
    {
      field: "status",
      headerName: "Trạng Thái",
      flex: 1.7,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === 0
                ? colors.grey[600]
                : status === 1
                  ? colors.greenAccent[700]
                  : colors.redAccent[700]
            }
            borderRadius="4px"
          >
            {status === 0 ? "Chưa duyệt" : ""}
            {status === 1 ? "Đã duyệt" : ""}
            {status === 2 ? "Đã từ chối" : ""}
            {status === 5 ? "Đã xóa" : ""}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {/* {status} */}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Danh sách công việc"
        subtitle="Duyệt bài đăng"
      />
      <div style={{fontFamily: 'Open Sans'}}>
        <Button id="approve-btn" disabled={!ChuaDuyet} onClick={() => handlConfirmClickJobDetail()} variant="outline-success">Duyệt</Button>
        <Button id="approve-btn" disabled={!ChuaDuyet} onClick={() => setBtnPopup(true)} variant="outline-warning">Từ chối</Button>
        <Button id="approve-btn" disabled={!Xoa} onClick={() => setBtnPopupClose(true)} variant="outline-danger">Xóa</Button>
      </div>
      <div style={{ fontFamily: 'Open Sans'}}>
        <PopupAdmin trigger={btnPopup} setTrigger={setBtnPopup}>
          <div className='admin-notify-top'>Lý do từ chối</div>
          <div className='admin-notify-item'>
            <Form.Control
              className="my-class"
              onChange={({ target }) => {
                handleEmployInput(target.name, target.value);
              }}
              value={formInputEmp.reasonreject}
              name="reasonreject"
              type="text"
              id="contact-input"
            />
          </div>
          <Button onClick={() => setBtnPopup(false)} style={{ float: 'inline-end', marginLeft: '10px' }} variant="danger">Hủy bỏ</Button>
          <Button style={{ float: 'inline-end' }} onClick={() => handleReasoncancel()} variant="success">Phản hồi</Button>
        </PopupAdmin>
      </div>
      <div>
        <PopupAdmin trigger={btnPopupclose} setTrigger={setBtnPopupClose}>
          <div className='admin-notify-top'>Lý do xóa bài</div>
          <div className='admin-notify-item'>
            <Form.Control
              className="my-class"
              onChange={({ target }) => {
                handleEmployInput(target.name, target.value);
              }}
              value={formInputEmp.reasonreject}
              name="reasonreject"
              type="text"
              id="contact-input"
            />
          </div>
          <Button onClick={() => setBtnPopupClose(false)} style={{ float: 'inline-end', marginLeft: '10px' }} variant="danger">Hủy bỏ</Button>
          <Button style={{ float: 'inline-end' }} onClick={() => handleReasoncancelClose()} variant="success">Phản hồi</Button>
        </PopupAdmin>
      </div>
      <Box
        m="0 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontFamily: 'Open Sans',
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontFamily: 'Open Sans',
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontFamily: 'Open Sans',
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            fontFamily: 'Open Sans',
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
            fontFamily: 'Open Sans',
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
            fontFamily: 'Open Sans',
          },
        }}
      >
        <DataGrid
          checkboxSelection={true}
          rows={rows}
          columns={columns}
          {...data}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 8 } }
          }}
          // onRowClick={handleRowClick}
          onCellClick={handCellClick}
          style={{fontSize: 15, fontFamily: 'Open Sans', minHeight: 560}}
          pageSizeOptions={[15, 25, 50]}
          components={{ Toolbar: GridToolbar }}
        />
        <ToastContainer />
      </Box>
    </Box>
  );
};

export default Contacts;
