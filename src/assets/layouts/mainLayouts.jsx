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
                            <Link to={"/allLeague"}><Button type="text">Tüm Ligler</Button></Link>
                            <Link to={`/allMatch/leagues/${id != undefined ? id:"203"}`}><Button type="text">Maç Sonuçları</Button></Link>
                            <Link to={`/legueArrangement/${id != undefined ? id:"203"}`}><Button type="text">Lig Sıralaması</Button></Link>
                            {/* <Button type="text">Takım Ara</Button>
                            <Button type="text">Oyuncu Ara</Button> */}
                        
                        </div>
                    </div>
                    <div className="DetailsList">
                         <Outlet />
                    </div> 
            </div>
        </div>
        
    )
}