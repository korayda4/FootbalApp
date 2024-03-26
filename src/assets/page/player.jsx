import { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import  PlayerHeight from "../img/icons8-height-100.png"                                                       
import  PlayerWeight from "../img/icons8-scale-100.png"      
import  Country from "../img/icons8-region-100.png"                                                 
import { Spin,Pagination , Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

function Player () {
    const [data, setData] = useState(null);
    const [country, setCountry] = useState( "Turkey");
    const {playerID} = useParams()
    const urlPlayer = `https://api-football-v1.p.rapidapi.com/v3/players?id=${playerID}&season=2023`;
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'aab97a10efmsh009a93e544d35cap14d640jsn2f33093793fd',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const getLeague = async () => {
          try {
            const response = await fetch(urlPlayer, options);
            const result = await response.json();
            setData(result)
            console.log(result);
          } catch (error) {
            console.error(error);
          }
        };
    
        getLeague();
      },[country]);

    const playerSource = data ? (data.response[0].statistics.map((x,i) => {
    return({
        key:i,
        logo:x.team.logo,
        takim:x.team.name == null ? "0":x.team.name,
        lig:x.league.name,
        sut:x.shots.total == null ? 0:x.shots.total,
        pas:x.passes.total == null ? 0:x.passes.total,
        gol:x.goals.total == null ? 0:x.goals.total,
        asist:x.goals.assists == null ? 0:x.goals.assists,
        oynadi:x.games.appearences == null ? 0:x.games.appearences
    })})):null

    const playerColums = [
        {
            title:"TAKIM LOGO",
            dataIndex:"logo",
            render: (image) => <img style={{width:"64px"}} src={image} alt={image} />
        },
        {
            title:"TAKIM",
            dataIndex:"takim",
            key:"takim"
        },
        {
            title:"LİG",
            dataIndex:"lig",
            key:"lig"
        },
        {
            title:"TOPLAM ŞUT",
            dataIndex:"sut",
            key:"sut"
        },
        {
            title:"TOPLAM PAS",
            dataIndex:"pas",
            key:"pas"
        },
        {
            title:"TOPLAM GOL",
            dataIndex:"gol",
            key:"gol"
        },
        {
            title:"TOPLAM ASİST",
            dataIndex:"asist",
            key:"asist"
        },
        {
            title:"OYNADIĞI KARŞILAŞMA",
            dataIndex:"oynadi",
            key:"oynadi"
        },
      ]

    return (

        <>
            {data ? 
            (<div className="playerDetail">
                <div className="playerDetailHeader">
                    <img src={data.response[0].player.photo} alt="" />
                    <div className="playerInfo">
                        <div className="playerName">
                            <div className="firstLastName">
                                <h1>{data.response[0].player.firstname}</h1>
                                <h1>{data.response[0].player.lastname}</h1>
                            </div>
                            
                            <h5>{data.response[0].player.age} Yaşında</h5>
                        </div>
                        <div  className="playerWH">
                            <div className="playerWeight">
                                <h3>{data.response[0].player.weight}</h3>
                                <img src={PlayerWeight} alt="" />
                            </div>

                            <div className="playerHeight">
                                <h3>{data.response[0].player.height}</h3>
                                <img src={PlayerHeight} alt="" />
                            </div>

                            <div className="playerCountry">
                                <h3>{data.response[0].player.nationality}</h3>
                                <img src={Country} alt="" />
                            </div>
                        </div>
                           
                        
                    </div>
                </div>
                <div className="playerDetailTable">
                    <Table pagination={false} className="table" dataSource={playerSource} columns={playerColums} />
                </div>
            </div>
            

            ):<div className='loading'>
                <Spin
                    indicator={
                    <LoadingOutlined
                        style={{
                        fontSize: 24,
                        }}
                        spin
                    />
                    }
                />
                </div>}
        </>
    )

}

export default Player