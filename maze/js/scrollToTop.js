function ScrollingToTop()
{
    let button;
    let isButtonClicked;

    let onWindowScroll = () =>
    {
        if (window.scrollY > window.screen.height * 1.2)
        {
            button.style.display = "block";
        }
        else 
        {
            button.style.display = "none";
        }
    }

    let onButtonTopClick = () =>
    {
        if (!isButtonClicked)
        {
            isButtonClicked = true;

            let scrollInterval = setInterval(() =>
            {
                let scroll = window.scrollY;

                if (scroll)
                {
                    window.scrollTo(0, scroll - 15);
                }
                else
                {
                    clearInterval(scrollInterval);
                    isButtonClicked = false;
                }
            }, 16);
        }
    }

    this.start = (buttonClassName) =>
    {
        button = document.querySelector(buttonClassName);

        if (button)
        {
            isButtonClicked = false;
            window.addEventListener("scroll", onWindowScroll);
            button.addEventListener("click", onButtonTopClick);
        }
    }
}