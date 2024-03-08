import { Button, Label, TextInput, Modal, FileInput, Card } from 'flowbite-react';
import React, { useState } from 'react';

const ModalRegister = ({ open, onClose }) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalPlacement, setModalPlacement] = useState('center')

    return (
        <>
            <Modal
                show={open}
                position={modalPlacement}
                onClose={onClose}
                size={"xl"}
            >
                <Modal.Header>REGISTER</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6 w-full">
                        <form className="flex max-w-md flex-col gap-4 w-full">
                            <div className='  w-full'>
                                <Card className=' w-full'>
                                <div className='flex mt-3 bg-gray-100 w-full font-bold justify-center'>
                                    <h1>Person</h1>
                                </div>
                                <div className='mt-2'>
                                    <div className="mb-2 block w-full">
                                        <Label htmlFor="name1" value="nombre" />
                                    </div>
                                    <TextInput id="name1" name='name1' type="text" placeholder="name" required />
                                </div>
                                <div className='mt-2'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="lastname1" value="apellido" />
                                    </div>
                                    <TextInput id="lastname1" name='lastname1' type="text" placeholder="last name" required />
                                </div>
                                <div className='mt-2'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="surname1" value="segundo apellido" />
                                    </div>
                                    <TextInput id="surname1" name='surname' type="text" placeholder="surname" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="curp1" value="curp" />
                                    </div>
                                    <TextInput id="curp1" type="text" name='curp1' placeholder='curp' required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="date1" value="birdthdate" />
                                    </div>
                                    <TextInput id="date1" type="date" name='curp1' placeholder='curp' required />
                                </div>
                                
                                </Card>
                                <Card className='flex'>
                                <div className='flex mt-3 bg-gray-100 font-bold w-full justify-center'>
                                    <h1>User</h1>
                                </div>
                                <div className='mt-3'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="nameuser1" value="user name" />
                                    </div>
                                    <TextInput id="nameuser1" name='username1' type="text" placeholder='name user' required />
                                </div>
                                <div className='mt-3'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="rol1" value="Rol"  />
                                    </div>
                                    <TextInput id="rol1" name='rol1' type="select" placeholder='AdminHome' required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password1" value="password" />
                                    </div>
                                    <TextInput id="password1" name='password1' type="text" placeholder='password' required />
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
                                    <FileInput id="file-upload-helper-text" name='file-upload-helper-text'  />
                                </div>
                                </Card>
                            </div>
                            <div className='mt-2'>
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
