import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Button from 'react-bootstrap/Button';
import Header from "../components/adminHeader";
import { useEffect, useState } from "react";
import { BlackListUser, blockAccount, unblockAccount ,removeAccount} from "../../../Service/adminService";
import { GetAccountById} from "../../../Service/adminService";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function BlackList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedIds, setSelectedIds] = useState([]);
  const [dataaccess, setDataAccess] = useState();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token =localStorage.getItem("token");

  useEffect(() => {
    GetAllUser();
  }, [dataaccess]);

  const GetAllUser = async () => {
    console.log("token blacklisst:",token);
    let res = await BlackListUser(token);
    if (res) {
      setData(res)
    }
    console.log("Black list:",res);
  }
  const [formInputEmp, setFormInput] = useState({
    id: selectedIds,
  });

  // useEffect(() => {
  //   console.log("selectedIds moi nhat", selectedIds);
  // }, [selectedIds]);

  const handCellClick = async (params) => {
    const { value } = params;
    const index = selectedIds.indexOf(params.id);
    if (value === false) {
      if (index === -1) {
        selectedIds.push(params.id);
        console.log("selectedIdszz",selectedIds);
      }
    } else {
      if (index !== -1) {
        console.log("index",index);
        selectedIds.splice(index, 1);
      }
    }
  }

  const handleBlockAccount = async () => {
   // console.log("formInputEmp.id.length",formInputEmp.id.length);
   console.log("selectid",selectedIds);
    if (!selectedIds.length > 0) {
      toast.error("Vui lòng điền chọn vào bài viết!");
    } else {
      let accessJobblock = await blockAccount(selectedIds);
      console.log("accessJobblock",accessJobblock);
      if (accessJobblock) {
        //setFormInput(formInputEmp);      
       // console.log("selectedIds",selectedIds);
       setDataAccess(selectedIds[selectedIds.length-1]);
        toast.success("Tài khoản đã được đóng!");
      }
    }
  }
  const unhandleBlockAccount = async () => {
    console.log("selectidun",selectedIds);
    if (!selectedIds.length > 0) {
      toast.error("Vui lòng điền chọn vào bài viết!");
    } else {
      let accessJobunblock = await unblockAccount(selectedIds,);
      if (accessJobunblock) {
       // setFormInput(formInputE
       console.log("accessJobunblock", accessJobunblock);
        // console.log("selectedIds.length",selectedIds.length);
        // console.log("selectedIds",selectedIds);
        setDataAccess(selectedIds[selectedIds.length-1]);
        toast.success("Tài khoản đã được mở!");
      }
     
   }

  }

  const removekAccount = async () => {
    console.log("nhay vao dayunblock", selectedIds);
    // if (!isFormValid) {
    //   navigate("/adminManageUser")
    //   toast.error("Vui lòng điền chọn vào bài viết!");
    // } else {
      let accessJob = await removeAccount(formInputEmp);
      console.log("accessJob",accessJob)
      if (accessJob) {
        setFormInput(formInputEmp);
        toast.success("Tài khoản đã được tạm xóa!");
        navigate("/adminManageUser");
      }
      console.log("accessJob", accessJob);
    //}

  }


  const handlConfirmBlockAcount = () => {
    const userConfirmed = window.confirm('Bạn có chắc muốn khóa tài khoản này không?');
    if (userConfirmed) {
      handleBlockAccount();
    }
  };
  const unhandlConfirmBlockAcount = () => {
    const userConfirmed = window.confirm('Bạn có chắc muốn mở tài khoản này không?');
    if (userConfirmed) {
      unhandleBlockAccount();
    }
  };

  //Lấy item từ API
  const rows = data.map((item) => ({
    id: item.accounts.id,
    name: item.accounts.fullName,
    email: item.accounts.email,
    gender: item.accounts.gender,
    access: item.accounts.roleId,
    status: item.accounts.status,
    warnning: item.note,
  }))

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
    },
    {
      field: "name",
      headerName: "Họ và Tên",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Giới tính",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Liên hệ",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Vai trò",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === 1
                ? colors.redAccent[600]
                : access === 2
                  ? colors.blueAccent[700]
                  : access === 3
                    ? colors.grey[700]
                    : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === 1 ? "Employer" : ""}
            {access === 2 ? "Candidate" : ""}
          
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {/* {access} */}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      headerAlign: "left",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            p="5px"
            display="flex"
            justifyContent="center"
            textAlign="left"
            backgroundColor={
              status === 1
                ? colors.redAccent[600]
                : status === 0 ?
                colors.greenAccent[700]
                : colors.blueAccent[500]
            }
            borderRadius="4px"
          >
            {status === 0 ? "Đang mở" : ""}
            {status === 1 ? "Đang đóng" : ""}
           
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {/* {status} */}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "warnning",
      headerName: "Lý do cảnh báo",
      flex: 1.5,
    },
  ];

  return (
    <Box m="20px">
      <Header style={{fontFamily: 'Open Sans' }} title="Danh sách người dùng cảnh báo" subtitle="Danh sách đen" />

      {/* <div style={{fontFamily: 'Open Sans' }}>
        <Button id="approve-btn" onClick={() => handlConfirmBlockAcount()} variant="outline-secondary">Block</Button>
        <Button id="approve-btn" onClick={() => unhandlConfirmBlockAcount()} variant="outline-success">Un Block</Button>
      </div> */}

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
          rows={rows}
          columns={columns}
          {...data}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 8 } },
          }}
          onCellClick={handCellClick}
          pageSizeOptions={[15, 25, 50]}
          components={{ Toolbar: GridToolbar }}
          style={{fontSize: 15, fontFamily: 'Open Sans', minHeight: 560}}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default BlackList;
