import { getData } from "./myAxios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function AlbumList () {

    const navigate = useNavigate();
    const location = useLocation();
    const [albums, setAlbums] = useState("");
    const [selectedAlbum , setSeleted] = useState({
        id : -1,
        albumId : -1,
        title : ""
    });

    const getAlbum = async (param) => {
        try {
            const res = await getData("/albums?userId=", param);
            const fetchAlbums = res.data.map((album) => {
                return {
                    id : album.id,
                    albumId : album.userId,
                    title : album.title
                };
            });
            setAlbums(fetchAlbums);
        } catch(e) {
            console.log(e);
        }
    };

    const hasLoginInfo= () => {
        return localStorage.getItem("loginUser")!== null;
    }

    useEffect( ()=> {
        const controller = new AbortController();
        if(location.state !== null) {
             setSeleted(location.state);
        }
        if(!hasLoginInfo()) {
            navigate("/");
            return;   
        }
        let userInfo = localStorage.getItem("loginUser");
            getAlbum(JSON.parse(userInfo)[0].id);
        return () => {
            controller.abort();
        }
    },[])

    const goPhotos = () => {
        if(selectedAlbum.id !== -1) {
            navigate("/photos",{state : selectedAlbum});
        }
        else {
            alert("앨범을 선택해주세요 !");
        }
        
    } 
    
    const onSelect = (item)  => {
        let select = {
            albumId : item.albumId,
            id : item.id,
            title : item.title
        };
        setSeleted(select);
        console.log(select);
    }

    return (
        <>
        <div>
        <h2>앨범 목록</h2>
        <button onClick={goPhotos}>앨범 상세보기</button>
        </div>
        <ul>
            {
                albums && albums.map((album) => {
                    return(
                        <li className="list-group-item"
                        style={{"backgroundColor":selectedAlbum.id===album.id?"lightgray":"white"}}
                        key={album.id}
                        onClick={() => onSelect(album)}>{album.title}</li>
                    )
                })
            }
        </ul>
        </>
    );
}

export default AlbumList;