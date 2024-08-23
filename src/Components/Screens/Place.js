import React, { useState, useEffect, useContext } from 'react'
import Header from './includes/Header';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import axios from 'axios';
import { BASE_URL } from "../../axioxConfig";
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';

function Place() {
  const { id } = useParams();
  const [Place, setPlace] = useState({
    name: "",
    gallery: [],
  });

  const { userData } = useContext(UserContext)



  useEffect(() => {
    console.log(userData);
    axios.get(`${BASE_URL}places/protected/${id}`,{
      headers:{
        Authorization:`Bearer ${userData?.access}`
      }
    })
      .then((response) => {
        setPlace(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }, [id,userData]);
  return (
    <div>
      <Helmet>
        <Title>{Place.name}</Title>
      </Helmet>
      <Header />
      <MainContainer>
        <Title>{Place.name}</Title>
        <InfoContainer>
          <CategorYName>{Place.category_name}</CategorYName>
          <LocationContainer>
            <LocationIcon src={require("../../assests/images/place.svg").default} alt="image" />
            <LocationName>{Place.location}</LocationName>
          </LocationContainer>
        </InfoContainer>
        <GalleryContainer>
          <GalleryImageItem>
            <GalleryImage src={Place.image} alt="image" />
          </GalleryImageItem>
          {
            Place.gallery.map((image) => (
              <GalleryImageItem>
                <GalleryImage src={image.image} alt="image" />
              </GalleryImageItem>
            )
            )
          }
        </GalleryContainer>
        <SubHeading>
          Place Details
        </SubHeading>
        <Description>{Place.description}</Description>
      </MainContainer>
    </div>
  )
}
const MainContainer = styled.div`
width:70%;
margin:70px auto 0;
`;
const Title = styled.h1`
font-size:48px;
margin-bottom:15px;
`;

const CategorYName = styled.span`
padding:5px 10px;
border-radius:20px;
display:inline-flex;
border:1px solid #9c9c9c;
color:#9c9c9c;
margin-right:15px;
`;

const InfoContainer = styled.div`
display:flex;
margin-bottom:15px;
`;

const LocationContainer = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`;

const LocationIcon = styled.img`
margin-right:5px;
`;
const LocationName = styled.span`
color:#9c9c9c;
font-weight:bold;
font-size:14px;
`;

const GalleryContainer = styled.ul`
display:grid;
grid-template-columns:repeat(4,1fr);
 grid-gap:20px;
 border-radius:15px;
 overflow:hidden;
 margin-bottom:35px;
 list-style-type: none;
 `;

const GalleryImageItem = styled.li`
&:first-child{
  grid-column-end: span 2;
  grid-row-end: span 2;
 
}
`;

const GalleryImage = styled.img`
width:100%;
display:block;
`;

const SubHeading = styled.h3`
font-size:28px;
margin-bottom:20px;
`;

const Description = styled.p`
font-size:16px;
line-height:1.6em;
`;
export default Place
