import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Candidate Details',
    path: '/admin/candidatedetails',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    index:0,
  },
  {
    title: 'Add Candidates',
    path: '/admin/addcandidate',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    index:1,
  },
  {
    title: 'Register',
    path: '/admin/register',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    index:2,
  },
  {
    title: 'Change Phase',
    path: '/admin/changestate',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
    index:3,
  },
  {
    title: 'Analysis',
    path: '/admin/analysis',
    icon: <IoIcons.IoMdAnalytics />,
    cName: 'nav-text',
    index:4,
  }
];