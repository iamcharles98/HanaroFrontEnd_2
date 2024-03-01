import { getData } from "./myAxios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyContext } from "./myContext";


function AlbumList () {
    const context = useContext(MyContext);
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
    useEffect( ()=> {
        const controller = new AbortController();
        if(location.state !== null) {
             setSeleted(location.state);
        }
        if(!context.current.isLogin) {
            navigate("/");
            return;   
        }
        getAlbum(context.current.id);
        return () => {
            controller.abort();
        }
    },[context.current])

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
        <ul className="list-group list-group-numbered">
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