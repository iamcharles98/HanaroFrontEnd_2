import React, {useState, useContext} from "react";
import { getData } from "./myAxios";
import { useNavigate } from "react-router-dom";
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

    const submit = () => {
        if(isValid(input)) {
            signIn(input);
            setFailed(false);
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
                    name : data.name
                };
            });
            context.isLogin = true;
            localStorage.clear();
            localStorage.setItem("loginUser", JSON.stringify(userInfo));
            navigate("/albums");
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