import { Button, Badge, TextInput, Label, Card } from "flowbite-react";
import React, { useEffect, useMemo, useState } from "react";
import AxiosCliente from "../../../config/htpp-gateway/http-client";
import TableComponent from "../../../components/TableComponent";
import { customAlert,confirmAlert } from "../../../config/alert/alert";
import {
    AiFillEdit,
    AiOutlineDelete,
    AiOutlineDoubleLeft,
} from "react-icons/ai";
import { FaSearch, FaPlus } from "react-icons/fa";
import ModalRegister from "./components/ModalRegister";
import ModalUpdate from "./components/ModalUpdate";

const UserPage = ({row}) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const [openRegisterModalU, setOpenRegisterModalU] = useState(false);
    const [submitting,setSubmitting] = useState(false);
    const [rowData, setRowData] = useState(null);


    //con el useMemo se gaurda una imagen de las colunbas para que sili se rederizen una vez
    const colums = useMemo(() => [
        {
            name: "#",
            cell: (row, index) => <>{index + 1}</>,
            sortable: true,
            selector: (row, index) => index + 1,
        },
        {
            name: "usuario",
            cell: (row) => <>{row.username}</>,
            sortable: true,
            selector: (row) => row.username,
        },
        //sortable es para que se pueda ordenar, selector es para que se pueda buscar,  cell es para que se pueda mostrar
        {
            name: "Rol",
            cell: (row) => <>{row.roles[0].name}</>,
            sortable: true,
            selector: (row) => row.roles[0].name,
        },
        {
            name: "Estado",
            cell: (row) => (
                <Badge color={row.status ? "success" : "failure"}>
                    {row.status ? "Activo" : "Inactivo"}
                </Badge>
            ),
            selector: () => row.status,
            sortable: true,
        },
        {
            name: "Acciones",
            cell: (row) => (
                <>
                    <Button 
                    outline size={"sm"} 
                    pill color="warning"
                    onClick={() => openEditModal(row)}
                    >
                        {<AiFillEdit />}
                    </Button>

                    <Button
                        outline
                        size={"sm"}
                        pill
                        color={row.status ? "failure" : "success"}
                        onClick={()=> changeUser(row.id)}
                        
                    >
                        {row.status ? <AiOutlineDelete /> : <AiOutlineDoubleLeft />}
                    </Button>
                </>
            ),
        },
    ]);

    const changeUser = async (id)  => {
        confirmAlert (async =>{
            try {
                getUSer();
    
                const response =  AxiosCliente({
                    method:"PATCH",
                    url:"/user/"+id,
                });
                console.log(response);
                if(!response.error){
                    customAlert('Registrado correctamente',
                    'Usuario registrado correctamente'
                    ,'success');
                    getUSer();
                }
            } catch (error) {
                customAlert('Error al cambiar el estado',
                'Error al cambiar estado, intentalo mas tarde'
                ,'error')
                console.log(error);
            }
        })
    }

  const openEditModal = (rowData) => {
    setRowData(rowData); // Almacena el rowData seleccionado en el estado
    setOpenRegisterModalU(true);
  };
    
    const getUSer = async () => {
        try {
            setLoading(true);
            const response = await AxiosCliente({
                url: "/user/",
                method: "GET",
            });
            console.log(response);

            if (!response.error) setUsers(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUSer();
    }, []);

    const filter = () => {
        return users.filter((users) => users.username.includes(filterText));
    };
    return (
        <>
            <section className="flex flex-col pt-4 px-3 gap-4">
                <h4 className="text-2xl">Usuarios</h4>
                <div className="flex w-full justify-between">
                    <div className="max-w-md">
                        <Label htmlFor="search" value="Buscador" />

                        <TextInput
                            id="search"
                            type="text"
                            rightIcon={FaSearch}
                            placeholder="Buscar..."
                            required
                            onChange={(e) => setFilterText(e.target.value)}
                            value={filterText}
                        />
                    </div>
                    <div>
                        <Button pill 
                        outline 
                        color="success"
                        onClick={() => setOpenRegisterModal(true)}
                        >  
                            <FaPlus />
                        </Button>
                    </div>
                </div>
                <Card>
                    <TableComponent columns={colums} data={filter()} progress={loading} />
                </Card>
            </section>
            <ModalRegister
            open={openRegisterModal}
            onClose={() => setOpenRegisterModal(false)}
            getAllUsers={getUSer}
            />
            <ModalUpdate
            openU={openRegisterModalU}
            getAllUsersU={getUSer}
            onCloseU={() => setOpenRegisterModalU(false)}
            rowData={rowData}
            />
        </>
    );
};

export default UserPage;
