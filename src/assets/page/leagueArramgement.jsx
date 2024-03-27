import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Link, useParams } from 'react-router-dom';

function leagueArrangement () {
    const [data, setData] = useState(null);
    const {id} = useParams()
    const [country, setCountry] = useState( "Turkey");
    const urlLeague = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&league=${id != undefined ? "203":id}`;
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
            const response = await fetch(urlLeague, options);
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

        <div className='siralama'>
            <header style={{width:"90%",backgroundColor:"white",padding:"16px",margin:"12px",borderRadius:"12px",textAlign:"center"}}>
                <h1>SIRALAMA</h1>
            </header>
            {data ? data.response[0].league.standings[0].map((x,i) => {


            return(
            <div id={x.team?.id} key={i} className="team">
                <div className="siralamaDiv">
                    <div className="teamName-Logo">
                        <img src={x.team?.logo} alt="" />
                        <h1>{x.team?.name}</h1>
                    </div>
                    <div className="point-rank">
                        <h1>{x.points} Puan</h1>
                        <h5>İle {x.rank}. Sırada</h5>
                    </div>
                </div>
                <img src={x.country?.flag} alt="" />
                
                {/* <Link to={`/${data.get}/${data.parameters.country}/Teams/${x.team.id}/${x.league.name}`}><button>{">"}</button></Link> */}
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
        </div>
    )

}

export default leagueArrangement