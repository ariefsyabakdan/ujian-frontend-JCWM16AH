import React from "react";
import CardProductComp from "../components/cardProductComp";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <CardProductComp />
      </div>
    );
  }
}

export default LandingPage;
