import React from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/Home.css";
import axios from "axios";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: [],
    };
  }

  emoji = (itemCategory) => {
    console.log(itemCategory)
    if (itemCategory === "Plant") {
      return "https://www.iconpacks.net/icons/2/free-plant-icon-1573-thumb.png";
    } else if (itemCategory === "Kombucha") {
      return "https://img.icons8.com/plasticine/2x/26e07f/mate.png";
    } else if (itemCategory === "Kefir") {
      return "https://image.pngaaa.com/872/610872-middle.png";
    } else {
      return "https://www.pngrepo.com/download/167926/rabbit.png";
    }
  };

  componentDidMount() {
    axios
      .get("http://localhost:2021/api/item")
      .then((response) => {
        console.log(response.data);
        this.setState({
          item: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.item);
    return (
      <div>
        <h1>MAPBOX MAP HERE</h1>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          center={[2.333333, 48.866667]}
        >
          {this.state.item.map((item) => {
            return (
              <Marker coordinates={item.location.coordinates} anchor="bottom">
                <img className="icon2" alt="" src={this.emoji(item.category[0])} />
              </Marker>
            );
          })}
        </Map>
        ;
      </div>
    );
  }
}

//Kombucha", "Kefir", "Vinegar
