
const head_top ={
    width: '95%',
    display: 'inline-block',
    textAlign: 'left',
    background: '#363636',
    padding: '25px 0px',
    margin: '0 0 15px 0',
    display: 'inline-block',
    width: '100%',
    textAlign: 'right',
};


const top_head_ul ={
    listStyle: 'none',
    display: 'inline-block',
    width: '30%',
    padding: '0 30px 0 0',
    margin: '0',
    textAlign: 'right',
}
const top_head_li= {
    display: 'inline',
    marginLeft: '25px',
}

const bottom_head_li= {
    display: 'inline',
    marginLeft: '25px',
    color:'white',
}
//, span#signUp_page, span#logout_btn 
const span_topHead_page={
    color: '#f1f1f1',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
}
// span#login_page, span#signUp_page, span#logout_btn {
//     color: #f1f1f1;
//     font-size: 16px;
//     font-weight: 600;
//     cursor: pointer;
// }
const logo={
    display: 'inline-block',
    width: '35%',
    float: 'left',
}
var title_cruise={
    width: '65%',
    display: 'inline-block',
    padding: '25px 0',
}
const Header=()=>{
    return (
        <header>
        <div className="top_head" style={head_top}>
            <ul style={top_head_ul}><li style={top_head_li}>
                <span id="login_page" style={span_topHead_page}>Login</span>
                </li>
                <li style={top_head_li}>
                <span id="signUp_page" style={span_topHead_page}>SignUp</span>
                </li>
             </ul>
        </div>
        <div>
        <div style={logo}>
        <img src={"../images/logoC.png"}/>
        </div>
        <div>
        <h1 style={title_cruise}>Cruise World Tour</h1>
        </div>
        </div>
        <div style={head_top}>
        <nav >
        <ul style={top_head_ul}>
        <li style={bottom_head_li}>Home</li>
        <li style={bottom_head_li}>Cruise</li>
        <li style={bottom_head_li}>Hello Cruise</li>
        </ul>
        </nav>
        </div>
        </header>
    );
}

//backdround image
var imgUrl='https://image.cnbcfm.com/api/v1/image/102345226-Exterior_Seven_Seas_Explorer.jpg?v=1559063293&w=1400&h=950';
const divStyle = {
  color: 'blue',
  height:"40%",
  width:"100%",
  backgroundImage: 'url(' + imgUrl + ')',
};

const ContainerA=()=>{
    return(
    <div style={divStyle}>
    </div>
    );
    
};
ReactDOM.render(
  <Header />,
    <ContainerA />,
    document.getElementById("react_top")
);