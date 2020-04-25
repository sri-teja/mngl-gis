import React from 'react'

function Footer() {
    return (
        <div className="invoice-footer" style={{justifyContent: "center"}}>
            <div className="invoice-info" >
                <br/> 
                <a href="https://vectorx.co/" rel="noopener noreferrer" target="_blank">
                    <button className="btn btn-primary" style={{width: "100%", marginBottom: "10px", color: "white"}} >Designed & Developed by VectorX</button>
                </a>
                <br/>
            </div>
        </div>
    )
};

export default Footer;
