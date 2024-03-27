import { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';                                              
import { Spin,Pagination , Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

const AllMatch = () => {
    const [data, setData] = useState(null);
    const [country, setCountry] = useState( "Turkey");
    const { id , get , name ,teamID } = useParams();
    const urlAllMatch = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${id}&season=2023`;
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'aab97a10efmsh009a93e544d35cap14d640jsn2f33093793fd',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    const loadingDiv = (
    <div className='loading'>
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
        </div>)

    useEffect(() => {
        const getAllMatch = async () => {
            try {
                const response = await fetch(urlAllMatch, options);
                const result = await response.json();
                setData(result)
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        };

        getAllMatch();
    },[country]);

    return (
        <>
            <div className="allMatchs">
                <header style={{width:"90%",padding:"16px",backgroundColor:"white",margin:"12px",textAlign:"center",borderRadius:"12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <h1>TÜM MAÇ SKORLARI</h1>
                    <img style={{width:"64px"}} src={data ? data.response[0].league.logo:null} alt="LeagueLogo" />
                </header>
                {data ? (data.response.map((x,i) => {
                    return(
                        <div key={i} className={`match ${x.teams.home.winner}`} >
                            
                            <div className='dateTime'>
                                <h4>{x.fixture.date.slice(0,10)}</h4>
                            </div>
                            <div className="matchLogo">
                                <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                                    <img src={x.league.logo} alt="LeagueLogo" />
                                    <h5>90 DK</h5>
                                    <img src={x.league.flag} alt="LeagueFlag" />
                                </div>
                            </div>
                            <div className="teams">
                                <div className="home">
                                    <img src={x.teams.home.logo} alt="TeamLogo" />    
                                    
                                </div>
                                <div className="score">
                                    <h1>{x.goals?.home}</h1>
                                    <h1>:</h1>
                                    <h1>{x.goals?.away}</h1>
                                </div>
                                <div className="away">
                                    
                                    <img src={x.teams.away.logo} alt="TeamLogo" />    
                                </div>
                                
                            </div>
                        </div>
                    )
                })):loadingDiv}
            </div>
        </>
    )
}

export default AllMatch