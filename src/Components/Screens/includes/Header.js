import React,{useContext} from 'react';

import styled from "styled-components";
import { UserContext } from '../../../App';
import { Link } from 'react-router-dom';

function Header() {
    const {userData, updateUserData} = useContext(UserContext);
    const handleLogout = () =>{
        updateUserData({type: "LOGOUT"})
    }
        
    return (
        <HeaderContainer>

            <LeftBox>
                <Logo src={require("../../../assests/images/logo.svg").default} alt="logo"/>
            </LeftBox>

            <RightBox>
                {userData ? (
                    <Button onClick={()=>handleLogout()}>Logout</Button>
                )
                : (
                    <Button to="auth/login/">Login</Button>
                )
            }
                
            </RightBox>

        </HeaderContainer>
    )
}
const HeaderContainer = styled.div`
width:90%;
margin:0 auto;
padding: 30px 0px;
display: flex;
justify-content: space-between;
align-items: center;
`;


const LeftBox = styled.div``;

const RightBox = styled.div`
display:flex;
align-items:center`;

const Button = styled(Link)`
text-decoration:none;
background-color:#048bf7;
border-radius:4px;
padding:13px 45px;
color:#fff;
font-size:18px;
font-weight:bold;
`;

const Logo = styled.img`
width:150px;
display:block;
`;

export default Header

