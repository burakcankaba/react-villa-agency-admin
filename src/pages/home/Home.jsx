import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Tcmb from "../../components/tcmb/Tcmb";

const Home = () => {
  return (
    <div className="home">
      
      <div className="homeContainer">
        <div className="welcomeText">Hi, welcome back!</div>
        <p className="welcomeTextp">I have a lot of information for you, you can check them.</p>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
          <Tcmb></Tcmb>
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        
      </div>
    </div>
  );
};

export default Home;
