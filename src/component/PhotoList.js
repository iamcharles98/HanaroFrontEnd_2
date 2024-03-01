import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { MyContext } from "./myContext";
import { getData } from "./myAxios";

function PhotoList() {
    const navigate = useNavigate();
    const location = useLocation();
    const [photos, setPhotos] = useState("");
    const context = useContext(MyContext)

    const onBack = () => {
        navigate("/albums",{state:location.state});
    }

    const getPhotos = async () => {
        try {
            let res = await getData("/photos?albumId=", location.state.albumId);
            let fetchPhoto = res.data.map(photo => {
                return {
                    albumId : photo.albumId,
                    id : photo.id,
                    title : photo.title,
                    url : photo.url,
                    thumbnailUrl : photo.thumbnailUrl
                };
            });
            setPhotos(fetchPhoto);
        }catch(e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        if(!context.current.isLogin) {
            navigate("/");
            return;
        }

        getPhotos();
        return () => {
            controller.abort();
        }
    },[context])

    return (
        <div>
            <h3>{context.current.isLogin && location.state.title}</h3>
            <div>
                {
                    photos && photos.map((photo, key) => {
                        return <img src={photo.thumbnailUrl} 
                        alt="preview-img"
                        key={photo.id}></img>;
                    })
                }
            </div>
            <button onClick={onBack}>뒤로</button>
        </div>
    );
}

export default PhotoList;