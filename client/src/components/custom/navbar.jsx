import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useNavigate } from 'react-router-dom'



function Navbar({ heading }) {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='flex justify-between items-center w-full fixed border-b py-1 px-4'>
      <h1 className='ml-96 text-4xl font-bold'>{heading}</h1>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger style={{ outline: 'none', border: 'none' }}>
            <Avatar className='cursor-pointer w-8 h-8'>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Profile <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>Settings</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleLogout} className='border-t'>Logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}

export default Navbar
