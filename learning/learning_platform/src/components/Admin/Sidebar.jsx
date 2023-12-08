import React from 'react'
import { VStack, Button } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri';

const Sidebar = () => {
    const location = useLocation();

    return <VStack spacing={'8'} p={'16'} boxShadow={'-2px 0 10px rgba(107, 70, 193, .5)'}>
        <LinkButton path={'dashboard'} Icon={RiDashboardFill} text={'Dashboard'} active={location.pathname === '/admin/dashboard'} />
        <LinkButton path={'createcourse'} Icon={RiAddCircleFill} text={'Create Course'} active={location.pathname === '/admin/createcourse'} />
        <LinkButton path={'courses'} Icon={RiEyeFill} text={'Courses'} active={location.pathname === '/admin/courses'} />
        <LinkButton path={'users'} Icon={RiUser3Fill} text={'Users'} active={location.pathname === '/admin/users'} />
    </VStack>
}

export default Sidebar

function LinkButton ({ path, Icon, text, active}) {
    return <Link to={`/admin/${path}`}>
    <Button fontSize={'larger'} variant={'ghost'} colorScheme={active ? 'purple' : ''}>
        <Icon style={{ margin: '4px ' }} />
        {text}
    </Button>
</Link>
}