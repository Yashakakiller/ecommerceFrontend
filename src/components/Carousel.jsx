import React from 'react'

export default function Carousel() {
    return (
        <div>

            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

                <div className="carousel-inner " id='carousel'>
               
                    <div className="carousel-item active" >
                        <img src="https://source.unsplash.com/random/900x500/?sarees" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x500/?suit" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x500/?lehenga" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x500/?dress" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


        </div>
    )
}