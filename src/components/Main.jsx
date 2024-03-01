import React from 'react'
import { Heading, List, Stack, Input, Button } from "@chakra-ui/react";
import Player from "./Player";
import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import viewimg from "./Images/view.png"
import monitor from "./Images/monitor.png"
import mobile from "./Images/cell-phone.png"
import tablet from "./Images/tablet.png"

export default function Main() {


    const [players, setPlayer] = useState([
        // { name: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2017/11/autumn_fireball/17255671-1-eng-GB/Autumn_fireball.jpg" },
        // { name: "https://2.bp.blogspot.com/_opS9Z5vqQYQ/TTYrMHXNiRI/AAAAAAAAAVA/H0gJ2oCoBTg/s1600/html5_bg_no_icons.png" },
        // { name: "https://th.bing.com/th/id/OIP.X8E5YwaBzsJ5QtHWeSGuiQHaEK?rs=1&pid=ImgDetMain" },
    ]);

    const [team, setTeam] = useState([]);

    const [listStyle, setListStyle] = useState({
        width: "100%",
        padding: "5px",
        align: "center",
    });

    const [isurl, setIsurl] = useState("");

    const [showsidebar, setshowsidebar] = useState(true);

    const [showPrev, setshowPrev] = useState(false);

    const [PreviewWdith, setPreviewWidth] = useState("100%");

    const [{ isOver }, addToTeamRef] = useDrop({
        accept: "player",
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    });

    const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
        accept: "team",
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    });

    const movePlayerToTeam = (item) => {
        console.log(item);

        setPlayer((prev) => prev.filter((_, i) => item.index !== i));
        // setTeam((prev) => [item]);
        setTeam((prev) => [item, ...prev]);
        console.log(team)
    };

    const removePlayerFromTeam = (item) => {
        console.log(item);
        // setTeam((prev) => prev.filter((_, i) => item.index !== i));
        // setPlayer((prev) => [...prev, item]);
    };

    const handleWidthChange = (e) => {
        setListStyle({ ...listStyle, width: e.target.value });
    };

    const handlePaddingChange = (e) => {
        setListStyle({ ...listStyle, padding: e.target.value });
    };

    const handleAlignmentChange = (e) => {
        setListStyle({ ...listStyle, align: e.target.value });
    };

    const handleUrlChange = (e) => {
        setIsurl(e.target.value);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const image = reader.result;
                setPlayer([...players, { name: image }]);
            };
            reader.readAsDataURL(file);
        } else {
            console.log('Invalid file selected');
        }
    };

    const generateImageJSON = (image, styles, link) => {
        return {
            filename: image.name,
            src: image.name,
            styles: styles,
            link: link,
        };
    };

    const handleSidebar = (e) => {
        setshowsidebar(!showsidebar)
    }



    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 750) { setshowsidebar(false); }
            else {
                setshowsidebar(true);
            }

        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const showPreview = () => {
        setshowsidebar(false)
        setshowPrev(true)
    }

    const handleExitPreview = () => {
        setshowsidebar(true)
        setshowPrev(false)
        setPreviewWidth("100%")
    }

    const ChangePreviewWidth = (e) => {
        setPreviewWidth(e)
    }

    return (
        <div style={{ minHeight: "100vh" }}>

            <div className='main'>

                <div className={showsidebar ? 'first' : 'first  hidesidebar'} >

                    <div className='first-1' style={{ height: "100%" }}>
                        <Stack width="100%" style={{ height: "100%" }} >

                            <Heading fontSize="3xl" color="yellow.800" textAlign="center">
                                Drag
                            </Heading>
                            <List
                                bgGradient={
                                    isPlayerOver
                                        ? "linear(to-b, yellow.300, yellow.500)"
                                        : "linear(to-b, yellow.100, yellow.200)"
                                }
                                ref={removeFromTeamRef}
                                minH="70vh"
                                boxShadow="xl"
                                borderRadius="md"
                                height="100%"
                                style={{ height: "100%" }}
                            >
                                <input type="file" accept="image/*" style={{ maxWidth: "100%", width: "100%", padding: "20px" }} onChange={handleImageUpload} />
                                {players.map((p, i) => (
                                    <Player
                                        item={p}
                                        key={i}
                                        playerType="player"
                                        styles={listStyle}
                                        onDropPlayer={movePlayerToTeam}
                                        index={i}
                                    />
                                ))}

                                <div className='first-2'>
                                    <Stack justify="space-between">
                                        <Heading fontSize="3xl" color="gray.800" textAlign="center">
                                            Styling Options
                                        </Heading>

                                        <div className='input-group'>
                                            <label htmlFor="width">Width: </label>
                                            <Input
                                                type="text"
                                                placeholder="Width"
                                                value={listStyle.width}
                                                onChange={handleWidthChange}
                                                mb="2"
                                            />
                                        </div>

                                        <div className='input-group'>
                                            <label htmlFor="width">Padding: </label>
                                            <Input
                                                type="text"
                                                placeholder="Padding"
                                                value={listStyle.padding}

                                                onChange={handlePaddingChange}
                                                mb="2"
                                            />
                                        </div>

                                        <div className='input-group'>
                                            <label htmlFor="width">Align: </label>
                                            <select value={listStyle.align} onChange={handleAlignmentChange} mb="2">
                                                <option value="start">Left</option>
                                                <option value="center">Center</option>
                                                <option value="end">Right</option>
                                            </select>
                                        </div>

                                        <div className='input-group'>
                                            <label htmlFor="width">Url: </label>
                                            <Input type="url" value={isurl} onChange={handleUrlChange} placeholder="URL" />
                                        </div>
                                        <div className="prevBtn">
                                            <Button colorScheme='teal' size='sm' onClick={(e) => { showPreview(e) }} style={{}}><img src={viewimg} alt='Preview'/></Button>
                                            <Button colorScheme='teal' size='sm' onClick={(e) => { setPreviewWidth("100%") }} style={{}}><img src={monitor} alt='Desktop' /></Button>
                                            <Button colorScheme='teal' size='sm' onClick={(e) => { setPreviewWidth("365px") }} style={{}}><img src={mobile} alt='Mobile' /></Button>
                                        </div>
                                    </Stack>

                                </div>

                            </List>
                        </Stack>
                    </div>

                </div>


                <div className={showsidebar ? "second" : "second hidesidebar2"} style={{}}>

                    {showPrev ?
                        <div className='PreviewNavbar'>
                            <div className='PreviewNavbarResponsive'>
                                <Button colorScheme='teal' size='sm' onClick={(e) => { ChangePreviewWidth("100%") }} style={{ float: "left" }}><img src={monitor} alt='Desktop'/></Button>
                                <Button colorScheme='teal' size='sm' onClick={(e) => { ChangePreviewWidth("550px") }} style={{ float: "left" }}><img src={tablet} alt='Tablet'/></Button>
                                <Button colorScheme='teal' size='sm' onClick={(e) => { ChangePreviewWidth("365px") }} style={{ float: "left" }}><img src={mobile} alt='Mobile'/></Button>

                                
                            </div>

                            <div className='PreviewExit'>
                                <Button colorScheme='teal' size='sm' onClick={(e) => { handleExitPreview(e) }} style={{ float: "right" }}>Exit Preview</Button>
                            </div>
                        </div> : null}



                    <Stack width="100%" style={{ width: PreviewWdith, height: "100%" }}>


                        <Heading fontSize="3xl" color="teal.800" textAlign="center">
                            {showPrev ? "Preview" : "Drop"}
                            {showPrev ? null : <Button colorScheme='teal' size='sm' onClick={(e) => { handleSidebar(e) }} style={{ float: "right" }}>{showsidebar ? 'Hide' : 'Show'}</Button>}

                        </Heading>
                        <List
                            bgGradient={
                                isOver
                                    ? "linear(to-b, teal.300, teal.500)"
                                    : "linear(to-b, teal.100, teal.200)"
                            }
                            ref={addToTeamRef}
                            minH="70vh"
                            boxShadow="xl"
                            borderRadius="md"
                            p="4"
                            style={{ height: "100%" }}
                        >
                            {team.map((p, i) => {
                                const imageDetails = generateImageJSON(p, listStyle, isurl);
                                console.log('Image Details:', imageDetails);
                                return (
                                    <Player
                                        item={p}
                                        key={p}
                                        index={i}
                                        playerType="team"
                                        styles={listStyle}
                                        link={isurl}
                                        onDropPlayer={removePlayerFromTeam}
                                    />
                                );
                            })}
                            {/* {team.map((p, i) => (
              <Player
                item={p}
                key={p}
                index={i}
                playerType="team"
                styles={listStyle}
                link={isurl}
                onDropPlayer={removePlayerFromTeam}
              />
            ))} */}
                        </List>
                    </Stack>

                </div>
            </div>
        </div>
    )
}
