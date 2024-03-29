import { Button, Label, TextInput, Modal, FileInput, Card, Select } from 'flowbite-react';
import { useFormik } from 'formik';
import React, { useState,useEffect } from 'react';
import * as yup from "yup";
import { confirmAlert, customAlert } from '../../../../config/alert/alert';
import AxiosCliente from '../../../../config/htpp-gateway/http-client';

function ModalUpdate({ openU, onCloseU,getAllUsersU,rowData }) {
    console.log(rowData);
    const closeModal = () =>{
        formik.resetForm();
        onCloseU();
    }
    const [submitting,setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [modalPlacement, setModalPlacement] = useState('center')

    useEffect(() => {
        if (rowData) {
          const { username, person, user } = rowData;
          formik.setValues({
            username: username || "",
            role: user && user.roles && user.roles.length > 0 ? user.roles[0].id.toString() : "", // Asegúrate de tener un valor válido
            name: person.name || "",
            surname: person.surname || "",
            lastname: person.lastname || "",
            curp: person.curp || "",
            birthdate: person.birthDate || "",
          });
        }
      }, [rowData]); 
      
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
            role: "",
            name: "",
            surname: "",
            lastname: '',
            curp: '',
            birthdate: '',
            avatar: ""
        },

        validationSchema: yup.object().shape({
            username: yup.string().required("Campo obligatorio").max(45, "Solo se permiten 45 caracteres").min(4, "minimo 4 caracteres"),
            password: yup.string().required("Campo obligatorio").min(8, "Minimo 8 caracteres").max(50, "Solo se permiten 50 caracteres"),
            confirmPassword: yup.string().test("confirm password",
                "las contraseñas no coindicen ", function (value) { return this.parent.password === value; }),
            role: yup.string().required("Campo obligatorio").test("Selecciona un rol", "Debes escoger un rol", function (value) { return !!value }),
            name: yup.string().required("Campo obligatorio").min(3, "Minimo 3 caracteres").max(50, "maximo 50 caracteres"),
            surname: yup.string().required("Campo obligatorio").min(3, "Minimo 3 caracteres").max(50, "Máximo 50 caracteres"),
            curp: yup.string().required("Campo obligatorio").min(18, "Minimo 18 caracteres").max(18, "Máximo 18 caracteres"),
            birthdate: yup.string().required("Campo obligatorio").test("Demasiada edad","Parece que eres muy viejo",
            function (value) {        
                const fechaIngresada = Date.parse(value);
                const fechaActual = Date.now();
                const diferencia = fechaActual - fechaIngresada;
                const edad = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));
                const limiteEdad = 90;
                return edad <= limiteEdad;}
            ).test("Muy poca edad edad","Parece que eres muy joven",
            function (value) {        
                const fechaIngresada = Date.parse(value);
                const fechaActual = Date.now();
                const diferencia = fechaActual - fechaIngresada;
                const edad = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));
                const limiteEdad = 18;
                return edad >= limiteEdad;}
            ) ,
        }),

        onSubmit: async (values, { setSubmitting }) => {
            confirmAlert(async () =>{
                try {
                //values que son los datos planos se construye como objeto de persoa que dentro de persona 
                //values -> person{user: {}}
                const payload = {
                    ...values,
                    birthDate: values.birthdate,
                    user:{
                        username: values.username,
                        password: values.password,
                        avatar: values.avatar,
                        roles: [{id: values.role}],
                    }

                }
                
                const response = await AxiosCliente({
                    method:'POST',
                    url: "/person/",
                    data: payload
                });
                if(!response.error){
                    customAlert('Registrado correctamente',
                    'Usuario registrado correctamente'
                    ,'success');
                    getAllUsersU();
                    closeModal();
                }
                } catch (error) {
                    customAlert('Error al registrar el usuario',
                    'Error al registrar, intentalo mas tarde'
                    ,'error')
                    console.log(error);
                }finally{
                    setSubmitting(false);
                }
            })
        },
    })

    const handleImageChange = async (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('avatar', file);

        // Convierte el archivo a base64
        const base64Image = await getBase64(file);
        formik.setFieldValue('avatar', base64Image);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (


        <>
            <Modal
                show={openU}
                position={modalPlacement}
                onClose={onCloseU}
                size={"6xl"}
            >
                <Modal.Header>REGISTER</Modal.Header>
                <Modal.Body>
                    <div className=''>
                        <form className="flex w-full" noValidate onSubmit={formik.handleSubmit}>
                            <div className='flex w-1/2'>
                                <Card className='flex w-full'>
                                    <div className='flex mt-3 bg-gray-100 w-full font-bold justify-center'>
                                        <h1>Person</h1>
                                    </div>
                                    <div className='mt-2'>
                                        <div className="mb-2 block w-full">
                                            <Label htmlFor="name" value={name} />
                                        </div>
                                        <TextInput id="name" name='name' type="text" placeholder="name" required
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.name && formik.errors.name ?
                                                    (<span className='text-sm text-red-600'>
                                                        {formik.errors.name}
                                                    </span>) : null
                                            }
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="lastname" value="apellido" />
                                        </div>
                                        <TextInput id="lastname" name='lastname' type="text" placeholder="last name" required
                                            value={formik.values.lastname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.lastname && formik.errors.lastname ?
                                                    (<span className='text-sm text-red-600'>
                                                        {formik.errors.lastname}
                                                    </span>) : null
                                            }
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="surname" value="segundo apellido" />
                                        </div>
                                        <TextInput id="surname" name='surname' type="text" placeholder="surname" required
                                            value={formik.values.surname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.surname && formik.errors.surname ?
                                                    (<span className='text-sm text-red-600'>
                                                        {formik.errors.surname}
                                                    </span>) : null
                                            } 
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="curp" value="curp" />
                                        </div>
                                        <TextInput id="curp" type="text" name='curp' placeholder='curp' required
                                            value={formik.values.curp}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.curp && formik.errors.curp ?
                                                    (<span className='text-sm text-red-600'>
                                                        {formik.errors.curp}
                                                    </span>) : null
                                            }
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="birthdate" value="birdthdate" />
                                        </div>
                                        <TextInput id="birthdate" type="date" name='birthdate' placeholder='birthdate' required
                                            value={formik.values.birthdate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.birthdate && formik.errors.birthdate ?
                                                    (<span className='text-sm text-red-600'>
                                                        {formik.errors.birthdate}
                                                    </span>) : null
                                            }
                                        />
                                    </div>

                                </Card>
                            </div>
                            <div className='flex w-1/2'>
                                <Card className='flex w-full'>
                                    <div className='flex mt-3 bg-gray-100 font-bold w-full justify-center'>
                                        <h1>User</h1>
                                    </div>
                                    <div className='mt-3'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="username" value="user name" />
                                        </div>
                                        <TextInput id="username" name='username' type="text" placeholder='name user' required
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.username && formik.errors.username ?
                                                    (<span className='text-sm text-red-600'>
                                                        {formik.errors.username}
                                                    </span>) : null
                                            }
                                        />
                                    </div>
                                    <div className="max-w-md">
                                        <div className="mb-2 block">
                                            <Label htmlFor="role" value="Select your country" />
                                        </div>
                                        <Select id="role" name='role' required
                                            value={formik.values.role}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.role && formik.errors.role ?
                                                    (<span className='text-sm text-red-600'>
                                                        {formik.errors.role}
                                                    </span>) : null
                                            }
                                        >
                                            <option value="1">ADMIN_ROLE</option>
                                            <option value="3">USER_ADMIN</option>
                                            <option value="2">CLIENT_ADMIN</option>
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="password" value="password" />
                                        </div>
                                        <TextInput id="password" name='password' type="text" placeholder='password' required
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.password && formik.errors.password ?
                                                    (<span className='text-sm text-red-600'>
                                                        {formik.errors.password}
                                                    </span>) : null
                                            }
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="confirmPassword" value="confirmar password" />
                                        </div>
                                        <TextInput id="confirmPassword" type="text" name='confirmPassword' placeholder='*********' required
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                                    (<span className='text-sm text-red-600'>
                                                        {formik.errors.confirmPassword}
                                                    </span>) : null
                                            }
                                        />
                                    </div>
                                    <div className='mt-2'>
                                        <div>
                                            <Label htmlFor="file-upload-helper-text" value="cambia tu avatar" />
                                        </div>
                                        <FileInput id="file-upload-helper-text" name='file-upload-helper-text'
                                            accept='image/*'
                                            onChange={handleImageChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.avatar && formik.errors.avatar ?
                                                    (<span className='text-sm text-red-600'>
                                                        {formik.errors.avatar}
                                                    </span>) : null
                                            }
                                        />
                                    </div>
                                </Card>

                            </div>
                            <div className='flex mt-2 '>
                                <Button type="submit" className='w-full'>Registrtar</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={onCloseU} disabled={formik.isSubmitting || !formik.isValid}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdate