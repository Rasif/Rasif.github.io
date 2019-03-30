let onWindowClick = () =>
{
    let menuLength = document.querySelectorAll(".menu__item").length;

    let getMaxHeightOfCard = (cards) =>
    {
        let max = -Infinity;

        for (var i = 0; i < cards.length; i++)
        {
            cards[i].style.height = "auto";
            let height = parseInt(window.getComputedStyle(cards[i]).height);

            if (height > max)
                max = height;
        }

        return max;
    }

    let setMaxHeightOfCard = (cards, height) =>
    {
        for (var i = 0; i < cards.length; i++)
        {
            cards[i].style.height = height + "px";
        }
    }

    let makeSameHeightOfCard = () =>
    {
        let cards = document.querySelectorAll(".card");

        if (cards.length)
        {
            setMaxHeightOfCard(cards, getMaxHeightOfCard(cards)); 
        }        
    }

    let onWindowResize = () =>
    {
        makeSameHeightOfCard();
    }

    makeSameHeightOfCard();
    window.addEventListener("resize", onWindowResize);

    /* Галерея */

    let gallery = new Gallery(".gallery");
    gallery.start();

    /* Прокрутить страницу к началу */

    let scrolling = new ScrollingToTop();
    scrolling.start(".scrollToTop");

    /* Прилипающая шапка */

    let sticky = new Sticky(".header");
    sticky.start();
}

window.addEventListener("load", onWindowClick);