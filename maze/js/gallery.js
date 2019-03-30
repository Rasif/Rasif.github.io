function Gallery(galleryContainer)
{
    let gallery = document.querySelector(galleryContainer);
    
    let allImages; // все изображения из переменной gallery
    let lengthImages; // количество
    let current; // номер текущего изображения

    let windowElement; // окно (element)
    let image; // само изображение (element)
    let number; // номер изображения (element)

    let removeBodyScroll = () =>
    {
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    }

    let setBodyScroll = () =>
    {
        document.getElementsByTagName("body")[0].style.overflowY = "";   
    }

    let showModalWindow = () =>
    {
        windowElement.style.display = "block";
    }

    let closeModalWindow = () =>
    {
        windowElement.style.display = "none";
    }

    let onCloseWindowClick = (event) =>
    {
        if (event.target.classList.contains("modalWindow") || 
            event.target.classList.contains("modalWindow__close"))
        {
            closeModalWindow();
            setBodyScroll();
        }
    }

    let createModalWindow = () =>
    {
        windowElement = document.createElement("div");
        windowElement.className = "modalWindow";
        windowElement.style.cssText = `position: fixed;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100vh;
                                background-color: rgba(0, 0, 0, 0.6);
                                z-index: 9999;
                                display: none;
                                cursor: pointer;`;

        let windowContainer = document.createElement("div");
        windowContainer.style.cssText = `position: fixed;
                                         top: 50%;
                                         left: 50%;
                                         max-width: 75%;
                                         transition: 0.6s;
                                         transform: translate(-50%, -50%);`;

        image = document.createElement("img");
        image.className = "modalWindow__image";
        
        let imageStyle = {
                            maxWidth: "100%",
                            height: "auto",
                            display: "block"
                         };

        for (let style in imageStyle)
        {
            image.style[style] = imageStyle[style];
        }
        

        windowContainer.appendChild(image);
        
        let counts = document.createElement("span")
        counts.className = "modalWindow__counts";
        counts.style.color = "#CCC";
        counts.style.fontSize = "0.8rem";
        counts.innerText = " of " + lengthImages;
        
        number = document.createElement("span");
        number.className = "modalWindow__current";

        let text = document.createElement("p");
        text.className = "modalWindow__text";
        text.style.cssText = `position: absolute;
                              right: 0;
                              bottom: -1rem;
                              color: #CCC;
                              font-size: 0.8rem;
                              font-weight: bold;`;
        
        text.appendChild(number);
        text.appendChild(counts);

        windowContainer.appendChild(text);

        let close = document.createElement("span")
        close.style.cssText = `position: absolute;
                              right: 0;
                              top: -1.2rem;
                              font-size: 1rem;
                              color: #CCC;
                              font-weight: bold;`;
        close.className = "modalWindow__close";
        close.innerText = "×";

        windowContainer.appendChild(close);

        close.addEventListener("click", onCloseWindowClick);

        let leftButton = document.createElement("i");
        leftButton.className = "fas fa-long-arrow-alt-left";
        leftButton.style.cssText = `position: fixed;
                                    top: 50%;
                                    left: 5%;
                                    color: white;
                                    font-size: 2rem;
                                    transform: translateY(-50%);`;
        leftButton.addEventListener("click", showLeft);

        let rightButton = document.createElement("i");
        rightButton.className = "fas fa-long-arrow-alt-right";
        rightButton.style.cssText = `position: fixed;
                                    top: 50%;
                                    right: 5%;
                                    color: white;
                                    font-size: 2rem;
                                    transform: translateY(-50%);`;
        rightButton.addEventListener("click", showRight);

        windowElement.appendChild(leftButton);
        windowElement.appendChild(rightButton);
        windowElement.appendChild(windowContainer);
        
        document.getElementsByTagName("body")[0].appendChild(windowElement);
    }

    let identifyPhoto = (photo) =>
    {
        for (var i = 0; i < allImages.length; i++)
        {
            if (allImages[i] === photo)
                current = i;
        }
    }

    let show = () =>
    {
        image.src = allImages[current].src;
        number.innerText = current + 1;
    }

    let showImage = () =>
    {
        showModalWindow();
        show();
        removeBodyScroll();
    }

    let showLeft = () =>
    {
        if (current > 0)
        {
            current--;
        }
        else
        {
            current = lengthImages - 1;    
        }

        show();
    }

    let showRight = () =>
    {
        if (current < lengthImages - 1)
        {
            current++;
        }
        else
        {
            current = 0;    
        }

        show();
    }

    let onImageClick = (event) =>
    {
        if (event.target.tagName === "IMG")
        {
            showRight();
        }
    }

    let onGalleryClick = (event) =>
    {
        if (event.target.tagName === "IMG")
        {
            identifyPhoto(event.target);
            showImage();
        }
    }

    let onWindowElementKey = (event) =>
    {
        if (event.key === "ArrowLeft")
            showLeft();
        else if (event.key === "ArrowRight")
            showRight();
        else if (event.key === "ArrowUp")
            showRight();
        else if (event.key === "ArrowDown")
            showLeft();
    }

    this.start = () =>
    {
        if (!gallery)
        {
            console.log(`Нет такого элемента: ${galleryContainer}`);
            return;
        }

        allImages = gallery.getElementsByTagName("img");

        if (!allImages.length)
        {
            console.log("Изображений нет!");
            return;
        }

        lengthImages = allImages.length;

        gallery.addEventListener("click", onGalleryClick);

        createModalWindow();

        windowElement.addEventListener("click", onCloseWindowClick);
        window.addEventListener("keydown", onWindowElementKey);
        image.addEventListener("click", onImageClick);
    }

    this.getGallery = () =>
    {
        return gallery;
    }
}