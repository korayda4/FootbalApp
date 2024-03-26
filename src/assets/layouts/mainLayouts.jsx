import React from 'react'; 
import { Link, Outlet, useParams } from "react-router-dom";
import { Button,FloatButton,Input} from 'antd';
import FootballLogo from "../img/Black & White Minimalist Business Logo (2)-Photoroom.png-Photoroom.png"


export default function MainLayout() {
    const { Search } = Input;
    const { id , get , name , playerID , season , teamID} = useParams()
      
    return (
        <div className="container">
            <div className="FootballContainer">
                    <div className="FootbalHeader">
                    <div className="headerDetails">
                        <img src={FootballLogo} alt="Logo" />
                        <div className="detailText">
                        <h3>TURKEY</h3>
                        <p style={{fontSize:"10px"}}>{id ? id:teamID} / {get ? get:season} / {name ? name:playerID} {playerID ? `/${playerID}`:null} </p>
                        </div>
                    </div>
                        <div className="headerOptions">
                        <Button type="text">Oyuncu Ara</Button>
                        <Button type="text">Lig Ara</Button>
                        <Button type="text">Ülke Ligleri</Button>
                        <Button type="text">Maç Sonuçları</Button>
                        <Button type="text">Sıralama</Button>
                        
                        </div>
                    </div>
                    <div className="DetailsList">
                         <Outlet />
                    </div> 
            </div>
        </div>
        
    )
}