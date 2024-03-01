import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Button from 'react-bootstrap/Button';
import Header from "../components/adminHeader";
import { useEffect, useState } from "react";
import { GetAllAccount, blockAccount, unblockAccount, removeAccount } from "../../../Service/adminService";
import { GetAccountById } from "../../../Service/adminService";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function User() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedIds, setSelectedIds] = useState([]);
  const [status, setStatus] = useState([]);
  const [dataaccess, setDataAccess] = useState();
  const [data, setData] = useState([]);
  const [Block, setBlock] = useState(false);
  const [UnBlock, setUnBlock] = useState(false);
  const navigate = useNavigate();
  const token =localStorage.getItem("token");
 
  useEffect(() => {
    GetAllUser();
  }, [dataaccess]);

  const GetAllUser = async () => {
    console.log("GetAllAccount",token);
    let res = await GetAllAccount(token);
    if (res) {
      setData(res)
    }
  }
  const [formInputEmp, setFormInput] = useState({
    id: selectedIds,
  });

  // useEffect(() => {
  //   console.log("selectedIds moi nhat", selectedIds);
  // }, [selectedIds]);

  const handCellClick = async (params) => {
    const { value } = params;
    console.log("params", params.row.status);
    const index = selectedIds.indexOf(params.id);
    if (value === false) {
      if (index === -1) {
        status.push(params.row.status);
        selectedIds.push(params.id);
        console.log("selectedIdszz", selectedIds);
        console.log("params.row.status", status);
        const unblock = status.every(val => val === 0);
        const block = status.every(val => val === 1);
        // Nếu mảng chỉ chứa một loại giá trị, thực hiện hành động
        if (unblock && selectedIds.length>0) {
          setUnBlock(true);
        }else{
          setUnBlock(false);
        }
        if (block && selectedIds.length>0) {
          setBlock(true);
        }else{
          setBlock(false);
        }
      }
    } else {
      if (index !== -1) {
        console.log("index", index);
        selectedIds.splice(index, 1);
        status.splice(index, 1);
        // Nếu mảng chỉ chứa một loại giá trị, thực hiện hành động
        const unblock = status.every(val => val === 0);
        const block = status.every(val => val === 1);
        // Nếu mảng chỉ chứa một loại giá trị, thực hiện hành động
        if (unblock && selectedIds.length>0) {
          setUnBlock(true);
        }else{
          setUnBlock(false);
        }
        if (block && selectedIds.length>0) {
          setBlock(true);
        }else{
          setBlock(false);
        }
      }
    }
  }

  const handleBlockAccount = async () => {
    // console.log("formInputEmp.id.length",formInputEmp.id.length);
    console.log("selectid", selectedIds);
    if (!selectedIds.length > 0) {
      toast.error("Vui lòng điền chọn vào bài viết!");
    } else {
      let accessJobblock = await blockAccount(selectedIds,localStorage.getItem("token"));
      console.log("accessJobblock", accessJobblock);
      if (accessJobblock) {
        //setFormInput(formInputEmp);      
        // console.log("selectedIds",selectedIds);
        setDataAccess(selectedIds[selectedIds.length - 1]);
        toast.success("Tài khoản đã được đóng!");
        window.location.reload();
      }
    }
  }
  const unhandleBlockAccount = async () => {
    console.log("selectidun", selectedIds);
    if (!selectedIds.length > 0) {
      toast.error("Vui lòng điền chọn vào bài viết!");
    } else {
      console.log("localStorage.getIte",localStorage.getItem("token"));
      let accessJobunblock = await unblockAccount(selectedIds,localStorage.getItem("token"));
      if (accessJobunblock) {
        // setFormInput(formInputE
        console.log("accessJobunblock", accessJobunblock);
        // console.log("selectedIds.length",selectedIds.length);
        // console.log("selectedIds",selectedIds);
        setDataAccess(selectedIds[selectedIds.length - 1]);
        toast.success("Tài khoản đã được mở!");
        window.location.reload();
      }

    }

  }

  const removekAccount = async () => {
    console.log("nhay vao dayunblock", selectedIds);
    // if (!isFormValid) {
    //   navigate("/adminManageUser")
    //   toast.error("Vui lòng điền chọn vào bài viết!");
    // } else {
    let accessJob = await removeAccount(formInputEmp,localStorage.getItem("token"));
    console.log("accessJob", accessJob)
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

  const removeConfirmAcount = () => {
    const userConfirmed = window.confirm('Bạn có chắc muốn xóa tài khoản này không?');
    if (userConfirmed) {
      removekAccount();
    }
  };
  //Lấy item từ API
  const rows = data.map((item) => ({
    id: item.id,
    name: item.fullName,
    email: item.email,
    gender: item.gender,
    access: item.roleId,
    status: item.status,
  }))

  const columns = [
    {
      field: "id",
      headerName: "ID"
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
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="60%"
            p="5px"
            display="flex"
            justifyContent="center"
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
  ];

  return (
    <Box m="20px">
      <Header style={{fontFamily: 'Open Sans' }} title="Người dùng" subtitle="Quản lý người dùng" />

      <div style={{fontFamily: 'Open Sans' }}>
        <Button id="approve-btn" disabled={!UnBlock} onClick={() => handlConfirmBlockAcount()} variant="outline-secondary">Khóa</Button>
        <Button id="approve-btn" disabled={!Block} onClick={() => unhandlConfirmBlockAcount()} variant="outline-success">Mở khóa</Button>
        {/* <Button id="approve-btn"  onClick={() => removeConfirmAcount()} variant="outline-danger">Xóa</Button> */}
      </div>

      <Box
        m="0 0 0 0"
        height="75vh"
        style={{fontFamily: 'Open Sans' }}
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
            fontFamily: 'Open Sans',
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontFamily: 'Open Sans',
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
            fontFamily: 'Open Sans',
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
            fontFamily: 'Open Sans',
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
        <DataGrid checkboxSelection
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
          style={{ fontSize: 15, fontFamily: 'Open Sans', minHeight: 560 }}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default User;
