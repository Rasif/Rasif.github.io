function Sticky(className)
{
    let element = document.querySelector(className);
    let coordinateY;
    let styles = {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    backgroundColor: "#f66483",
                    zIndex: "99999"
                 };

    let getCoordinateY = () =>
    {
        coordinateY = element.getBoundingClientRect().y + window.scrollY;
    }

    let setStyles = () =>
    {
        for (let style in styles)
        {
            element.style[style] = styles[style];
        }
    }

    let clearStyles = () =>
    {
        for (let style in styles)
        {
            element.style[style] = "";
        }       
    }

    let onWindowScroll = () =>
    {
        if (window.scrollY >= coordinateY)
        {
            setStyles();
        }
        else 
        {
            clearStyles();
        }
    }

    let makeElementSticky = () =>
    {
        getCoordinateY();
        
        window.addEventListener("scroll", onWindowScroll);
    }

    this.start = () =>
    {
        if (element)
        {
            makeElementSticky();
        }
    }
}