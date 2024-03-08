import { Button, Label, TextInput, Modal, FileInput } from 'flowbite-react';
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
            >
                <Modal.Header>REGISTER</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6 p-6">
                        <form className="flex max-w-md flex-col gap-4 ">
                            <div className=''>
                                <div className='mt-3 bg-gray-100'>
                                    <h1>Person</h1>
                                </div>
                                <div className='mt-2'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="name1" value="nombre" />
                                    </div>
                                    <TextInput id="name1" type="text" placeholder="name" required />
                                </div>
                                <div className='mt-2'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="lastname1" value="apellido" />
                                    </div>
                                    <TextInput id="lastname1" type="text" placeholder="last name" required />
                                </div>
                                <div className='mt-2'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="surname1" value="segundo apellido" />
                                    </div>
                                    <TextInput id="surname1" type="text" placeholder="surname" required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="curp1" value="curp" />
                                    </div>
                                    <TextInput id="curp1" type="text" placeholder='curp' required />
                                </div>
                                <div className='mt-3 bg-gray-100'>
                                    <h1>User</h1>
                                </div>
                                <div className='mt-3'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="nameuser1" value="user name" />
                                    </div>
                                    <TextInput id="nameuser1" type="text" placeholder='name user' required />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password1" value="password" />
                                    </div>
                                    <TextInput id="password1" type="text" placeholder='password' required />
                                </div>
                                <div className='mt-2'>
                                    <div>
                                        <Label htmlFor="file-upload-helper-text" value= "cambia tu avatar" />
                                    </div>
                                    <FileInput id="file-upload-helper-text" helperText="(MAX. 800x400px)." />
                                </div>
                                <div className='mt-2'>
                                    <Button type="submit" className='w-full'>Registrtar</Button>
                                </div>
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
