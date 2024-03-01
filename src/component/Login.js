import React, {useState, useContext, useEffect} from "react";
import { getData } from "./myAxios";
import { useNavigate } from "react-router-dom";
import { setUserContextToLocalStorage } from "./localStorageUtil";
import { MyContext } from "./myContext";

function Login() {
    const navigate = useNavigate();
    const [input, setInput] = useState(-1);
    const [isFailed, setFailed] = useState(false);
    const context = useContext(MyContext);

    const onChange = (e) => {
        let enteredId = e.target.value;
        setInput(enteredId)
    }

    const submit = async () => {
        if(isValid(input)) {
            let user = await signIn(input);
            setFailed(false);
            context.current={...user};
            navigate("/albums");
            return;
        }
        setFailed(true);
    }

    const signIn = async (id) => {
        try {
            let res = await getData("/users?id=", id);
            let userInfo = res.data.map(data => {
                return {
                    id : data.id,
                    name : data.name,
                    isLogin : true
                };
            });
            setUserContextToLocalStorage(userInfo);
            return userInfo[0];
        } catch(e) {
            console.log(e);
        }
    }

    const isValid = (input) => {
      if(isNaN(input)) {
        return false;
      }

      let id = parseInt(input);
      if(id<0 || id>10) {
        return false;
      }

      return true;
    }

    useEffect(() => {
        if(context.current.isLogin) {
            navigate("/albums");
        }
    },[context, navigate])

    return (
    <div>
        <div>
            <input type="text" placeholder= "User Id..." onChange={onChange}></input>
            <button onClick={submit}>Sign In</button>
        </div>
        <div>
            {
            isFailed === true
            ?
            <span style={{"color" : "red"}}>User ID는 1~10번만 가능합니다.</span>
            : null
            }
        </div>
    </div>);

}

export default Login;