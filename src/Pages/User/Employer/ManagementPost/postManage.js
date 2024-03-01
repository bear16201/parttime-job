import Header from "../../Themes/Header/header";
import SideBar from "../MangementPage/sidebar";
import Button from 'react-bootstrap/Button';
import logo_job from '../../../../Assets/logo-job.png'
import { DataGrid, GridToolbar,GridColDef } from "@mui/x-data-grid";
import './post.scss';
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllJObByEid,getAllJObStatusByEid, deleteJobDetail } from '../../../../Service/employService';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { GetAllJobDetail } from "../../../../Service/adminService";
import { tokens } from "../../../Admin/theme";
import HeaderTitle from "../../../Admin/components/adminHeader";
import HeaderEmployer from "../../Themes/Header/headerEmployer";
function PostManage() {

    const [data, setData] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const tokenE = localStorage.getItem("tokenE");
    let [idemp, setidEmp] = useState(sessionStorage.getItem('employerId'));
    useEffect(() => {
        GetAllPost();
        console.log("empid", idemp);
        setidEmp(idemp);
    }, []);

    const GetAllPost = async () => {
        let res = await getAllJObStatusByEid(idemp,tokenE);
        if (res) {
            setData(res)
        }
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }
    );

    const rows = data.map((item) => ({
        id: item.id,
        title: item.title,
        createdAt: moment(item.createdAt).format('DD/MM/yyyy'),
        deadline: moment(item.deadline).format('DD/MM/yyyy'),
        jobTime: item.jobTime,
        salary: VND.format(item.salary),
        typeSalary: item.typeSalary,
        numberApply: item.numberApply,
        status: item.status,
    }));

    const columns=[
        {
            field: "id",
            headerName: "ID",
            flex: 0.1,
            headerClassName:'super-app-theme--header'
        },
        {
            field: "title",
            headerName: "Tiêu đề",
            flex: 2.5,

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
            flex: 1.1,
            align: "center",
        },
        {
            field: "status",
            headerName: "Trạng Thái",
            flex: 1.5,
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
                        {status === 3 ? "Đã đóng" : ""}
                        {status === 4 ? "Tin nháp" : ""}
                        {status === 5 ? "Tin đã xóa" : ""}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {/* {status} */}
                        </Typography>
                    </Box>
                );
            },
        },
    ];
    return (
        <div style={{fontFamily: 'Open Sans', backgroundColor: 'var(--light-green)'}}>
            <HeaderEmployer />
            <div className="container">
                <h1 className="post-history-tilte">Lịch sử đăng bài</h1>
                <Button style={{fontSize: 20, fontWeight: 'bold'}} href="/post">Quay lại</Button>
                <Box m="20px">
                    <Box
                        m="0 0 0 0"
                        height="75vh"
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                            },
                            "& .name-column--cell": {
                                color: colors.greenAccent[300],
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: colors.blueAccent[700],
                                borderBottom: "none",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: colors.primary[400],
                            },
                            "& .MuiDataGrid-footerContainer": {
                                borderTop: "none",
                                backgroundColor: colors.blueAccent[700],
                            },
                            "& .MuiCheckbox-root": {
                                color: `${colors.greenAccent[200]} !important`,
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: `${colors.grey[100]} !important`,
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
                            pageSizeOptions={[15, 25, 50]}
                            components={{ Toolbar: GridToolbar }}
                            style={{fontSize: 15, fontFamily: 'Open Sans', minHeight: 560}}
                        />
                    </Box>
                    <ToastContainer />
                </Box>
            </div>
        </div>
    )
}

export default PostManage;