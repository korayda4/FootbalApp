import { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';

function AllLeague () {
    const [data, setData] = useState(null);
    const [country, setCountry] = useState( "Turkey");
    const urlLeague = `https://api-football-v1.p.rapidapi.com/v3/leagues`;
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

        <>
            {data ? data.response.map((x,i) => {


            return(
            <div id={x.league?.id} key={i} className="leagueDetail">
                <div className="detailText">
                <img src={x.league?.logo} alt="" />
                <div className="info">
                    <h2>{x.league?.name}</h2>
                    <h5>{x.league?.founded}</h5>
                </div>
                </div>
                <img src={x.country?.flag} alt="" />
                
                <Link to={`/${data.get}/${data.parameters.country}/Teams/${x.league.id}/${x.league.name}`}><button>{">"}</button></Link>
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

export default AllLeague