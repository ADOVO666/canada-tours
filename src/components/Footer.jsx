const Footer = () => {
    return (
        <footer id="about">
            <div className="map">
                <img src="map-placeholder.jpg" alt="Карта" />
            </div>
            <p>Контактная информация и другие данные</p>

            <script
            
                src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=maps,marker&v=beta"
                defer
            ></script>


            
        </footer>
    );
};

export default Footer;