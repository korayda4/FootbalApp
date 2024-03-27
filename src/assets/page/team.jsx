import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Pagination , Space, Table, Tag } from 'antd';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function Team () {
    const [data, setData] = useState(null);
    const [data2 , setData2] = useState(null);
    const [coachData , setCoachData] = useState(null);
    const [playerData , setPlayerData] = useState(null);
    const { id , get , name ,teamID } = useParams();
    const [country, setCountry] = useState( "Turkey");

    const playerUrl = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${teamID}`
    const coachURL = `https://api-football-v1.p.rapidapi.com/v3/coachs?team=${teamID}`
    const teamInfoURL = `https://api-football-v1.p.rapidapi.com/v3/teams?id=${teamID}&league=${id}&season=2023`
    const teamStandings = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&team=${teamID}`
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'aab97a10efmsh009a93e544d35cap14d640jsn2f33093793fd',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const getTeamInfo = async () => {
          try {
            const response = await fetch(teamInfoURL, options);
            const result = await response.json();
            setData(result)
            console.log(result);
          } catch (error) {
            console.error(error);
          }
        };

        const getTeamStatistics = async () => {
          try {
            const response = await fetch(teamStandings, options);
            const result = await response.json();
            setData2(result)
            console.log(result);
          } catch (error) {
            console.error(error);
          }
        };

        const getCoachData = async () => {
          try {
            const response = await fetch(coachURL, options);
            const result = await response.json();
            setCoachData(result)
            console.log(result);
          } catch (error) {
            console.error(error);
          }
        };

        const getPlayerData = async () => {
          try {
            const response = await fetch(playerUrl, options);
            const result = await response.json();
            setPlayerData(result)
            console.log(result);
          } catch (error) {
            console.error(error);
          }
        };
        
        getPlayerData()
        getCoachData()
        getTeamStatistics()
        getTeamInfo();
      },[country]);

      const columns = [
        {
          title: 'LİG',
          dataIndex: 'lig',
          key: 'lig',
        },
        {
          title: 'GRUP',
          dataIndex: 'grup',
          key: 'grup',
        },
        {
          title: 'OYNANAN',
          dataIndex: 'oynanan',
          key: 'oynanan',
        },
        {
          title: 'KAZANILAN',
          dataIndex: 'kazanilan',
          key: 'kazanilan',
        },
        {
          title: 'KAYBEDİLEN',
          dataIndex: 'kaybedilen',
          key: 'kaybedilen',
        },
        {
          title: 'BERABERE',
          dataIndex: 'berabere',
          key: 'berabere',
        },
        {
          title: 'AÇIKLAMA',
          dataIndex: 'aciklama',
          key: 'aciklama',
        },
        {
          title: 'PUAN',
          dataIndex: 'puan',
          key: 'puan',
        },
        {
          title: 'SIRA',
          dataIndex: 'sira',
          key: 'sira',
        },
      ];

      const coachColumns = [
        {
          title:"ANTRENÖR",
          dataIndex:"antrenor",
          key:"antrenor"
        },
        {
          title:"YAŞ",
          dataIndex:"yas",
          key:"yas"
        },
        {
          title:"DOĞUM TARİHİ",
          dataIndex:"dgm_trh",
          key:"dgm_trh"
        },
        {
          title:"DOĞUM YERİ",
          dataIndex:"dgm_yeri",
          key:"dgm_yeri"
        },
        {
          title:"BOY",
          dataIndex:"boy",
          key:"boy"
        },
        {
          title:"RESİM",
          dataIndex:"resim",
          render: (image) => <img style={{width:"64px"}} src={image} alt={image} />
        },
        {
          title:"KARİYER",
          dataIndex:"kariyer",
          key:"kariyer"
        },
        {
          title:"DETAY",
          dataIndex:"detay",
          render: (coachID) => <Link to={`/coach/${teamID}/${coachID}`}>İncele</Link>
        }
      ]

      const playerColums = [
        {
          title:"RESİM",
          dataIndex:"resim",
          render: (image) => <img style={{width:"64px"}} src={image} alt={image} />
        },
        {
          title:"OYUNCU",
          dataIndex:"oyuncu",
          key:"oyuncu"
        },
        {
          title:"YAŞ",
          dataIndex:"yas",
          key:"yas"
        },
        {
          title:"NUMARA",
          dataIndex:"numara",
          key:"numara"
        },
        {
          title:"POZİSYON",
          dataIndex:"pozisyon",
          key:"pozisyon"
        },
        {
          title:"DETAY",
          dataIndex:"detay",
          render: (playerID) => <Link to={`/${name}/Player/${playerID}`}>İncele</Link>
        },
      ]
      
      const playerSource = playerData ? (playerData.response[0].players.map((x,i) => {return({
        key:i,
        resim:x.photo,
        oyuncu:x.name,
        numara:x.number,
        yas:x.age,
        pozisyon:x.position,
        detay:x.id
      })})):null

      

      const coachDataSource = coachData ?[{
        key:"1",
        antrenor:coachData.response[0].firstname+" "+coachData.response[0].lastname,
        yas:coachData.response[0].age,
        dgm_trh:coachData.response[0].birth.date,
        dgm_yeri:coachData.response[0].birth.place,
        boy:coachData.response[0].height,
        resim:coachData.response[0].photo,
        kariyer:`${coachData.response[0].career.length} Takım Yönetti`,
        detay:coachData.response[0].id
      }]:null

      const dataSource = data2 ? data2.response.map((x,i) => {
        return({
          key:i,
          lig:x.league.name,
          oynanan:x.league.standings[0][0].all.played,
          kazanilan:x.league.standings[0][0].all.win,
          kaybedilen:x.league.standings[0][0].all.lose,
          berabere:x.league.standings[0][0].all.draw,
          aciklama:x.league.standings[0][0].description,
          sira:x.league.standings[0][0].rank,
          grup:x.league.standings[0][0].group,
          puan:x.league.standings[0][0].points
        })}):null

    return (


          (data && data2 ? (
            <div className="teamInfo">
              <div className="teamHeader">
                <div className="teamTitle">
                  <img src={data.response[0].team.logo} alt="" />

                  <div className="teamTitleChild">
                    <h1>{data.response[0].team.name}</h1>
                    <p>{data.response[0].venue.address}</p>
                  </div>
                </div>
                <div className="rightSide">
                  <div className="optionsButton">
                    <Link to={`/lastMatch/${id}/${name}/${teamID}`}><button>Son 20 Maçı Görüntüle</button> </Link> 
                    <Link to={`/nextMatch/${id}/${name}/${teamID}`}><button>Gelecek 20 Maçı Görüntüle</button> </Link>     
                  </div>
                  <div className="teamTitle2"> 
                   
                    <img className='StadiumName' src={data.response[0].venue.image} alt="" />
                    <div className="titleChild">
                      <h5>Kapasite: {data.response[0].venue.capacity} Kişi</h5>
                      <h5>{data.response[0].venue.name}</h5>
                    </div>
                  </div>
                </div>
                
                
              </div>
              <div className="teamContainer">
                <Table style={{margin:"12px"}} pagination={false} className='table' dataSource={dataSource} columns={columns} />
                <Table style={{margin:"12px"}} pagination={false} className='table' dataSource={coachDataSource} columns={coachColumns} />
                <Carousel dotStyle={{backgroundColor: '#ff0000'}} style={{ margin: '12px' }} autoplaySpeed={10000} autoplay>
                  {playerSource?.map((x, index) => (
                    <Table key={index} pagination={false} className="table" dataSource={[x]} columns={playerColums} />
                  ))}
                </Carousel>
              </div>
            </div>)
        :<div className='loading'>
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
        </div>

    )

)}

export default Team



// {data ? data.response.map((x,i) => {


//   return(
//   <div id={x.league?.id} key={i} className="playersDetail">
//       <img src={x.player.photo} alt="" />
//       <div className="playersText">
//           <img src={x.league?.logo} alt="" />
//           <div className="playerInfo">
//               <h2>{x.player?.name}</h2>
//               <h2>{x.player?.age}</h2>
//               <h2>{x.player?.nationality}</h2>
//               <h2>{x.player?.weight}</h2>
//               <h5>{x.league?.founded}</h5>
//           </div>
//       </div>
      
//       {/* <Link to={`${data.get}/${data.parameters.country}/Teams/${x.league.id}/${x.league.name}`}><button>{">"}</button></Link> */}
//   </div>
//   )

//   }):<div className='loading'>
//       <Spin
//           indicator={
//           <LoadingOutlined
//               style={{
//               fontSize: 24,
//               }}
//               spin
//           />
//           }
//       />
//       </div>}