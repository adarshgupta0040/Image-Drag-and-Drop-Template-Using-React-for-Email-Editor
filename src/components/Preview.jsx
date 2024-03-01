// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import { Heading, List, Stack, Button } from "@chakra-ui/react";
// import Player from "./Player";
// import { useState, useEffect } from "react";
// import { useDrop } from "react-dnd";

// const Preview = () => {
//     const navigate = useNavigate()

//     const backtohome = async () => {
//         navigate('/')
//     }

//     const [team, setTeam] = useState([]);

//     const [listStyle, setListStyle] = useState({
//         width: "100%",
//         padding: "5px",
//         align: "center",
//     });

//     const [isurl, setIsurl] = useState("");

//     const [showsidebar, setshowsidebar] = useState(true);

//     const [{ isOver }, addToTeamRef] = useDrop({
//         accept: "player",
//         collect: (monitor) => ({ isOver: !!monitor.isOver() }),
//     });

//     // const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
//     //     accept: "team",
//     //     collect: (monitor) => ({ isOver: !!monitor.isOver() }),
//     // });

//     // const movePlayerToTeam = (item) => {
//     //     console.log(item);

//     //     setPlayer((prev) => prev.filter((_, i) => item.index !== i));
//     //     // setTeam((prev) => [item]);
//     //     setTeam((prev) => [item, ...prev]);
//     // };

//     const removePlayerFromTeam = (item) => {
//         console.log(item);
//         // setTeam((prev) => prev.filter((_, i) => item.index !== i));
//         // setPlayer((prev) => [...prev, item]);
//     };

//     const handleWidthChange = (e) => {
//         setListStyle({ ...listStyle, width: e.target.value });
//     };

//     const handlePaddingChange = (e) => {
//         setListStyle({ ...listStyle, padding: e.target.value });
//     };

//     const handleAlignmentChange = (e) => {
//         setListStyle({ ...listStyle, align: e.target.value });
//     };


//     const [ismobileview, setmobileview] = useState(false);

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth <= 750) { setshowsidebar(false); }
//             else {
//                 setshowsidebar(true);
//             }

//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);


//     return (
//         <div>
//             <h1>Hi hello</h1>
//             <div className='second-mobile'>
//                 <Stack className={ismobileview ? 'second-mobile-child' : ''} width="100%" style={{ height: "100%", marginRight:"30px"}}>
//                     <Heading fontSize="3xl" color="teal.800" textAlign="center">
//                         preview
//                         <Button colorScheme='teal' size='sm' onClick={backtohome} style={{ float: "right" }}>Exit Preview</Button>

//                     </Heading>
//                     <List
//                         bgGradient={
//                             isOver
//                                 ? "linear(to-b, teal.300, teal.500)"
//                                 : "linear(to-b, teal.100, teal.200)"
//                         }
//                         ref={addToTeamRef}
//                         minH="70vh"
//                         boxShadow="xl"
//                         borderRadius="md"
//                         p="4"
//                         style={{ height: "100%" , margin:"30px"}}
//                     >
//                         {team.map((p, i) => {
//                             return (
//                                 <Player
//                                     item={p}
//                                     key={p}
//                                     index={i}
//                                     playerType="team"
//                                     styles={listStyle}
//                                     link={isurl}
//                                     onDropPlayer={removePlayerFromTeam}
//                                 />
//                             );
//                         })}
//                         {/* {team.map((p, i) => (
//               <Player
//                 item={p}
//                 key={p}
//                 index={i}
//                 playerType="team"
//                 styles={listStyle}
//                 link={isurl}
//                 onDropPlayer={removePlayerFromTeam}
//               />
//             ))} */}
//                     </List>
//                 </Stack>

//             </div>
//         </div>
//     )
// }

// export default Preview
