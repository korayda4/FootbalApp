import { useParams } from 'react-router-dom';
import { useEffect , useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

function Teams () {
    const [data, setData] = useState(null);
    const { id , get , country , name  } = useParams();
    const teamUrl = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${id}&season=2023`;
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
            const response = await fetch(teamUrl, options);
            const result = await response.json();
            setData(result)
            console.log(result);
          } catch (error) {
            console.error(error);
          }
        };
    
        getLeague();
    },[country]);

    return (
        <>
            {data ? data.response.map((x,i) => {


            return(
                <div id={x?.team?.id} key={i} className="teamDetail">
                    <div className="teamText">
                    <img src={x.team.logo ? x.team?.logo:<img src='../img/png-transparent-turkey-national-football-team-super-lig-turkish-football-federation-football-team-logo-football-team-Photoroom.png-Photoroom.png'></img>} alt="" />
                    <div className="info">
                        <div className="title1">
                            <h2>{x.team?.name}</h2>
                            <h5>{x.team?.founded}</h5>
                            <p style={{fontSize:"10px"}}>{x.team.id == "611"? "EN BÜYÜK FENER":null }</p>
                        </div>
                        <h5>#{x.team.code}</h5>
                    </div>
                    </div>
                    <div className="stadTitle">
                        <h4 style={{textAlign:"left",minWidth:"600px"}}>{x.venue.name}</h4>
                        <p style={{color:"grey",fontSize:"10px"}}>{x.venue.address}</p>
                    </div>
                    
                    <Link to={`/${data.get}/${data.parameters.season}/Team/${data.parameters.league}/${x.team?.name}/${x.team.id}`}><button>{">"}</button></Link>
                </div>
                )

                }):<div className='loading'>
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

export default Teams