import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import { ImProfile } from "react-icons/im";
import {MdContactMail} from 'react-icons/md';

// import * as IoIcons from 'react-icons/io';
import {IoIdCard} from 'react-icons/io5';
export const SidebarData = [
  {
    title: 'Information',
    path: '/user/home',
    icon: <AiIcons.AiFillInfoCircle />,
    cName: 'nav-text',
    index:0,
  },
  {
    title: 'User Registration',
    path: '/user/register',
    icon: <FiIcons.FiUserCheck />,
    cName: 'nav-text',
    index:1,
  },
  {
    title: 'Voting Area',
    path: '/user/vote',
    icon: <IoIdCard />,
    cName: 'nav-text',
    index:2,
  },
  {
    title: 'Result',
    path: '/user/showResult',
    icon: <FaIcons.FaCheck />,
    cName: 'nav-text',
    index:3,
  },
  {
    title: 'Profile',
    path: '/user/profile',
    icon: <MdContactMail />,
    cName: 'nav-text',
    index:4,
  },
  {
    title: 'Contact Us',
    path: '/user/contact',
    icon: <ImProfile />,
    cName: 'nav-text',
    index:5,
  }
];