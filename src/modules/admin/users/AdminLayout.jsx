import React from 'react'
import { Button, Navbar, Sidebar, SidebarItem, SidebarItemGroup } from 'flowbite-react';
import { HiUser} from 'react-icons/hi';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    //diseñar el layout de admin
    return (
        <>
            <header>
                <Navbar className='border border-slate-950	'>
                    <Navbar.Brand as={Link} href="https://flowbite-react.com">
                        <img src="../../../../img/loginLogo.jpeg" alt="" className='mr-3 h-6 sm:h-9' />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Sotore Manage </span>
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        <Navbar.Link>
                            Home
                        </Navbar.Link>
                        <Navbar.Link>
                            About
                        </Navbar.Link>
                        <Navbar.Link>
                            <Button className='mr-3 h-6 sm:h-9'
                                color="failure">Cerrar sesión</Button>
                        </Navbar.Link>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <div className="flex">
                <div className="flex-initial w-32 border ">
                    <aside>
                        <Sidebar className='border border-slate-950 '>
                            <Sidebar.Items>
                                <Sidebar.ItemGroup>
                                    <Sidebar.Item href="#" icon={HiUser}>
                                        Users
                                    </Sidebar.Item>
                                </Sidebar.ItemGroup>
                            </Sidebar.Items>
                        </Sidebar>
                    </aside>
                </div>
                <div className="flex-initial w-full border border-slate-950">
                    <main >
                     <section className='px-4 pt-2 pb-8'>
                        <Outlet
                        
                        />
                     </section>
                    </main>
                </div>
            </div>

        </>
    )
}

export default AdminLayout