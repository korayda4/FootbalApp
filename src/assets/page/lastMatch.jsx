import { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import  PlayerHeight from "../img/icons8-height-100.png"                                                       
import  PlayerWeight from "../img/icons8-scale-100.png"      
import  Country from "../img/icons8-region-100.png"                                                 
import { Spin,Pagination , Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

const lastMatch = () => {
    const [data, setData] = useState(null);
    const [country, setCountry] = useState( "Turkey");
    const { id , get , name ,teamID } = useParams();

    const urlPlayer = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${id}&season=2023&team=${teamID}&last=20`;


    useEffect(() => {
        const getLastMatch = async () => {
          try {
            const response = await fetch(urlPlayer, options);
            const result = await response.json();
            setData(result)
            console.log(result);
          } catch (error) {
            console.error(error);
          }
        };
    
        getLastMatch();
    },[country]);
}

export default lastMatch