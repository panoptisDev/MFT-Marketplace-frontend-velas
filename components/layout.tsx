import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import HeaderLinks from "./Header/HeaderLinks";

const dashboardRoutes = [];

export default function Layout({ children }) {
	return (
		<>
			<Header
			  	color="transparent"
			  	routes={dashboardRoutes}
			  	brand="BoatSail.io"
			  	rightLinks={<HeaderLinks />}
			  	fixed
			  	changeColorOnScroll={{
					height: 70,
					color: "dark",
			  	}}
			/>

      		{children}
    	</>
  	)
}
