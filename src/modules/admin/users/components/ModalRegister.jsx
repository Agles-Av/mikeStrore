import { Button, Label, TextInput, Modal, FileInput, Card } from 'flowbite-react';
import { Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from "yup";

const ModalRegister = ({ open, onClose }) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalPlacement, setModalPlacement] = useState('center')

    const formik = useFormik ({
        initialValues:{
            username:"",
            password:"",
            confirmPassword:"",
            role:[],
            name:"",
            surname:"",
            lastname:'',
            curp:'',
            birthdate:'',
            avatar:''
        },
        validationSchema: yup.object().shape({
            username:yup.string().required("Campo obligatorio").max(45,"Solo se permiten 45 caracteres").min(4,"minimo 4 caracteres"),
            password:yup.string().required("Campo obligatorio").min(8,"Minimo 8 caracteres").max(50,"Solo se permiten 50 caracteres"),
            confirmPassword:yup.string().test("confirm password",
            "las contraseñas no coindicen ",function (value){return this.parent.password === value;}),
            role:yup.string().required("Campo obligatorio"),
            name:yup.string().required("Campo obligatorio").min(3,"Minimo 3 caracteres").max(50,"maximo 50 caracteres"),
            surname:yup.string().required("Campo obligatorio").min(3,"Minimo 3 caracteres").max(50,"Máximo 50 caracteres"),
            curp:yup.string().required("Campo obligatorio").min(18,"Minimo 18 caracteres").max(18,"Máximo 18 caracteres"),
            birthdate:yup.string().required("Campo obligatorio"),
        }),
        onSubmit: async (values,{seSubmitting}) =>{
            console.log(values);
        },
    })

    return (


        <>
            <Modal
                show={open}
                position={modalPlacement}
                onClose={onClose}
                size={"6xl"}
            >
                <Modal.Header>REGISTER</Modal.Header>
                <Modal.Body>
                    <div className=''>
                        <form className="flex w-full">
                            <div className='flex w-1/2'>
                                <Card className='flex w-full'>
                                    <div className='flex mt-3 bg-gray-100 w-full font-bold justify-center'>
                                        <h1>Person</h1>
                                    </div>
                                    <div className='mt-2'>
                                        <div className="mb-2 block w-full">
                                            <Label htmlFor="name" value="nombre" />
                                        </div>
                                        <TextInput id="name" name='name' type="text" placeholder="name" required />
                                    </div>
                                    <div className='mt-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="lastname" value="apellido" />
                                        </div>
                                        <TextInput id="lastname" name='lastname' type="text" placeholder="last name" required />
                                    </div>
                                    <div className='mt-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="surname" value="segundo apellido" />
                                        </div>
                                        <TextInput id="surname" name='surname' type="text" placeholder="surname" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="curp" value="curp" />
                                        </div>
                                        <TextInput id="curp" type="text" name='curp' placeholder='curp' required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="date" value="birdthdate" />
                                        </div>
                                        <TextInput id="date" type="date" name='curp1' placeholder='curp' required />
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
                                        <TextInput id="username" name='username' type="text" placeholder='name user' required />
                                    </div>
                                    <div className='mt-3'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="rol" value="Rol" />
                                        </div>
                                        <TextInput id="rol" name='rol' type="select" placeholder='AdminHome' required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="password" value="password" />
                                        </div>
                                        <TextInput id="password" name='password' type="text" placeholder='password' required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="password2" value="confirmar password" />
                                        </div>
                                        <TextInput id="password2" type="text" name='password2' placeholder='*********' required />
                                    </div>
                                    <div className='mt-2'>
                                        <div>
                                            <Label htmlFor="file-upload-helper-text" value="cambia tu avatar" />
                                        </div>
                                        <FileInput id="file-upload-helper-text" name='file-upload-helper-text' />
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
                    <Button color="gray" onClick={onClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalRegister
