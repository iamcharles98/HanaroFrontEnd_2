
import { Outlet,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "./myContext";

function Layout() {
  const navigate = useNavigate();
  const context = useContext(MyContext);

  const onSignOut = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    context.current={id:-1, name : "", isLogin : false};
    navigate("/");
  }

  return (
    <>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand">Hanaro Album</span>
                <div className="d-flex justify-content-end">

                    <div className="navbar-nav me-auto mb-2 mb-md-0 ">
                      {
                        context.current.isLogin ?
                        <>
                        <span style={{"marginRight" : "8px", "alignContent" : "center"}}>{context.current.id}</span>
                        <span>{context.current.name}</span>
                        </>
                        :null
                      }
                    </div>

                    <div className="d-flex">
                        <button className="btn btn-success" onClick={onSignOut}>Sign Out</button>
                    </div>
                    
                </div>
            </div>
        </nav>
      <Outlet />
    </>
  );
}

export default Layout;
