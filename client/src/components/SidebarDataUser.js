import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Information',
    path: '/user/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    index:0,
  },
  {
    title: 'User Registration',
    path: '/user/register',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    index:1,
  },
  {
    title: 'Voting Area',
    path: '/user/vote',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    index:2,
  },
  {
    title: 'Result',
    path: '/user/showResult',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    index:3,
  }
];