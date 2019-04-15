let onWindowLoad = () =>
{
    let deletePreloader = () =>
    {
        const preloader = document.querySelector('.preloader');

        setTimeout(() =>
        {
            preloader.classList.remove('active');
            document.body.classList.remove('body-active');

            setTimeout(() =>
            {
                preloader.remove();
            }, 20);
        }, 1000);
    }

    deletePreloader();

    let onLearnMoreClick = (event) =>
    {
        let learnMoreSection = document.querySelector('.learn-more-section');
        let y = learnMoreSection.getBoundingClientRect().y + window.pageYOffset;

        let interval = setInterval(() =>
        {
            if (window.pageYOffset > y)
            {
                clearInterval(interval);
            }
            else
            {
                window.scrollTo(0, window.pageYOffset + 15);
            }
        }, 10);
    }

    document.querySelector('.learn-more').addEventListener('click', onLearnMoreClick);
}

window.addEventListener('load', onWindowLoad);